import { api } from "../";
import { AUTH } from "../endpoints";

export async function login(username, password) {
    try {
        const response = await api.post(AUTH.LOGIN, { username, password });
        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.detail,
            status: error.response?.status
        };
    };
};

export async function registration(username, password, email) {
    try {
        const response = await api.post(AUTH.REGISTRATION, { username, password, email });
        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.username,
            status: error.response?.status
        };
    };
};