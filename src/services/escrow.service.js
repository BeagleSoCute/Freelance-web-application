import {
  seekerPayForServiceAPI,
  showTransactionDataAPI,
  showAllTransactionDataAPI,
  refundMoneyDataAPI
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
      projectID: item.project._id
    };
  });
  return { success: res.success, payload: transformData };
};

export const showAllTransactionData = async () => {
  console.log('cares res showAllTransactionDatashowAllTransactionData')
  const res = await showAllTransactionDataAPI();
  console.log('res',res.payload)
  if( !res.payload.data ){
    return []
  }
  const transformData = res.payload?.data?.map((item) => {
    return {
      ...item,
      isPaidBySeeker: item.isPaidBySeeker ? "Yes" : "No",
      isPaidToFreelancer: item.isPaidToFreelancer ? "Yes" : "No",
      projectTitle: item.project.title,
      transactionID: item._id,
      projectID: item.project._id, 
      status: item.status

    };
  });
  return { success: res.success, payload: transformData };
};


export const refundMoneyData  = (data, projectID, transactionID) => {
  return refundMoneyDataAPI(data, projectID, transactionID)
}
