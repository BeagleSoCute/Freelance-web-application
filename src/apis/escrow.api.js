import { apiInstance } from "configs/axios.config";

export const showMyProjectListsAPI = (projectID) =>
  apiInstance.put(`escrow/seekerPayForService/${projectID}`);


