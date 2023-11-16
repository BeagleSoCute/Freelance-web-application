import {
  showMyProjectListsAPI,
  showProjectDetailsAPI,
  updateProjectRequirementAPI,
  updateNegotiationCommentAPI,
  freelancerApproveProjectRequirementAPI,
} from "apis/project.api";

export const getMyProjectLists = () => {
  return showMyProjectListsAPI();
};

export const showProjectDetails = (projectID) => {
  return showProjectDetailsAPI(projectID);
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
