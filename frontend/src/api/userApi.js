// src/api/userApi.js
import API from "./axios";

// User registration
export const registerUser = async (formData) => {
  const response = await API.post("/user/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// User login
export const loginUser = async (formData) => {
  const response = await API.post("/user/login", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Get logged in user
export const getUserData = async () => {
  const response = await API.get("/user/getuser");
  return response.data;
};

// Logout user
export const logoutUser = async () => {
  const response = await API.get("/user/logout");
  return response.data;
};