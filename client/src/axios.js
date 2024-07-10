import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const makeRequest = axios.create({
  baseURL: `${backendURL}/api`,
  withCredentials: true,
});
