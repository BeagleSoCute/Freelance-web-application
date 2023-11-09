import { apiInstance } from "configs/axios.config";


export const showPostServicePending = () => apiInstance.get("/admin/showPostServicePending");
export const updatePostServiceStatus = (data) => apiInstance.post("/admin/",data);