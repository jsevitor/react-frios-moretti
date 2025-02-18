import axios from "axios";

const api = axios.create({
  baseURL: "https://projeto-orientado-backend.onrender.com/",
  // baseURL: "http://localhost:3001/",
});

export default api;
