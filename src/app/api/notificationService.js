import axios from "@/utils/axiosInstance";

export const getNotifications = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`/api/v1/notifications?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};


export const addNotification = async (message) => {
  try {
    const response = await axios.post("/api/v1/notifications", { message });
    return response.data;
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error;
  }
};
