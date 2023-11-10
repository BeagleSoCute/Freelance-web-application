import { apiInstance } from "configs/axios.config";


export const showPostServicePendingAPI = () => apiInstance.get("/admin/showPostServicePending");
export const updatePostServiceStatusAPI = (data,postID) => apiInstance.put(`/admin/updatePostServiceStatus/${postID}`,data);