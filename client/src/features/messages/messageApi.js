import apiClient from "../../services/axiosInstance"

export const messageApi = (receiverId) => {
    return apiClient.get(`/messages/${receiverId}`)
}