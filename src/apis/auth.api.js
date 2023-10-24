import { apiInstance } from "configs/axios.config";

export const registerApi = (data) => apiInstance.post("/auth/register", data);
export const loginApi = (data) => apiInstance.post("/auth/login", data);
export const logoutApi = () => apiInstance.post("/auth/logout");
export const refreshToken = (token) => apiInstance.post("/auth/refresh_token",token);