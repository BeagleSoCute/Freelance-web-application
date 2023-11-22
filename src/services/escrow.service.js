import {
  seekerPayForServiceAPI,
  showTransactionDataAPI,
} from "apis/escrow.api";

export const seekerPayForService = (data, projectID) => {
  return seekerPayForServiceAPI(data, projectID);
};

export const showTransactionData = async () => {
  const res = await showTransactionDataAPI();
  const transformData = res.payload.data.map((item) => {
    return {
      ...item,
      isPaidBySeeker: item.isPaidBySeeker ? "Yes" : "No",
      isPaidToFreelancer: item.isPaidToFreelancer ? "Yes" : "No",
      projectTitle: item.project.title,
    };
  });
  return { success: res.success, payload: transformData };
};
