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
        teams: []
    },
    reducers: {
        addTeam(state, action) {
            state.teams.push(action.payload);
        }
    },
    extraReducers: {
        [getTeamByUserId.fulfilled]: (state, action) => {
            state.teams = action.payload;
        }
    }
},
);

const { actions, reducer } = teamSlice;
export const { addTeam } = actions;
export default reducer;