import { apiInstance } from "configs/axios.config";

export const showMyProjectListsAPI = () =>
  apiInstance.get("project/showMyProjectLists");
export const showProjectDetailsAPI = (projectID) =>
  apiInstance.get(`project/showProjectDetails/${projectID}`);
export const updateProjectRequirementAPI = (data, projectID) =>
  apiInstance.put(`project/updateProjectRequirement/${projectID}`, data);
export const updateNegotiationCommentAPI = (data, projectID) =>
  apiInstance.put(`project/updateNegotiationComment/${projectID}`, data);
export const freelancerApproveProjectRequirementAPI = (projectID) =>
  apiInstance.put(`project/freelancerApproveProjectRequirement/${projectID}`);
