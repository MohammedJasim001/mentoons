import apiClient from "../../services/axiosInstance"

export const sendRequestApi = (receiverId) => {
    return apiClient.post(`/users/request/${receiverId}`)
}