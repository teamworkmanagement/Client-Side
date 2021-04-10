import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import testApi from "./testApi";


export const getTest = createAsyncThunk(
    'test/gettest',
    async () => {
        const data = await testApi.getTest();
        console.log('test data redux: ', data);
    }
);



const testSlice = createSlice(
    {
        name: 'test',
        initialState: {},
        reducers: {},
        extraReducers: {
            [getTest.fulfilled]: (state, action) => {
                console.log('get test fullfill');
            },
            [getTest.rejected]: (state, action) => {
                console.log('get test reject');
            },
        },
    }
);

const { reducer } = testSlice;
export default reducer; // default export
