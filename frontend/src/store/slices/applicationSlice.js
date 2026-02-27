import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEmployerApplicationsApi,
  fetchJobSeekerApplicationsApi,
  postApplicationApi,
  deleteApplicationApi,
} from "../../api/applicationApi";

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    requestForAllApplications: (state) => { state.loading = true; state.error = null; },
    successForAllApplications: (state, action) => { state.loading = false; state.applications = action.payload; },
    failureForAllApplications: (state, action) => { state.loading = false; state.error = action.payload; },

    requestForMyApplications: (state) => { state.loading = true; state.error = null; },
    successForMyApplications: (state, action) => { state.loading = false; state.applications = action.payload; },
    failureForMyApplications: (state, action) => { state.loading = false; state.error = action.payload; },

    requestForPostApplication: (state) => { state.loading = true; state.error = null; state.message = null; },
    successForPostApplication: (state, action) => { state.loading = false; state.message = action.payload; },
    failureForPostApplication: (state, action) => { state.loading = false; state.error = action.payload; },

    requestForDeleteApplication: (state) => { state.loading = true; state.error = null; state.message = null; },
    successForDeleteApplication: (state, action) => { state.loading = false; state.message = action.payload; },
    failureForDeleteApplication: (state, action) => { state.loading = false; state.error = action.payload; },

    clearAllErrors: (state) => { state.error = null; },
    resetApplicationSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.applications = [];
    },
  },
});

// Thunks
export const fetchEmployerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplications());
  try {
    const applications = await fetchEmployerApplicationsApi();
    dispatch(applicationSlice.actions.successForAllApplications(applications));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(applicationSlice.actions.failureForAllApplications(err.response.data.message));
  }
};

export const fetchJobSeekerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForMyApplications());
  try {
    const applications = await fetchJobSeekerApplicationsApi();
    dispatch(applicationSlice.actions.successForMyApplications(applications));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(applicationSlice.actions.failureForMyApplications(err.response.data.message));
  }
};

export const postApplication = (data, jobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplication());
  try {
    const message = await postApplicationApi(data, jobId);
    dispatch(applicationSlice.actions.successForPostApplication(message));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(applicationSlice.actions.failureForPostApplication(err.response.data.message));
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const message = await deleteApplicationApi(id);
    dispatch(applicationSlice.actions.successForDeleteApplication(message));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(applicationSlice.actions.failureForDeleteApplication(err.response.data.message));
  }
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export default applicationSlice.reducer;