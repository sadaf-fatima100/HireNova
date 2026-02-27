// src/api/updateProfileApi.js
import API from "./axios";

// Update user profile
export const updateProfileApi = async (data) => {
  const response = await API.put("/user/update/profile", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Update user password
export const updatePasswordApi = async (data) => {
  const response = await API.put("/user/update/password", data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};