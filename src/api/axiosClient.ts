import axios from 'axios';
import { API_ENDPOINTS } from './apiEndpoints';
import { IRefreshToken } from '../interfaces/IApiTypes';
import { store } from '../app/store';
import { setLoader } from '../features/layout/layoutSlice';

// Create an instance of Axios
const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with your API base URL
    timeout: 10000, // Set a timeout if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosClient.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (config: any) => {
        store.dispatch(setLoader(true));
        // Add authorization token to headers if required
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        store.dispatch(setLoader(false));
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosClient.interceptors.response.use(
    (response) => {
        store.dispatch(setLoader(false));
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the error is due to an expired token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Refresh the token
                const response = await axios.get<IRefreshToken>(API_ENDPOINTS.REFRESH);

                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);

                // Retry the original request with the new access token
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                // Handle refresh token errors, e.g., redirect to login
                localStorage.removeItem('accessToken');
                window.location.href = '/login'; // Redirect to login page
                return Promise.reject(refreshError);
            }
        }
        store.dispatch(setLoader(false));

        return Promise.reject(error);
    }
);

export default axiosClient;
