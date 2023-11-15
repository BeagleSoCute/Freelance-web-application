import {
  showMyProjectListsAPI,
  showProjectDetailsAPI,
  updateProjectRequirementAPI,
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
