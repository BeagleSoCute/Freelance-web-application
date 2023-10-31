import { apiInstance } from "configs/axios.config";

export const getUserApi = () => apiInstance.get("/user/myData");
export const getAllUsersApi = () => apiInstance.get("/user/allUsers")
export const getUserDetailsApi = (id) => apiInstance.get(`/user/details/${id}`)
export const updateProfileApi = (data) => apiInstance.put('/user/updateProfile',data)
export const addPortfolioApi = (data) => apiInstance.put('/user/addPortfolio', data)
export const editPortfolioApi = (data) => apiInstance.put('/user/editPortfolio', data)
export const deletePortfolioApi = (id) => apiInstance.delete(`/user/deletePortfolio/${id}`)