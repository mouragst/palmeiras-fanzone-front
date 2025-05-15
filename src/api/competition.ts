import axios from "axios";
import { apiUrl } from "../config/config";

export const getCompetitions = async () => {
    try {
        const response = await axios.get(`${apiUrl}/competitions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching competitions data:", error);
        throw error;
    }
}