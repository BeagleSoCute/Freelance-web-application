import { apiInstance } from "configs/axios.config";


export const addProvideServiceAPI = (data) => apiInstance.post('/',data)
export const addFindServiceAPI = (data) => apiInstance.post('/',data)
