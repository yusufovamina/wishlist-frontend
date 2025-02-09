import axios from "axios";

const api = axios.create({
  baseURL: "https://respective-anastassia-wishlistwebapp-7a7676c1.koyeb.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
