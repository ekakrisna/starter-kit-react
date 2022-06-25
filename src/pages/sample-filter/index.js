import { Button, DatePicker, Input, Modal, Pagination, Table } from "antd";
import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchTodosApi,
  removeTodoApi,
  toggleCompleteTodoApi,
} from "../../api/todo.api";
import Layout from "../../components/Layout";
import TodoForm from "./components/TodoForm";
import { getValueFromQueryString } from "../../helpers/commons";
import { useLocation } from "react-router-dom";
import useUpdateQueryStringFromObjectChange from "../../hooks/useUpdateQueryStringFromObjectChange";
import moment from "moment";

const getInitialFilter = (value) => {
  const { search, page, createdAt, limit } = value;

  return {
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 5,
    search: search ? String(search) : "",
    createdAt: createdAt ? createdAt.split(",") : [],
  };
};

const SampleFilterPage = () => {
  const queryClient = useQueryClient();

  const { search } = useLocation();

  const valueFromQueryString = getValueFromQueryString(
    ["search", "page", "limit", "createdAt"],
    search
  );

  const [filter, setFilter] = useState(getInitialFilter(valueFromQueryString));

  useUpdateQueryStringFromObjectChange(filter);

  const [isShowAdd, setIsShowAdd] = useState(false);
  const [selectedTodoToEdit, setSelectedTodoToEdit] = useState(null);

  const queryTodos = useQuery(
    ["query-todos", filter],
    () =>
      fetchTodosApi({
        search: filter.search,
        createdAt: filter.createdAt,
        page: filter.page,
        limit: filter.limit,
      }),
    {
      initialData: {
        data: [],
        total: 0,
      },
    }
  );

  const mutationToggle = useMutation((params) =>
    toggleCompleteTodoApi(params.id, params.condition)
  );

  const mutationDelete = useMutation((params) => {
    removeTodoApi(params.id);
  });

  const refreshData = () => {
    queryClient.removeQueries(["query-todos", filter], { exact: true });
    queryClient.cancelQueries(["query-todos", filter]);
    queryTodos.refetch();
  };

  const columns = useMemo(() => {
    return [
      {
        dataIndex: "id",
        title: "ID",
        width: 180,
        render: (value) => {
          return <div className="">{value}</div>;
        },
      },
      {
        dataIndex: "text",
        title: "Todo Text",
        width: 200,
        render: (value) => {
          return <div>{value}</div>;
        },
      },
      {
        dataIndex: "status",
        title: "Status",
        width: 200,
        render: (value, row) => {
          return <div>{row.isComplete ? "complete" : "peding"}</div>;
        },
      },
      {
        dataIndex: "createdAtUnix",
        title: "Created At",
        width: 200,
        render: (value) => {
          return <div>{new Date(value).toLocaleString("ID-id")}</div>;
        },
      },
      {
        dataIndex: "action",
        title: "Action",
        width: 120,
        fixed: "right",
        render: (value, row) => {
          return (
            <div className="flex flex-col gap-2">
              <Button
                type="default"
                onClick={() => {
                  setSelectedTodoToEdit(row);
                }}
              >
                Edit
              </Button>
              <Button type="default" onClick={() => handleToggle(row)}>
                Toggle
              </Button>
              <Button type="primary" danger onClick={() => handleDelete(row)}>
                Delete
              </Button>
            </div>
          );
        },
      },
    ];
  }, []);

  const handleToggle = (todo) => {
    const { id, isComplete } = todo;
    mutationToggle.mutate(
      {
        id,
        condition: isComplete ? false : true,
      },
      {
        onSuccess: () => refreshData(),
      }
    );
  };

  const handleDelete = (todo) => {
    const { id } = todo;
    mutationDelete.mutate(
      {
        id,
      },
      {
        onSuccess: () => refreshData(),
      }
    );
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-2 pb-8">
          <div className="bg-white p-3 border border-gray-300 flex flex-col gap-3">
            <div className="flex justify-between gap-2">
              <div className="font-semibold text-lg">Filter</div>
              <div className="font-semibold text-lg">
                <Button onClick={() => setIsShowAdd(true)}>Tambah Todo</Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Input.Search
                  allowClear
                  placeholder="Cari"
                  onSearch={(e) => {
                    setFilter((state) => ({
                      ...state,
                      search: e,
                      page: 1,
                    }));
                  }}
                  defaultValue={filter.search}
                />
              </div>
              <div className="flex gap-2">
                <DatePicker.RangePicker
                  showTime
                  showSecond={false}
                  onChange={(e) => {
                    const [start, end] = e;
                    if (start && end) {
                      setFilter((state) => ({
                        ...state,
                        createdAt: [
                          moment(start).unix() * 1000,
                          moment(end).unix() * 1000,
                        ],
                        page: 1,
                      }));
                    }
                  }}
                  defaultValue={filter.createdAt.map((unix) =>
                    moment(new Date(Number(unix)))
                  )}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
          <div>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={queryTodos.data.data}
              pagination={false}
              scroll={{ y: 420 }}
              loading={queryTodos.isFetching || queryTodos.isLoading}
              style={{ minHeight: 420 }}
            />
          </div>
          <Pagination
            current={filter.page}
            onChange={(page, pageSize) => {
              setFilter((state) => ({
                ...state,
                page,
                limit: pageSize,
              }));
            }}
            total={queryTodos.data.total}
            pageSize={filter.limit}
            showSizeChanger={true}
            pageSizeOptions={[5, 10, 50, 100]}
          />
        </div>
      </Layout>
      <Modal
        title="tambah todo"
        visible={isShowAdd}
        onCancel={() => setIsShowAdd(false)}
        footer={null}
      >
        <div>
          <TodoForm
            onSuccess={() => {
              refreshData();
              setIsShowAdd(false);
            }}
          />
        </div>
      </Modal>
      <Modal
        title="Edit Todo"
        visible={!!selectedTodoToEdit}
        onCancel={() => setSelectedTodoToEdit(null)}
        footer={null}
      >
        <div>
          <TodoForm
            data={selectedTodoToEdit}
            onSuccess={() => {
              refreshData();
              setSelectedTodoToEdit(null);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default SampleFilterPage;
