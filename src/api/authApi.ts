import axiosClient from './axiosClient';
import { API_ENDPOINTS } from './apiEndpoints';
import { IGoogleResponse, IRefreshToken, ISigninResponse, ISignoutResponse, ISignupResponse } from '../interfaces/IApiTypes';

export const signin = async (email: string, password: string) => {
        const response = await axiosClient.post<ISigninResponse>(API_ENDPOINTS.SIGNIN, { email, password });
        return response.data;
};

export const signup = async (email: string, password: string) => {
        const response = await axiosClient.post<ISignupResponse>(API_ENDPOINTS.SIGNUP, { email, password });
        return response.data;
};

export const google = async (idToken: string) => {
        const response = await axiosClient.post<IGoogleResponse>(API_ENDPOINTS.GOOGLE, { idToken });
        return response.data;
};

export const refresh = async () => {
        const response = await axiosClient.get<IRefreshToken>(API_ENDPOINTS.REFRESH);
        return response.data;
};

export const signout = async () => {
        const response = await axiosClient.post<ISignoutResponse>(API_ENDPOINTS.SIGNOUT);
        return response.data;
};
