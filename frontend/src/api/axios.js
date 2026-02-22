import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-attendance-z2xs.vercel.app/api",
});

// Add JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});``

export default API;