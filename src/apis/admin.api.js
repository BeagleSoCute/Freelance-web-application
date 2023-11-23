import { apiInstance } from "configs/axios.config";


export const showPostServicePendingAPI = () => apiInstance.get("/admin/showPostServicePending");
export const retriveRequestRejectProjectAPI = () => apiInstance.get("/admin/retriveRequestRejectProject");
export const updatePostServiceStatusAPI = (data,postID) => apiInstance.put(`/admin/updatePostServiceStatus/${postID}`,data);
export const approveRejectProjectAPI = (isApprove,projectID) => apiInstance.put(`/admin/approveRejectProject/${projectID}`,isApprove);