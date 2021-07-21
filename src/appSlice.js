import { createSlice } from "@reduxjs/toolkit";

//#region Source data: (props map to table database) from API CALL

const Users = [
  {
    userId: "user_1",
    userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
    userFullName: "Tiến Dũng",
    userEmail: "",
    userPassowrd: "",
    userDateOfBirth: new Date(),
    userPhoneNumber: "",
    userCreatedAt: new Date(),
  },
  {
    userId: "user_2",
    userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
    userFullName: "Phạm Phúc Khải",
    userEmail: "",
    userPassowrd: "",
    userDateOfBirth: new Date(),
    userPhoneNumber: "",
    userCreatedAt: new Date(),
  },
  {
    userId: "user_3",
    userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
    userFullName: "Nguyễn Khoa",
    userEmail: "",
    userPassowrd: "",
    userDateOfBirth: new Date(),
    userPhoneNumber: "",
    userCreatedAt: new Date(),
  },
  {
    userId: "user_4",
    userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-4.jpg",
    userFullName: "Phan Châu Trinh",
    userEmail: "",
    userPassowrd: "",
    userDateOfBirth: new Date(),
    userPhoneNumber: "",
    userCreatedAt: new Date(),
  },
  {
    userId: "user_5",
    userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-5.jpg",
    userFullName: "Phan Ngọc Huy",
    userEmail: "",
    userPassowrd: "",
    userDateOfBirth: new Date(),
    userPhoneNumber: "",
    userCreatedAt: new Date(),
  },
  {
    userId: "user_6",
    userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
    userFullName: "Nguyễn Phi Hùng",
    userEmail: "",
    userPassowrd: "",
    userDateOfBirth: new Date(),
    userPhoneNumber: "",
    userCreatedAt: new Date(),
  },
  {
    userId: "user_7",
    userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-7.jpg",
    userFullName: "Huỳnh Trinh",
    userEmail: "",
    userPassowrd: "",
    userDateOfBirth: new Date(),
    userPhoneNumber: "",
    userCreatedAt: new Date(),
  },
  {
    userId: "user_8",
    userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
    userFullName: "Nguyễn Thế Thức",
    userEmail: "",
    userPassowrd: "",
    userDateOfBirth: new Date(),
    userPhoneNumber: "",
    userCreatedAt: new Date(),
  },
  {
    userId: "user_9",
    userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
    userFullName: "Thục Trinh",
    userEmail: "",
    userPassowrd: "",
    userDateOfBirth: new Date(),
    userPhoneNumber: "",
    userCreatedAt: new Date(),
  },
  {
    userId: "user_10",
    userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-10.jpg",
    userFullName: "Thanh Duyên",
    userEmail: "",
    userPassowrd: "",
    userDateOfBirth: new Date(),
    userPhoneNumber: "",
    userCreatedAt: new Date(),
  },
];

const appSlice = createSlice({
  name: "app",
  initialState: {
    sidebarShow: "responsive",
    teamTabsSidebarShow: "false",
    chatListSidebarShow: "false",
    settingOptionsSidebarShow: "false",
    helpSidebarShow: "false",
    currentPostPage: 1,
    darkMode: true,
    collapseHeader: false,
    filterChanged: false,
    searchGlobalStr: "",

    //active tab account setting page
    settingPageTab: 0, //0:info tab, 1: password tab
    //active tab help center page
    helpPageTab: 0, //0:.., 1: ...

    //data from api
    users: Users,
    teamLoading: false,
    newNotfication: null,

    userModal: {
      show: false,
      userId: null,
    },
    taskEditModal: null,
    viewHistory: null,

    //dialog
    showDialogModal: false,
    dialogTitle: "",
    dialogMessage: "",
    dialogType: 0, //0:info, 1: confirm, 2: error
    dialogResult: false, //for confirm dialog
    dialogLevel: 0, //0: normal, 1: lay on a modal
    taskRemoveId: null,

    meeting: null,

    //alarm
    alarmList: [],
  },
  reducers: {
    addAlarm(state, action) {
      state.alarmList.push(action.payload);
    },
    deleteAlarm(state, action) {
      const deleteIndex = action.payload;
      state.alarmList.splice(deleteIndex, 1);
    },
    clearAlarm(state, action) {
      state.alarmList = [];
    },
    setMeeting(state, action) {
      state.meeting = action.payload;
    },
    setShowDialogModal(state, payload) {
      const data = payload.payload;
      if (data.showDialogModal) {
        state.showDialogModal = true;
        state.dialogTitle = data.dialogTitle;
        state.dialogMessage = data.dialogMessage;
        state.dialogType = data.dialogType;
        state.dialogLevel = data.dialogLevel;
        if (data.taskRemoveId) {
          state.taskRemoveId = data.taskRemoveId;
          state.dialogResult = false;
        }
      } else {
        state.showDialogModal = false;
      }
    },
    setTaskRemoveId(state, payload) {
      state.taskRemoveId = null;
    },
    setDialogResult(state, payload) {
      state.dialogResult = payload.payload;
    },
    setSettingPageTab(state, action) {
      state.settingPageTab = action.payload;
    },
    setHelpPageTab(state, action) {
      state.helpPageTab = action.payload;
    },
    setSearchGlobalStr(state, action) {
      state.searchGlobalStr = action.payload;
    },
    setViewHistory(state, action) {
      state.viewHistory = action.payload;
    },
    setTaskEditModal(state, action) {
      state.taskEditModal = action.payload;
    },
    setUserModal(state, action) {
      state.userModal = action.payload;
    },

    changeState(state, payload) {
      if (payload.payload.type === "set") {
        state.sidebarShow = payload.payload.sidebarShow;
      }
    },
    changeStateTeamTabsSidebar(state, payload) {
      if (payload.payload.type === "teamtabssidebar") {
        state.teamTabsSidebarShow = payload.payload.teamTabsSidebarShow;
      }
    },
    changeStateChatListSidebar(state, payload) {
      if (payload.payload.type === "chatlistsidebar") {
        state.chatListSidebarShow = payload.payload.chatListSidebarShow;
      }
    },
    changeStateSettingOptionsSidebar(state, payload) {
      if (payload.payload.type === "settingoptionssidebar") {
        state.settingOptionsSidebarShow =
          payload.payload.settingOptionsSidebarShow;
      }
    },
    changeStateHelpSidebar(state, payload) {
      if (payload.payload.type === "helpsidebar") {
        state.helpSidebarShow = payload.payload.helpSidebarShow;
      }
    },
    setNewNoti(state, action) {
      state.newNotfication = action.payload;
    },
    setCurrentPostPage(state) {
      state.currentPostPage++;
    },
    setDarkMode(state, action) {
      state.darkMode = !state.darkMode;
    },
    setCollapseHeader(state, action) {
      state.collapseHeader = action.payload;
    },
    setTeamLoading(state, action) {
      state.teamLoading = action.payload;
    },
    setFilterChange(state, action) {
      state.filterChanged = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;
export const {
  addAlarm,
  deleteAlarm,
  clearAlarm,
  setTaskRemoveId,
  setShowDialogModal,
  setDialogResult,
  changeStateHelpSidebar,
  setSettingPageTab,
  setHelpPageTab,
  changeState,
  setCurrentPostPage,
  setDarkMode,
  setCollapseHeader,
  setFilterChange,
  refactorTasks,
  setTeamLoading,
  setNewNoti,
  changeStateTeamTabsSidebar,
  changeStateChatListSidebar,
  changeStateSettingOptionsSidebar,
  setUserModal,
  setTaskEditModal,
  setViewHistory,
  setSearchGlobalStr,
  setMeeting,
} = actions; // named export
export default reducer; // default export
