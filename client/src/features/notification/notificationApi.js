import apiClient from "../../services/axiosInstance"

export const getNotificationApi = () => {
    return apiClient.get("/users/notification")
}

export const readNotification = () =>{
    return apiClient.put('/user/notification/read')
}