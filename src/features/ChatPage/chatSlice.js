import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatApi from "src/api/chatApi";

export const getAllGroupChatForUser = createAsyncThunk(
  "chat/getallgroup",
  async (userId) => {
    const data = await chatApi.getAllGroupChatForUser(userId);
    console.log("all group chat data redux: ", data.data);
    return data.data;
  }
);

export const sendMes = createAsyncThunk("chat/sendmes", async (payload) => {
  const data = await chatApi.sendMes(payload);
});

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    groupChat: [],
    currentGroup: "",
    loadDone: false,
    isSelected: false,
    newMessage: null,
  },
  reducers: {
    setLoadDone: (state, action) => {
      state.loadDone = action.payload;
    },
    editChatGroup: (state, action) => {},
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
      const gr = state.groupChat.find((x) => x.groupChatId === action.payload);
      gr.newMessage = false;
    },
    setIsSelected: (state, action) => {
      state.isSelected = action.payload;
    },
    setReceiveMes: (state, action) => {
      const gr = state.groupChat.find(
        (x) => x.groupChatId === action.payload.groupId
      );
      gr.lastestMes = action.payload.message;
      gr.groupChatUpdatedAt = Date.now();
      gr.newMessage = action.payload.newMessage ? true : false;
    },
    setNewMessage(state, action) {
      state.newMessage = action.payload;
    },
  },
  extraReducers: {
    [getAllGroupChatForUser.fulfilled]: (state, action) => {
      state.groupChat = action.payload;
      state.loadDone = true;
      state.currentGroup =
        action.payload.length > 0
          ? action.payload[1].groupChatId
          : state.currentGroup;
    },
    [getAllGroupChatForUser.rejected]: (state, action) => {},
  },
});

const { actions, reducer } = chatSlice;
export const {
  setLoadDone,
  editChatGroup,
  setCurrentGroup,
  setIsSelected,
  setReceiveMes,
  setNewMessage,
} = actions;
export default reducer; // default export
