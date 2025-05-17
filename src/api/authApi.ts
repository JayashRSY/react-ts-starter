import axiosClient from "./axiosClient";
import {
  IGoogleResponse,
  IRefreshToken,
  ISigninResponse,
  ISignoutResponse,
  ISignupResponse,
} from "../interfaces/IApiTypes";

export const signin = async (email: string, password: string) => {
  const response = await axiosClient.post<ISigninResponse>(
    '/auth/login',
    { email, password }
  );
  return response.data;
};

export const signup = async (email: string, password: string) => {
  const response = await axiosClient.post<ISignupResponse>(
    '/auth/register',
    { email, password }
  );
  return response.data;
};

export const google = async (idToken: string) => {
  const response = await axiosClient.post<IGoogleResponse>(
    '/auth/google',
    { idToken }
  );
  return response.data;
};

export const refresh = async () => {
  const response = await axiosClient.get<IRefreshToken>('/auth/refresh');
  return response.data;
};

export const signout = async () => {
  const response = await axiosClient.post<ISignoutResponse>(
    '/auth/logout'
  );
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axiosClient.post('/auth/forgot-password', {
    email,
  });
  return response.data;
};
export const resetPassword = async (token: string, password: string) => {
  const response = await axiosClient.post('/auth/reset-password', {
    token,
    password,
  })
  return response.data;
}