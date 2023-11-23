import { apiInstance } from "configs/axios.config";

export const seekerPayForServiceAPI = (data, projectID) =>
  apiInstance.put(`escrow/seekerPayForService/${projectID}`, data);

export const showTransactionDataAPI = () =>
  apiInstance.get(`escrow/showTransactionData`);

export const showAllTransactionDataAPI = () =>
  apiInstance.get(`escrow/showAllTransactionData`);

export const refundMoneyDataAPI = (data, projectID, transactionID) =>
  apiInstance.put(`escrow/refundMoneyData/${projectID}/${transactionID}`, data);
