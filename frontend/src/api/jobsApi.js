// src/api/jobsApi.js
import API from "./axios";

// Fetch all jobs with optional filters
export const fetchAllJobsApi = async (city, niche, searchKeyword = "") => {
  let link = "/job/getall?";
  let queryParams = [];

  if (searchKeyword) queryParams.push(`searchKeyword=${searchKeyword}`);
  if (city && city !== "All") queryParams.push(`city=${city}`);
  if (niche && niche !== "All") queryParams.push(`niche=${niche}`);

  // Special handling for "All" selections
  if (city === "All") queryParams = searchKeyword ? [`searchKeyword=${searchKeyword}`] : [];
  if (niche === "All") {
    queryParams = city && city !== "All" ? [`city=${city}`] : [];
    if (searchKeyword) queryParams.push(`searchKeyword=${searchKeyword}`);
  }

  link += queryParams.join("&");
  const response = await API.get(link);
  return response.data.jobs;
};

// Fetch single job
export const fetchSingleJobApi = async (jobId) => {
  const response = await API.get(`/job/get/${jobId}`);
  return response.data.job;
};

// Post a job
export const postJobApi = async (data) => {
  const response = await API.post(`/job/post`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data.message;
};

// Get my jobs
export const getMyJobsApi = async () => {
  const response = await API.get(`/job/getmyjobs`);
  return response.data.myJobs;
};

// Delete a job
export const deleteJobApi = async (id) => {
  const response = await API.delete(`/job/delete/${id}`);
  return response.data.message;
};