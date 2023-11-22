import { apiInstance } from "configs/axios.config";

export const seekerPayForServiceAPI = (data, projectID) =>
  apiInstance.put(`escrow/seekerPayForService/${projectID}`, data);

export const showTransactionDataAPI = () =>
  apiInstance.get(`escrow/showTransactionData/`);
