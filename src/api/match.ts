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

export const getAllMatches = async () => {
    try {
        const response = await axios.get(`${apiUrl}/matches`,);
        return response.data;
    } catch (error) {
        console.error("Error fetching all matches data:", error);
        throw error;
    }
}

export const getMatchById = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/matches/${id}`,);
        return response.data;
    } catch (error) {
        console.error("Error fetching match data by ID:", error);
        throw error;
    }
}