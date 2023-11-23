import {
  showPostServicePendingAPI,
  updatePostServiceStatusAPI,
  retriveRequestRejectProjectAPI,
  approveRejectProjectAPI
} from "apis/admin.api";
import { showPostDetailsAPI } from "apis/service.api";

export const showPendingPostService = async () => {
  const { success, payload } = await showPostServicePendingAPI();
  return { success, payload };
};

export const updatePostStatus = async (data, postID) => {
  const { success, payload } = await updatePostServiceStatusAPI(data, postID);
  return { success, payload };
};

export const showPostDetails = async (postID) => {
  const { success, payload } = await showPostDetailsAPI(postID);
  return { payload };
};

export const retriveRequestRejectProject = async () => {
  const { success, payload } = await retriveRequestRejectProjectAPI();
  const transformData = payload.requestRejectList.map((item) => {
    return {
      title: item.title,
      reporter: `${item.reporter.first_name} ${item.reporter.last_name}`,
      type: item.status,
      projectID: item._id,
    };
  });
  return { success, payload: transformData };
};


export const approveRejectProject = (isApprove, projectID) => {
    return approveRejectProjectAPI(isApprove, projectID);
}