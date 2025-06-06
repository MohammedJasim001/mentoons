import { createAsyncThunk } from "@reduxjs/toolkit";
import {  userApi } from "./userApi";
import apiClient from "../../services/axiosInstance";

export const currentUserThunk = createAsyncThunk('users/current', async(_,{rejectWithValue}) => {
    try {
        const res =  await apiClient.get('/user');
        console.log('====================================');
        console.log(res.data);
        return res.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const getUsers = createAsyncThunk('users/get', async(_,{rejectWithValue})=> {
    try {
        const res = await userApi()
        return res.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

