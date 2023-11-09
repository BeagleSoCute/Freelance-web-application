import { addFindServiceAPI, addProvideServiceAPI } from "apis/service.api";

export const addProvideService = async (data) => {
  const { success, payload } = await addProvideServiceAPI(data);
  return { success, payload };
};

export const addFindService = async (data) => {
  const { success, payload } = await addFindServiceAPI(data);
  return { success, payload };
};

