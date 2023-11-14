import { apiInstance } from "configs/axios.config";

export const showMyProjectListsAPI = () =>
  apiInstance.get("project/showMyProjectLists");
