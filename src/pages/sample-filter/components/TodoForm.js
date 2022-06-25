import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import { useMutation } from "react-query";
import { createTodoApi, updateTodoApi } from "../../../api/todo.api";

const TodoForm = ({ data, onSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data !== null) {
      form.setFieldsValue({
        id: data.id,
        text: data.text,
        createdAtUnix: data.createdAtUnix,
      });
    }
  }, [data]);

  const mutationCreate = useMutation((params) => createTodoApi(params.text));

  const mutationUpdate = useMutation((params) =>
    updateTodoApi(data.id, params.payload)
  );

  const handleSubmit = (formData) => {
    if (data === null) {
      mutationCreate.mutate(
        {
          text: formData.text,
        },
        {
          onSuccess: (data) => {
            onSuccess(data);
            form.setFieldsValue({
              text: "",
            });
          },
        }
      );
    }

    if (data) {
      mutationUpdate.mutate(
        {
          payload: {
            ...data,
            text: formData.text,
          },
        },
        {
          onSuccess: (data) => {
            onSuccess(data);
          },
        }
      );
    }
  };

  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={data ? data : {}}
        onFinish={handleSubmit}
        labelWrap
        name="form-router"
        autoComplete="off"
      >
        <Form.Item name="text" label="Text" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            loading={mutationUpdate.isLoading || mutationCreate.isLoading}
            onClick={() => form.submit()}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

TodoForm.propTypes = {
  data: PropTypes.any,
  onSuccess: PropTypes.func,
};

TodoForm.defaultProps = {
  data: null,
  onSuccess: () => {},
};

export default TodoForm;
