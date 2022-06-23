import axios from "axios";

export const httpClient = (isContentJson = true) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
  });

  if (isContentJson) {
    instance.defaults.headers.common["Content-Type"] = "application/json";
  }

  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error?.response?.status === 401) {
        window.location.href = "/";
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
