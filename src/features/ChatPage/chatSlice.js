import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatApi from "src/api/chatApi";


export const getAllGroupChatForUser = createAsyncThunk(
    'chat/getallgroup',
    async (userId) => {
        const data = await chatApi.getAllGroupChatForUser(userId);
        console.log('all group chat data redux: ', data.data);
        return data.data;
    }
);



const chatSlice = createSlice(
    {
        name: 'chat',
        initialState: {
            groupChat: [],
            currentGroup: '',
            loadDone: false,
            isSelected: false,
        },
        reducers: {
            setLoadDone: (state, action) => {
                state.loadDone = action.payload;
            },
            editChatGroup: (state, action) => {

            },
            setCurrentGroup: (state, action) => {
                state.currentGroup = action.payload;
            },
            setIsSelected: (state, action) => {
                state.isSelected = action.payload;
            }
        },
        extraReducers: {
            [getAllGroupChatForUser.fulfilled]: (state, action) => {
                state.groupChat = action.payload;
                state.loadDone = true;
                state.currentGroup = action.payload.length > 0 ? action.payload[0].groupChatId : state.currentGroup;
            },
            [getAllGroupChatForUser.rejected]: (state, action) => {

            },
        },
    }
);

const { actions, reducer } = chatSlice;
export const { setLoadDone, editChatGroup, setCurrentGroup, setIsSelected } = actions;
export default reducer; // default export
