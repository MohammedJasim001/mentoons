import apiClient from "../../services/axiosInstance"

export const currentUserApi = () => {
    return apiClient.get('/user')
}

export const singleUserApi = (userId) => {
    return apiClient.get(`/user/${userId}`)
}

export const userApi = () => {
    return apiClient.get('/users')
}

export const requestsApi = () => {
    return apiClient.get('/users/requestedusers')
}

export const blockApi = (userId) => {
    return apiClient.post(`/block/${userId}`)
}

