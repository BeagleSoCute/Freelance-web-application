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
  const transformData = {
    first_name: data.firstName,
    last_name: data.lastName,
    phone_number: data.phoneNumber,
  };
  const { success, payload } = await updateProfileApi(transformData);
  return { success, payload };
};
