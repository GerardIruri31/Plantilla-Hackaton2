import axios from "axios";
import type { Category } from "../interfaces/Category";

const API = import.meta.env.VITE_API_URL;

export const fetchCategories = async (token: string): Promise<Category[]> => {
  const res = await axios.get<Category[]>(`${API}/expenses_category`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
