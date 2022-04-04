import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  //baseURL: "http://172.21.215.224:8000"
});

export default api;