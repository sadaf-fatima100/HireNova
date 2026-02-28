// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://hirenova-gt0t.onrender.com/api/v1",
  withCredentials: true,
});

export default API;
