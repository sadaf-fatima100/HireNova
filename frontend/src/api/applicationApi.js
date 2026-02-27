// src/api/applicationApi.js
import API from "./axios";

// Fetch all applications for employer
export const fetchEmployerApplicationsApi = async () => {
  const response = await API.get("/application/employer/getall");
  return response.data.applications;
};

// Fetch all applications for job seeker
export const fetchJobSeekerApplicationsApi = async () => {
  const response = await API.get("/application/jobseeker/getall");
  return response.data.applications;
};

// Post a new application
export const postApplicationApi = async (data, jobId) => {
  const response = await API.post(`/application/post/${jobId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.message;
};

// Delete an application
export const deleteApplicationApi = async (id) => {
  const response = await API.delete(`/application/delete/${id}`);
  return response.data.message;
};