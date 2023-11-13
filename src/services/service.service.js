import {
  addFindServiceAPI,
  addProvideServiceAPI,
  showPostServiceListsAPI,
  showPostDetailsAPI,
  sendServiceRequestAPI,
  showMyServiceListsAPI,
  approveCandidateAPI
} from "apis/service.api";

export const addProvideService = async (data) => {
  const { success, payload } = await addProvideServiceAPI(data);
  return { success, payload };
};

export const addFindService = async (data) => {
  const { success, payload } = await addFindServiceAPI(data);
  return { success, payload };
};

export const getServiceLists = async (data) => {
  const { success, payload } = await showPostServiceListsAPI();
  return { success, payload };
};

export const showPostDetails = async (postID, type) => {
  const { success, payload } = await showPostDetailsAPI(postID, type);
  return { payload };
};

export const sendServiceRequest = async (data, postID,type) => {
  const { success, payload } = await sendServiceRequestAPI(data, postID,type);
  return { success, payload };
};

export const getMyServiceList = async () => {
  const {success,payload} = await showMyServiceListsAPI();
  return {success, payload};
}

export const approveCandidate = async (data, postID, type) => {
  const {success} = await approveCandidateAPI(data, postID, type);
  return {success};
}