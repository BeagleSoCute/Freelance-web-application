import { apiInstance } from "configs/axios.config";

export const addProvideServiceAPI = (data) =>
  apiInstance.post("service/addProvideService", data);
export const addFindServiceAPI = (data) =>
  apiInstance.post("service/addFindService", data);
export const showPostDetailsAPI = (postID, type = "provideService") =>
  apiInstance.get(`/service/showPostDetails/${type}/${postID}`);
export const showPostServiceListsAPI = () =>
  apiInstance.get("service/showPostServiceLists");
export const sendServiceRequestAPI = (data, postID, type) =>
  apiInstance.put(`service/sendServiceRequest/${type}/${postID}`, data);
export const showMyServiceListsAPI = () =>
  apiInstance.get("service/showMyServiceLists");
export const approveCandidateAPI = (data, postID, type) =>
  apiInstance.put(`service/approveCandidate/${type}/${postID}`, data);
