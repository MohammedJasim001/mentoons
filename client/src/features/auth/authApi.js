import apiClient from "../../services/axiosInstance";

export const registerApi = (userData) => {
  return apiClient.post("/register", userData);
};
export const loginApi = (userData) => {
  return apiClient.post("/login", userData);
};
