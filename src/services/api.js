import axios from "axios";
import { getAccessToken } from "../store/useSession";

const ONBOARDING_API_BASE =
  import.meta.env.VITE_ONBOARDING_API_BASE || "http://localhost:5002";

const api = axios.create({ baseURL: ONBOARDING_API_BASE });

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
