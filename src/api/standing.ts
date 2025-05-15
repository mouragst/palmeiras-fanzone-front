import axios from "axios";
import { apiUrl } from "../config/config";

export const getStandings = async () => {
    try {
        const response = await axios.get(`${apiUrl}/standings`);
        return response.data;
    } catch (error) {
        console.error("Error fetching standing data:", error);
        throw error;
    }
}