export { api as api } from "./api";

export async function request(requestF) {
    try {
        const response = await requestF();
        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.detail,
            status: error.response?.status
        };
    };
}