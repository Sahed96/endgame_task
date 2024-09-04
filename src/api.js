import axios from "axios";

const API_URL = "https://job-task-server-2-self.vercel.app/api/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};
