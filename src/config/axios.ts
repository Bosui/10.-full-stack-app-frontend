import axios, { AxiosError, AxiosRequestConfig } from "axios";

// Naudojame `import.meta.env` vietoje `process.env`
const baseURL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000/";
console.log("Axios Base URL:", baseURL);

const config: AxiosRequestConfig = {
  baseURL,
};

export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); // Ištraukiamas token iš localStorage
    // console.log("LocalStorage Token:", token);

    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("Request Error:", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
