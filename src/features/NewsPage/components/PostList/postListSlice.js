import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postApi from "src/api/postApi";


export const getPostPagination = createAsyncThunk(
    'post/getpagination',
    async (payload) => {
        const data = await postApi.getPagination(payload);
        console.log('data cc la: ', data);
        return data.user;
    }
);

const postListSlice = createSlice(
    {
        name: 'post',
        initialState: {},
        reducers: {},
        extraReducers: {
            [getPostPagination.fulfilled]: (state, action) => {

            },
            [getPostPagination.rejected]: (state, action) => {

            }
        },
    }
);

const { reducer } = postListSlice;

export default reducer; // default export
