import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../../../api/authApi";

export const register = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const data = await authApi.register(payload);
    console.log("register data: ", data);
  }
  catch (err) {
    return rejectWithValue(err);
  }

});

export const socialLogin = createAsyncThunk(
  "auth/social-login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.socialLogin(payload);
      return data.data;
    }
    catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const changePassword = createAsyncThunk("auth/changepassword", async (payload) => {
  const data = await authApi.changePassword(payload);
  return data.data;
});

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const data = await authApi.login(payload);
    return data.data;
  }
  catch (err) {
    return rejectWithValue(err);
  }

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
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      console.log("register fullfilled: ", action.payload);
    },
    [register.rejected]: (state, action) => {
      console.log("register rejected: ", action.payload);
    },
    [login.rejected]: (state, action) => { },
    [login.fulfilled]: (state, action) => {
      const { id, fullName, email, userAvatar, userDob, userPhoneNumber, firstTimeSocial, userAddress, userDescription, userGithubLink, userFacebookLink } = action.payload;
      state.currentUser = { id, fullName, email, userAvatar, userDob, userPhoneNumber, firstTimeSocial, userAddress, userDescription, userGithubLink, userFacebookLink };
      state.loginStatus = true;
    },
    [socialLogin.fulfilled]: (state, action) => {
      const { id, fullName, email, userAvatar, userDob, userPhoneNumber, firstTimeSocial, userAddress, userDescription, userGithubLink, userFacebookLink } = action.payload;
      state.currentUser = { id, fullName, email, userAvatar, userDob, userPhoneNumber, firstTimeSocial, userAddress, userDescription, userGithubLink, userFacebookLink };
      state.loginStatus = true;
    },
    [socialLogin.rejected]: (state, action) => {
      console.log("social rejected: ", action.payload);
    },
    [islogin.fulfilled]: (state, action) => {
      state.loginStatus = action.payload.data === "UnAuth" ? false : true;
    },
    [islogin.rejected]: (state, action) => { },
    [changePassword.fulfilled]: (state, action) => {
      state.currentUser.firstTimeSocial = false;
    },
    [changePassword.rejected]: (state, action) => {

    }
  },
});

const { actions, reducer } = authSlice;
export const { setAuth, setAuthF, setValueAuth, setCurrentUser } = actions;
export default reducer; // default export
