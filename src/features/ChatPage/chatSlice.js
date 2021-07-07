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
  //eslint-disable-next-line
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
    triggerAddConversation: 0,
  },
  reducers: {
    setTriggerAddConversation: (state) => {
      state.triggerAddConversation++;
    },
    setLoadDone: (state, action) => {
      state.loadDone = action.payload;
    },
    editChatGroup: (state, action) => {},
    setCurrentGroup: (state, action) => {
      const gr = state.groupChat.find((x) => x.groupChatId === action.payload);
      if (gr) {
        gr.newMessage = false;
        state.currentGroup = action.payload;
      }
    },
    setIsSelected: (state, action) => {
      state.isSelected = action.payload;
    },
    setReceiveMes: (state, action) => {
      const gr = state.groupChat.find(
        (x) => x.groupChatId === action.payload.groupId
      );
      gr.lastestMes =
        action.payload.messageType === "image"
          ? "[Hình ảnh]"
          : action.payload.messageType === "file"
          ? "[Tệp tin]"
          : action.payload.message;
      gr.groupChatUpdatedAt = Date.now();
    },
    setNewMessage(state, action) {
      state.newMessage = action.payload;

      let grChat = state.groupChat.findIndex(
        (x) => x.groupChatId === action.payload.groupId
      );
      if (grChat === null) {
        state.groupChat = [
          {
            groupChatId: action.payload.groupId,
            groupChatName: "No name",
            groupChatUpdatedAt: Date.now(),
            newMessage: true,
            groupAvatar: "",
            lastestMes: action.payload.message,
          },
        ].concat(state.groupChat);
      } else {
        const backupdata = state.groupChat[grChat];
        state.groupChat.splice(grChat, 1);
        state.groupChat = [backupdata].concat(state.groupChat);
      }
    },

    changeGroupPosition(state, action) {
      let grChat = state.groupChat.findIndex(
        (x) => x.groupChatId === action.payload
      );
      const backupdata = state.groupChat[grChat];
      state.groupChat.splice(grChat, 1);
      state.groupChat = [backupdata].concat(state.groupChat);
    },

    addNewGroupChat(state, action) {
      state.groupChat.splice(0, 0, action.payload);
    },

    updateGroupChatImage(state, action) {
      const grChat = state.groupChat.find(
        (x) => x.groupChatId === action.payload.groupChatId
      );
      grChat.groupAvatar = action.payload.imageUrl;
    },
  },
  extraReducers: {
    [getGroupChatForUser.fulfilled]: (state, action) => {
      state.groupChat = action.payload.groupChats;
      state.currentGroup = action.payload.currentGroup;
      state.loadDone = true;
      /*state.currentGroup =
        action.payload.length > 0
          ? action.payload[1].groupChatId
          : state.currentGroup;*/
    },
    [getGroupChatForUser.rejected]: (state, action) => {},
    [searchGroupChatForUser.rejected]: (state, action) => {},
    [searchGroupChatForUser.fulfilled]: (state, action) => {
      state.groupChat = action.payload.groupChats;
    },
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
  changeGroupPosition,
  addNewGroupChat,
  setTriggerAddConversation,
  updateGroupChatImage,
} = actions;
export default reducer; // default export
