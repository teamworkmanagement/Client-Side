import { createSlice } from "@reduxjs/toolkit";
const signalrSlice = createSlice({
    name: "signalr",
    initialState: {
        newAddReact: null,
        removeReact: null,
        newComment: null,
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
        }
    },
});

const { actions, reducer } = signalrSlice;
export const {
    setNewAddReact,
    setRemoveReact,
    setNewComment
} = actions;
export default reducer;
