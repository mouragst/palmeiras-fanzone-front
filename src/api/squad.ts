import axios from "axios";
import { apiUrl } from "../config/config";

export const getSquad = async () => {
    try {
        const response = await axios.get(`${apiUrl}/squad`);
        return response.data;
    } catch (error) {
        console.error("Error fetching squad data:", error);
        throw error;
    }
}