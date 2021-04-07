import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice(
    {
        name: 'app',
        initialState: {
            sidebarShow: 'responsive',
            currentPostPage: 1,
        },
        reducers:
        {
            changeState(state, payload) {
                if (payload.payload.type === 'set') {
                    state.sidebarShow = payload.payload.sidebarShow;
                }

            },
            setCurrentPostPage(state) {
                state.currentPostPage++;
            },

        },

    },
);

const { actions, reducer } = appSlice;
export const { changeState, setCurrentPostPage } = actions; // named export
export default reducer; // default export
