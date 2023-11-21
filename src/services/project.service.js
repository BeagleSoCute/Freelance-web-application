import {
  showMyProjectListsAPI,
  showProjectDetailsAPI,
  updateProjectRequirementAPI,
  updateNegotiationCommentAPI,
  freelancerApproveProjectRequirementAPI,
  addTaskAPI,
  updateTaskAPI,
  addCommentAPI,
  completeProjectAPI,
  requestRejectProjectAPI,
} from "apis/project.api";

export const getMyProjectLists = () => {
  return showMyProjectListsAPI();
};

export const showProjectDetails = async (projectID) => {
  const res = await showProjectDetailsAPI(projectID);
  return res;
};

export const updateProjectRequirement = async (data, projectID) => {
  const { success, errorMessage } = await updateProjectRequirementAPI(
    data,
    projectID
  );
  return { success, errorMessage };
};

export const updateNegotiationComment = (data, projectID) => {
  return updateNegotiationCommentAPI(data, projectID);
};

export const freelancerApproveRequirement = (projectID) => {
  return freelancerApproveProjectRequirementAPI(projectID);
};

export const addTask = async (data, projectID) => {
  const { success } = await addTaskAPI(data, projectID);
  return success;
};

export const updateTask = (data, projectID) => {
  return updateTaskAPI(data, projectID);
};

export const addProjectComment = (data, projectID) => {
  return addCommentAPI(data, projectID);
};

export const completeProject = (isComplete, projectID) => {
  return completeProjectAPI({ isComplete }, projectID);
};

export const requestRejectProject = (projectID) => {
  return requestRejectProjectAPI(projectID);
};
