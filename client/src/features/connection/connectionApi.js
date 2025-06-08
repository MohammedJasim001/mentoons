import apiClient from "../../services/axiosInstance"

export const sendRequestApi = (receiverId) => {
    return apiClient.post(`/users/request/${receiverId}`)
}

export const acceptRequesApi = (senderId) =>{
    return apiClient.post(`/users/accept/${senderId}`)
}

export const connectionApi = () => {
    return apiClient.get('/users/connections')
}