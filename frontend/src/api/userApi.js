// src/api/userApi.js
import API from "./axios";

// User registration (multipart/form-data for resume upload)
export const registerUser = async (formData) => {
  const response = await API.post("/user/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// User login (send JSON, credentials sent automatically)
export const loginUser = async (data) => {
  const response = await API.post("/user/login", data, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
};

// Get logged in user (withCredentials ensures cookie sent)
export const getUserData = async () => {
  const response = await API.get("/user/getuser");
  return response.data;
};

// Logout user
export const logoutUser = async () => {
  const response = await API.get("/user/logout");
  return response.data;
};
