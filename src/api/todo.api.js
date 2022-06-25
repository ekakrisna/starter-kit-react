import { httpClient } from "../helpers/http-request";
import { v4 as uuidv4 } from "uuid";

const getTotalTodosApi = async (params) => {
  try {
    const response = await httpClient().get("/todos", {
      params: {
        ...params,
        _page: null,
        _limit: null,
      },
    });
    return Promise.resolve(response.data.length);
  } catch (error) {
    return 0;
    // return Promise.reject(error);
  }
};

export const createTodoApi = async (text) => {
  try {
    const response = await httpClient().post("/todos", {
      id: uuidv4(),
      text: text,
      createdAtUnix: new Date().getTime(),
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchTodosApi = async ({
  search,
  createdAt = [],
  page = 1,
  limit = 5,
  status = "",
}) => {
  try {
    const params = {
      _page: page,
      _limit: limit,
    };

    if (search.length > 0) {
      params["text_like"] = search;
    }
    if (createdAt.length === 2) {
      const [start, end] = createdAt;

      params["createdAtUnix_gte"] = start;
      params["createdAtUnix_lte"] = end;
    }

    const response = await httpClient().get("/todos", {
      params,
    });

    const total = await getTotalTodosApi(params);

    return Promise.resolve({
      data: response.data,
      total,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const toggleCompleteTodoApi = async (id, condition) => {
  try {
    const response = await httpClient().patch(`/todos/${id}`, {
      isComplete: condition,
    });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTodoApi = async (id, payload) => {
  try {
    const response = await httpClient().put(`/todos/${id}`, {
      ...payload,
    });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeTodoApi = async (id) => {
  try {
    const response = await httpClient().delete(`/todos/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
