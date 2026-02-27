// src/store/slices/jobSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllJobsApi,
  fetchSingleJobApi,
  postJobApi,
  getMyJobsApi,
  deleteJobApi,
} from "../../api/jobsApi";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    requestForAllJobs: (state) => { state.loading = true; state.error = null; },
    successForAllJobs: (state, action) => { state.loading = false; state.jobs = action.payload; },
    failureForAllJobs: (state, action) => { state.loading = false; state.error = action.payload; },

    requestForSingleJob: (state) => { state.loading = true; state.error = null; state.message = null; },
    successForSingleJob: (state, action) => { state.loading = false; state.singleJob = action.payload; },
    failureForSingleJob: (state, action) => { state.loading = false; state.error = action.payload; },

    requestForPostJob: (state) => { state.loading = true; state.error = null; state.message = null; },
    successForPostJob: (state, action) => { state.loading = false; state.message = action.payload; },
    failureForPostJob: (state, action) => { state.loading = false; state.error = action.payload; },

    requestForMyJobs: (state) => { state.loading = true; state.error = null; state.myJobs = []; },
    successForMyJobs: (state, action) => { state.loading = false; state.myJobs = action.payload; },
    failureForMyJobs: (state, action) => { state.loading = false; state.error = action.payload; },

    requestForDeleteJob: (state) => { state.loading = true; state.error = null; state.message = null; },
    successForDeleteJob: (state, action) => { state.loading = false; state.message = action.payload; },
    failureForDeleteJob: (state, action) => { state.loading = false; state.error = action.payload; },

    clearAllErrors: (state) => { state.error = null; },
    resetJobSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.jobs = [];
      state.myJobs = [];
      state.singleJob = {};
    },
  },
});

// Thunks
export const fetchJobs = (city, niche, searchKeyword = "") => async (dispatch) => {
  dispatch(jobSlice.actions.requestForAllJobs());
  try {
    const jobs = await fetchAllJobsApi(city, niche, searchKeyword);
    dispatch(jobSlice.actions.successForAllJobs(jobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(jobSlice.actions.failureForAllJobs(err.response.data.message));
  }
};

export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForSingleJob());
  try {
    const job = await fetchSingleJobApi(jobId);
    dispatch(jobSlice.actions.successForSingleJob(job));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(jobSlice.actions.failureForSingleJob(err.response.data.message));
  }
};

export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());
  try {
    const message = await postJobApi(data);
    dispatch(jobSlice.actions.successForPostJob(message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(jobSlice.actions.failureForPostJob(err.response.data.message));
  }
};

export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());
  try {
    const myJobs = await getMyJobsApi();
    dispatch(jobSlice.actions.successForMyJobs(myJobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(jobSlice.actions.failureForMyJobs(err.response.data.message));
  }
};

export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForDeleteJob());
  try {
    const message = await deleteJobApi(id);
    dispatch(jobSlice.actions.successForDeleteJob(message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(jobSlice.actions.failureForDeleteJob(err.response.data.message));
  }
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

export default jobSlice.reducer;