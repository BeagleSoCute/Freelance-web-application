import {
  getUserApi,
  getAllUsersApi,
  getUserDetailsApi,
  updateProfileApi,
  updatePortfolioApi,
} from "apis/user.api";

export const getMyData = async () => {
  const res = await getUserApi();
  return { success: res.success, userData: res.payload };
};

export const getAllUsers = async () => {
  const res = await getAllUsersApi();
  return { success: res.success, allUsersData: res.payload };
};

export const getUserDetails = async (id) => {
  const { success, payload: details } = await getUserDetailsApi(id);
  return { success, details };
};

export const updateProfile = async (data) => {
  const { inputData, skills, image } = data;
  const formData = new FormData();
  formData.append("image", image);
  formData.append(
    "userData",
    JSON.stringify({
      first_name: inputData.firstName,
      last_name: inputData.lastName,
      phone_number: inputData.phoneNumber,
      description: inputData.description,
      skills,
    })
  );
  const { success, payload } = await updateProfileApi(formData);
  return { success, payload };
};

export const updatePortfolio = async (data) => {
  const { inputData, skills, image } = data;
  const formData = new FormData();
  formData.append("image", image);
  

  const { success, payload } = await updatePortfolioApi();
  return { success, payload };
};
