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
  },
  reducers: {
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
    setKanbanBoardData(state, payload) {
      if (payload.payload.type === 1) {
        state.kanbanBoardData.lists[payload.payload.listId].listTaskIds =
          payload.payload.newTaskIds;
      }
      if (payload.payload.type === 2) {
        state.kanbanBoardData.lists[payload.payload.listIdSource].listTaskIds =
          payload.payload.startTaskIds;
        state.kanbanBoardData.lists[payload.payload.listIdFinish].listTaskIds =
          payload.payload.finishTaskIds;
      }
      if (payload.payload.type === 3) {
        state.kanbanBoardData.listOrder = payload.payload.newColumnOrder;
      }
    },

    setFilterChange(state, action) {
      state.filterChanged = action.payload;
    },

    setKanbanLists(state, payload) {
      state.kanbanLists = payload.payload;
    },
    handleDragEnd(state, payload) {
      const result = payload.payload;
      const { destination, source, draggableId, type } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === "list") {
        if (source.index > destination.index) {
          //move back
          for (let i = 0; i < state.kanbanLists.length; i++) {
            if (state.kanbanLists[i].kanbanListId === draggableId) {
              //nếu là item đang drag, set luôn order mới
              state.kanbanLists[i] = {
                ...state.kanbanLists[i],
                kanbanListOrderInBoard: destination.index,
              };
            } else {
              //nếu là items trong vùng dịch chuyển, cộng thêm order với 1
              const order = state.kanbanLists[i].kanbanListOrderInBoard;
              if (order < source.index && order >= destination.index) {
                state.kanbanLists[i] = {
                  ...state.kanbanLists[i],
                  kanbanListOrderInBoard: order + 1,
                };
              }
            }
          }
        } else {
          for (let i = 0; i < state.kanbanLists.length; i++) {
            if (state.kanbanLists[i].kanbanListId === draggableId) {
              //nếu là item đang drag, set luôn order mới
              state.kanbanLists[i] = {
                ...state.kanbanLists[i],
                kanbanListOrderInBoard: destination.index,
              };
            } else {
              //nếu là items trong vùng dịch chuyển, cộng thêm order với 1
              const order = state.kanbanLists[i].kanbanListOrderInBoard;
              if (order > source.index && order <= destination.index) {
                state.kanbanLists[i] = {
                  ...state.kanbanLists[i],
                  kanbanListOrderInBoard: order - 1,
                };
              }
            }
          }
        }

        return;
      }

      //here is card dragging case
      if (source.droppableId === destination.droppableId) {
        //move card trong cùng list nguồn
        if (source.index > destination.index) {
          //move back
          for (let i = 0; i < state.tasks.length; i++) {
            if (state.tasks[i].taskId === draggableId) {
              //nếu là item đang drag, set luôn order mới
              state.tasks[i] = {
                ...state.tasks[i],
                taskOrderInlist: destination.index,
              };
            } else {
              //nếu là items trong vùng dịch chuyển, cộng thêm order với 1
              const order = state.tasks[i].taskOrderInlist;
              if (
                state.tasks[i].taskListBelongedId === source.droppableId &&
                order < source.index &&
                order >= destination.index
              ) {
                state.tasks[i] = {
                  ...state.tasks[i],
                  taskOrderInlist: order + 1,
                };
              }
            }
          }
        } else {
          for (let i = 0; i < state.tasks.length; i++) {
            if (state.tasks[i].taskId === draggableId) {
              //nếu là item đang drag, set luôn order mới
              state.tasks[i] = {
                ...state.tasks[i],
                taskOrderInlist: destination.index,
              };
            } else {
              //nếu là items trong vùng dịch chuyển, cộng thêm order với 1
              const order = state.tasks[i].taskOrderInlist;
              if (
                state.tasks[i].taskListBelongedId === source.droppableId &&
                order > source.index &&
                order <= destination.index
              ) {
                state.tasks[i] = {
                  ...state.tasks[i],
                  taskOrderInlist: order - 1,
                };
              }
            }
          }
        }
      } else {
        //move card khác list
        //step 1: đổi order cho list source
        for (let i = 0; i < state.tasks.length; i++) {
          const order = state.tasks[i].taskOrderInlist;
          if (
            state.tasks[i].taskListBelongedId === source.droppableId &&
            order > source.index
          ) {
            state.tasks[i] = {
              ...state.tasks[i],
              taskOrderInlist: order - 1,
            };
          }
        }
        //step 2: đổi order cho list destination
        for (let i = 0; i < state.tasks.length; i++) {
          const order = state.tasks[i].taskOrderInlist;
          if (state.tasks[i].taskId === draggableId) {
            state.tasks[i] = {
              ...state.tasks[i],
              taskOrderInlist: destination.index,
              taskListBelongedId: destination.droppableId,
            };
          } else {
            if (
              state.tasks[i].taskListBelongedId === destination.droppableId &&
              order >= destination.index
            ) {
              state.tasks[i] = {
                ...state.tasks[i],
                taskOrderInlist: order + 1,
              };
            }
          }
        }
      }
    },
    updateTask(state, payload) {
      const updatedTask = payload.payload;
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].taskId === updatedTask.taskId) {
          state.tasks[i] = {
            ...updatedTask,
          };
          console.log(state.tasks[0].taskName);
          break;
        }
      }
    },
  },
});

const { actions, reducer } = appSlice;
export const {
  setTaskRemoveId,
  setShowDialogModal,
  setDialogResult,
  changeStateHelpSidebar,
  setSettingPageTab,
  setHelpPageTab,
  setKanbanBoardData,
  changeState,
  setCurrentPostPage,
  setDarkMode,
  setCollapseHeader,
  setFilterChange,
  refactorTasks,
  setKanbanLists,
  handleDragEnd,
  updateTask,
  setTeamLoading,
  setNewNoti,
  changeStateTeamTabsSidebar,
  changeStateChatListSidebar,
  changeStateSettingOptionsSidebar,
  setUserModal,
  setTaskEditModal,
  setViewHistory,
  setSearchGlobalStr,
} = actions; // named export
export default reducer; // default export
