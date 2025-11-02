// frontend/src/lib/axios.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL; // must be set in frontend/.env or Vercel env

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api" // local dev
      : `${API}/api`, // production -> Render backend
  withCredentials: true,
});
