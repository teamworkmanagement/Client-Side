import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from '../../../../api/authApi';

export const register = createAsyncThunk(
    'auth/register',
    async (payload) => {
        const data = await authApi.register(payload);
        console.log('register data: ', data);
    }
);

export const socialLogin = createAsyncThunk(
    'auth/social-login',
    async (payload) => {
        const data = await authApi.socialLogin(payload);

        localStorage.setItem('access_token', data.data.jwToken);
        localStorage.setItem('refresh_token', data.data.refreshToken);
        return data.data;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (payload) => {
        const data = await authApi.login(payload);
        localStorage.setItem('access_token', data.data.jwToken);
        localStorage.setItem('refresh_token', data.data.refreshToken);

        return data.data;
    }
);


const authSlice = createSlice(
    {
        name: 'user',
        initialState: {
            currentUser: {

            },
        },
        reducers: {},
        extraReducers: {
            [register.fulfilled]: (state, action) => {
                console.log('register fullfilled: ', action.payload);
            },
            [register.rejected]: (state, action) => {
                console.log('register rejected: ', action.payload);
            },
            [login.rejected]: (state, action) => {
                console.log('login reject: ', JSON.parse(action.error.message));
            },
            [login.fulfilled]: (state, action) => {

                const { id, fullName, email, userAvatar } = action.payload;
                state.currentUser = { id, fullName, email, userAvatar };
            },
            [socialLogin.fulfilled]: (state, action) => {
                const { id, fullName, email, userAvatar } = action.payload;
                state.currentUser = { id, fullName, email, userAvatar };
            },
            [socialLogin.rejected]: (state, action) => {
                console.log('social rejected: ', action.payload);
            }
        },
    }
);

const { reducer } = authSlice;
export default reducer; // default export
