import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatApi from "src/api/chatApi";

export const getGroupChatForUser = createAsyncThunk(
  "chat/getallgroup",
  async (params) => {
    const data = await chatApi.getGroupChatForUser(params);
    console.log("all group chat data redux: ", data.data);
    return data.data;
  }
);

export const searchGroupChatForUser = createAsyncThunk(
  "chat/searchchatgroup",
  async (params) => {
    const data = await chatApi.getGroupChatForUser(params);
    console.log("all group chat search data redux: ", data.data);
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
    editChatGroup: (state, action) => { },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
      const gr = state.groupChat.find((x) => x.groupChatId === action.payload);
      if (gr) {
        gr.newMessage = false;
      }
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

      let grChat = state.groupChat.findIndex(x => x.groupChatId === action.payload.groupId);
      if (grChat === null) {
        state.groupChat = [{
          groupChatId: action.payload.groupId,
          groupChatName: 'No name',
          groupChatUpdatedAt: Date.now(),
          newMessage: true,
          groupAvatar: "",
          lastestMes: action.payload.message
        }].concat(state.groupChat);
      }
      else {
        const backupdata = state.groupChat[grChat];
        state.groupChat.splice(grChat, 1);
        state.groupChat = [backupdata].concat(state.groupChat);
      }
    },

    changeGroupPosition(state, action) {
      let grChat = state.groupChat.findIndex(x => x.groupChatId === action.payload);
      const backupdata = state.groupChat[grChat];
      state.groupChat.splice(grChat, 1);
      state.groupChat = [backupdata].concat(state.groupChat);
    },
  },
  extraReducers: {
    [getGroupChatForUser.fulfilled]: (state, action) => {
      state.groupChat = action.payload;
      state.currentGroup = action.payload[0]?.groupChatId;
      state.loadDone = true;
      /*state.currentGroup =
        action.payload.length > 0
          ? action.payload[1].groupChatId
          : state.currentGroup;*/
    },
    [getGroupChatForUser.rejected]: (state, action) => { },
    [searchGroupChatForUser.rejected]: (state, action) => { },
    [searchGroupChatForUser.fulfilled]: (state, action) => {
      state.groupChat = action.payload;
    }
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
  changeGroupPosition
} = actions;
export default reducer; // default export
