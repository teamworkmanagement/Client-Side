import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import teamApi from "src/api/teamApi";

export const getTeamByUserId = createAsyncThunk(
    'team/getbyuserid',
    async (userId) => {
        const data = await teamApi.getAllTeamByUser(userId);
        console.log('team data redux: ', data.data);
        return data.data;
    }
);

const teamSlice = createSlice({
    name: "teams",
    initialState: {
        teams: {}
    },
    reducers: {

    },
    extraReducers: {
        [getTeamByUserId.fulfilled]: (state, action) => {
            state.teams = action.payload;
        }
    }
},
);

const { reducer } = teamSlice;
export default reducer;