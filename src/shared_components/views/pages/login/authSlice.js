import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../../../api/authApi";

export const register = createAsyncThunk("auth/register", async (payload) => {
  const data = await authApi.register(payload);
  console.log("register data: ", data);
});

export const socialLogin = createAsyncThunk(
  "auth/social-login",
  async (payload) => {
    const data = await authApi.socialLogin(payload);
    return data.data;
  }
);

export const login = createAsyncThunk("auth/login", async (payload) => {
  const data = await authApi.login(payload);
  return data.data;
});

export const islogin = createAsyncThunk("auth/isLogin", async () => {
  const data = await authApi.isLogin();
  console.log("data redux là: ", data);
  return data;
});

const authSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    loginStatus: false,
  },
  reducers: {
    setAuth: (state) => {
      state.loginStatus = !state.loginStatus;
    },
    setAuthF: (state) => {
      state.loginStatus = false;
    },
    setValueAuth: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      console.log("register fullfilled: ", action.payload);
    },
    [register.rejected]: (state, action) => {
      console.log("register rejected: ", action.payload);
    },
    [login.rejected]: (state, action) => {},
    [login.fulfilled]: (state, action) => {
      const { id, fullName, email, userAvatar } = action.payload;
      state.currentUser = { id, fullName, email, userAvatar };
      state.loginStatus = true;
    },
    [socialLogin.fulfilled]: (state, action) => {
      const { id, fullName, email, userAvatar } = action.payload;
      state.currentUser = { id, fullName, email, userAvatar };
      state.loginStatus = true;
    },
    [socialLogin.rejected]: (state, action) => {
      console.log("social rejected: ", action.payload);
    },
    [islogin.fulfilled]: (state, action) => {
      state.loginStatus = action.payload.data === "UnAuth" ? false : true;
    },
    [islogin.rejected]: (state, action) => {},
  },
});

const { actions, reducer } = authSlice;
export const { setAuth, setAuthF, setValueAuth } = actions;
export default reducer; // default export
