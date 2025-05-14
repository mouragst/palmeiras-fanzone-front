import axios from "axios";
import { apiUrl } from "../config/config";

export const getLastMatch = async () => {
    try {
        const response = await axios.get(
        `${apiUrl}/matches/last`,
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching last match data:", error);
        throw error;
    }
}