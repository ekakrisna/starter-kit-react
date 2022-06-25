import { httpClient } from "../helpers/http-request";

export const getUserApi = async () => {
  try {
    const response = await httpClient().get("/user");
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUserApi = async (payload) => {
  try {
    const response = await httpClient().put("/user", payload);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
