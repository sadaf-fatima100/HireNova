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
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // ── Login ──
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = null; // ← login par message clear
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // ── Fetch logged in user ──
    fetchUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
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

    // ── Logout ──
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null; // ← logout par message clear
    },
    logoutFailed: (state, action) => {
      state.error = action.payload;
    },

    // ── Clear errors ──
    clearAllErrors: (state) => {
      state.error = null;
    },

    // ✅ Clear message
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

// ── Thunks ──
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
    const errorMessage =
      err.response?.data?.message || err.message || "Something went wrong";
    dispatch(userSlice.actions.fetchUserFailed(errorMessage));
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

// ✅ clearMessage export
export const clearMessage = () => (dispatch) => {
  dispatch(userSlice.actions.clearMessage());
};

export default userSlice.reducer;
