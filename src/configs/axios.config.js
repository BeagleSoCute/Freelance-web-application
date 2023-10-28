import axios from "axios";
import {
  transformAxiosResponse,
  transformErrorResponse,
} from "helpers/axios.helper";
import { refreshToken } from "apis/auth.api";
import { notification } from "helpers/notification.helper";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants";

const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    
    // 'Content-Type' :  'application/json',
    // 'Content-Type': "multipart/form-data",

    "x-auth-token": localStorage.getItem(ACCESS_TOKEN),
  },
});

const onRequestFulfilled = (configs = {}) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    configs.headers["x-auth-token"] = token;
  }
  return configs;
};

const onResponseFulfilled = (response) => {
  return transformAxiosResponse(response);
};

const onResponseRejected = async (error) => {
  const statusError = error.response.status;
  if (error.response && statusError === 401) {
    const originalRequest = error.config;
    const { success, status, payload } = await refreshToken({
      [REFRESH_TOKEN]: localStorage.getItem(REFRESH_TOKEN),
    });
    if (success) {
      // keep it on the local storage
      localStorage.setItem(ACCESS_TOKEN, payload[ACCESS_TOKEN]);
      return apiInstance(originalRequest);
    } else if (status === 403) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      notification({
        type: "warning",
        message: "Please login into the system again.",
      });
      return;
    }
  }
  return transformErrorResponse(error);
};
apiInstance.interceptors.request.use(onRequestFulfilled);
apiInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected);
export { apiInstance };
