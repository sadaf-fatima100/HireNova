import { createSlice } from "@reduxjs/toolkit";
import { updateProfileApi, updatePasswordApi } from "../../api/updateProfileApi";

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateProfileRequest: (state) => { state.loading = true; },
    updateProfileSuccess: (state) => { state.loading = false; state.error = null; state.isUpdated = true; },
    updateProfileFailed: (state, action) => { state.loading = false; state.error = action.payload; state.isUpdated = false; },

    updatePasswordRequest: (state) => { state.loading = true; },
    updatePasswordSuccess: (state) => { state.loading = false; state.error = null; state.isUpdated = true; },
    updatePasswordFailed: (state, action) => { state.loading = false; state.error = action.payload; state.isUpdated = false; },

    profileResetAfterUpdate: (state) => { state.loading = false; state.error = null; state.isUpdated = false; },
  },
});

// Thunks
export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateProfileRequest());
  try {
    await updateProfileApi(data);
    dispatch(updateProfileSlice.actions.updateProfileSuccess());
  } catch (err) {
    dispatch(updateProfileSlice.actions.updateProfileFailed(err.response?.data?.message || "Failed to update profile."));
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updatePasswordRequest());
  try {
    await updatePasswordApi(data);
    dispatch(updateProfileSlice.actions.updatePasswordSuccess());
  } catch (err) {
    dispatch(updateProfileSlice.actions.updatePasswordFailed(err.response?.data?.message || "Failed to update password."));
  }
};

// Reset after update
export const clearAllUpdateProfileErrors = () => (dispatch) => {
  dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer;