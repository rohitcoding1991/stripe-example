import { getLocalStorage } from "@/utils";
import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getLocalStorage("authToken");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Token expired or invalid, redirect to login page");
      window.location.href = "/";
    } else if (error.response && error.response.status === 403) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
