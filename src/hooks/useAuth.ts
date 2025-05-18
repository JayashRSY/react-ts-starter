import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './useRedux';
import { ISigninResponse } from '../interfaces/IApiTypes';
import { setUser } from '../features/auth/authSlice';
import axiosClient from '../api/axiosClient';
import { toast } from 'sonner';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const signin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axiosClient.post<ISigninResponse>('/auth/login', { email, password });
      if (response.data.success) {
        // localStorage.setItem('accessToken', response.data.data.accessToken);
        dispatch(setUser(response.data.data));
        toast.success(response.data.message);
        navigate('/');
      }
      return response.data;
    } catch (error) {
      toast.error('Login failed');
      return { success: false, message: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add other auth methods (signup, signout, etc.)
  
  return {
    signin,
    isLoading,
    // Other methods
  };
};