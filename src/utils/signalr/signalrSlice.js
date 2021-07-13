import { createSlice } from "@reduxjs/toolkit";
const signalrSlice = createSlice({
    name: "signalr",
    initialState: {
        newAddReact: null,
        removeReact: null,
        newComment: null,
        updateTeamInfo: null,
    },
    reducers: {
        setNewAddReact(state, action) {
            state.newAddReact = action.payload;
        },
        setRemoveReact(state, action) {
            state.removeReact = action.payload;
        },
        setNewComment(state, action) {
            state.newComment = action.payload;
        },
        setUpdateTeamInfo(state, action) {
            state.updateTeamInfo = action.payload;
        }
    },
});

const { actions, reducer } = signalrSlice;
export const {
    setNewAddReact,
    setRemoveReact,
    setNewComment,
    setUpdateTeamInfo
} = actions;
export default reducer;
