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
        initialState: {
            testBool: false,
        },
        reducers: {
            setTest: (state, action) => {
                state.testBool = action.payload;
            }
        },
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

const { actions, reducer } = testSlice;
export const { setTest } = actions;
export default reducer; // default export
