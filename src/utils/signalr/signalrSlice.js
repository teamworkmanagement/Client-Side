import { createSlice } from "@reduxjs/toolkit";
const signalrSlice = createSlice({
    name: "signalr",
    initialState: {
        newAddReact: null,
        removeReact: null,
    },
    reducers: {
        setNewAddReact(state, action) {
            state.newAddReact = action.payload;
        },
        setRemoveReact(state, action) {
            state.removeReact = action.payload;
        }
    },
});

const { actions, reducer } = signalrSlice;
export const {
    setNewAddReact, setRemoveReact
} = actions;
export default reducer;
