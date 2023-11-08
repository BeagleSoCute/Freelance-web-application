import { apiInstance } from "configs/axios.config";


export const addProvideServiceAPI = (data) => apiInstance.post('service/addProvideService',data)
export const addFindServiceAPI = (data) => apiInstance.post('service/addFindService',data)
