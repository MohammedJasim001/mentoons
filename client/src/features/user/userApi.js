import apiClient from "../../services/axiosInstance"

export const currentUserApi = () => {
    return apiClient.get('/user')
}

export const userApi = () => {
    return apiClient.get('/users')
}