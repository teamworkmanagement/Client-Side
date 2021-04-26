import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    sidebarShow: "responsive",
    currentPostPage: 1,
    darkMode: true,
    newMessage: null
  },
  reducers: {
    changeState(state, payload) {
      if (payload.payload.type === "set") {
        state.sidebarShow = payload.payload.sidebarShow;
      }
    },
    setCurrentPostPage(state) {
      state.currentPostPage++;
    },
    setDarkMode(state, action) {
      state.darkMode = !state.darkMode;
    },
    setNewMessage(state, action) {
      state.newMessage = action.payload;
    }
  },
});

const { actions, reducer } = appSlice;
export const { changeState, setCurrentPostPage, setDarkMode, setNewMessage } = actions; // named export
export default reducer; // default export
