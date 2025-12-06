import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// axiosInstance.interceptors.response.use(
//   response => response,
//   (error) => error
// )
function get<ResponseType>(url: string, config: AxiosRequestConfig = {}) {
  return axiosInstance.get<ResponseType>(url, config);
}

function post<ResponseType, RequestType = never>(
  url: string,
  data: RequestType,
  config?: AxiosRequestConfig,
) {
  return axiosInstance.post<ResponseType>(url, data, config);
}

function put<ResponseType, RequestType = never>(
  url: string,
  data: RequestType,
  config?: AxiosRequestConfig,
) {
  return axiosInstance.put<ResponseType>(url, data, config);
}

function del<ResponseType>(url: string, config?: AxiosRequestConfig) {
  return axiosInstance.delete<ResponseType>(url, config);
}

export const api = {
  get,
  post,
  put,
  del,
};
