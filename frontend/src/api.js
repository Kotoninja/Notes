import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    undefined,
    async (error) => {
        const originalRequest = { ...error.config };
        originalRequest._isRetry = true;

        if (error.status === 401 && error.config && !error.config._isRetry) {
            try {
                const response = await api.post("api/token/refresh/", { refresh: localStorage.getItem(REFRESH_TOKEN) });
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                return api.request(originalRequest);
            } catch (error) {
                console.log(error);
            };
        };
        
        throw error;
    }
)

export default api;