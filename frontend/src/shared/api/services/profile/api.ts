import { API_URL } from "../../api_url";
import { baseInstance } from "../../base";
export const getProfile = async (email: string) => {
    const response = await baseInstance.get(API_URL.getProfile(email));
    return response.data; 
};