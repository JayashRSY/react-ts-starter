import axiosClient from './axiosClient';
import { API_ENDPOINTS } from './apiEndpoints';

export const getAllUser = async () => {
    const response = await axiosClient.get(API_ENDPOINTS.GET_ALL_USER);
    return response.data;
};

export const getUser = async () => {
    const response = await axiosClient.get(API_ENDPOINTS.GET_USER);
    return response.data;
};

export const updateUser = async (payload: {
    name?: string;
    email?: string;
    profilePicture?: string;
    role?: string;
    password?: string;
}) => {
    const response = await axiosClient.put(API_ENDPOINTS.UPDATE_USER, payload);
    return response.data;
};

export const deleteUser = async () => {
    const response = await axiosClient.delete(API_ENDPOINTS.DELETE_USER);
    return response.data;
};
