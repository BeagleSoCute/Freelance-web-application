import {
  getUserApi,
  getAllUsersApi,
  getUserDetailsApi,
  updateProfileApi,
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
  const { formData, skills } = data;
  const transformData = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    phone_number: formData.phoneNumber,
    description: formData.description,
    skills,
  };
  const { success, payload } = await updateProfileApi(transformData);
  return { success, payload };
};
