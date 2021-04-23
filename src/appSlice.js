import { createSlice } from "@reduxjs/toolkit";

const initKanbanBoardData = {
  tasks: {
    "task-1": {
      taskId: "task-1",
      taskName: "First",
    },
    "task-2": {
      taskId: "task-2",
      taskName: "Second",
    },
    "task-3": {
      taskId: "task-3",
      taskName: "Third",
    },
    "task-4": {
      taskId: "task-4",
      taskName: "Fourth",
    },
    "task-5": {
      taskId: "task-5",
      taskName: "fifth",
    },
    "task-6": {
      taskId: "task-6",
      taskName: "Sixth",
    },
    "task-7": {
      taskId: "task-7",
      taskName: "Seventh",
    },
    "task-8": {
      taskId: "task-8",
      taskName: "Eighth",
    },
  },
  lists: {
    "list-1": {
      listId: "list-1",
      listTitle: "To do",
      listTaskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "list-2": {
      listId: "list-2",
      listTitle: "In progress",
      listTaskIds: ["task-5"],
    },
    "list-3": {
      listId: "list-3",
      listTitle: "Done",
      listTaskIds: ["task-6", "task-7", "task-8"],
    },
  },
  listOrder: ["list-1", "list-2", "list-3"],
};

const appSlice = createSlice({
  name: "app",
  initialState: {
    sidebarShow: "responsive",
    currentPostPage: 1,
    darkMode: true,
    kanbanBoardData: initKanbanBoardData,
    filterChanged: false,
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
    }
  },
});

const { actions, reducer } = appSlice;
export const {
  setKanbanBoardData,
  changeState,
  setCurrentPostPage,
  setDarkMode,
  setFilterChange
} = actions; // named export
export default reducer; // default export
