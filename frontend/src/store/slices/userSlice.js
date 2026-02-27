import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, getUserData, logoutUser } from "../../api/userApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    registerRequest: (state) => { state.loading = true; state.error = null; },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    loginRequest: (state) => { state.loading = true; state.error = null; },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    fetchUserRequest: (state) => { state.loading = true; state.error = null; },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed: (state, action) => {
      state.error = action.payload;
    },
    clearAllErrors: (state) => { state.error = null; },
  },
});

// Thunks
export const register = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const data = await registerUser(formData);
    dispatch(userSlice.actions.registerSuccess(data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(userSlice.actions.registerFailed(err.response.data.message));
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const data = await loginUser(formData);
    dispatch(userSlice.actions.loginSuccess(data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(userSlice.actions.loginFailed(err.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const data = await getUserData();
    dispatch(userSlice.actions.fetchUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(userSlice.actions.fetchUserFailed(err.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await logoutUser();
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(userSlice.actions.logoutFailed(err.response.data.message));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;