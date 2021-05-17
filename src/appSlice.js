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

const KanbanBoards = [
  {
    kanbanBoardId: "board_1",
    kanbanBoardIsOfTeam: false,
    kanbanBoardIdBelonged: "no data yet",
  },
];

const KanbanLists = [
  {
    kanbanListId: "list_1",
    kanbanListTitle: "Module Giao diện",
    kanbanListBoardBelongedId: "board_1",
    kanbanListOrderInBoard: 0,
  },
  {
    kanbanListId: "list_2",
    kanbanListTitle: "Bugs của backend & API",
    kanbanListBoardBelongedId: "board_1",
    kanbanListOrderInBoard: 1,
  },
  {
    kanbanListId: "list_3",
    kanbanListTitle: "Lỗi Còn lại",
    kanbanListBoardBelongedId: "board_1",
    kanbanListOrderInBoard: 2,
  },
  {
    kanbanListId: "list_4",
    kanbanListTitle: "Team Building chuẩn bị gì",
    kanbanListBoardBelongedId: "board_1",
    kanbanListOrderInBoard: 3,
  },
  {
    kanbanListId: "list_5",
    kanbanListTitle: "List test overflow x",
    kanbanListBoardBelongedId: "board_1",
    kanbanListOrderInBoard: 4,
  },
  {
    kanbanListId: "list_6",
    kanbanListTitle: "List test overflow x",
    kanbanListBoardBelongedId: "board_1",
    kanbanListOrderInBoard: 5,
  },
];

const Tasks = [
  {
    taskId: "task_1",
    taskName: "Fix dashboard layout",
    taskDescription:
      "Responsive của dashboard bị lỗi ở 2 breakpoint là sm và xl",
    taskPoint: 2,
    taskCreatedAt: new Date(2020, 11, 20),
    taskStartDate: new Date(2021, 11, 25),
    taskDeadline: new Date(2021, 11, 31),
    taskStatus: "todo",
    taskCompletedPercent: 0,
    taskListBelongedId: "list_1",
    taskOrderInlist: 0,
    taskThemeColor: "#52a8ff",
  },
  {
    taskId: "task_2",
    taskName: "Làm giao diện cho Chatbox",
    taskDescription:
      "Thay đổi theme chatbox cũ, add listchat mới cho page Chatbox",
    taskPoint: 5,
    taskCreatedAt: new Date(2020, 11, 20),
    taskStartDate: new Date(2020, 12, 25),
    taskDeadline: new Date(2021, 1, 2),
    taskStatus: "doing",
    taskCompletedPercent: 65,
    taskListBelongedId: "list_1",
    taskOrderInlist: 1,
    taskThemeColor: "",
  },
  {
    taskId: "task_3",
    taskName: "Viết Test plan cho App",
    taskDescription: "",
    taskPoint: 4,
    taskCreatedAt: new Date(2020, 11, 20),
    taskStartDate: new Date(2021, 1, 1),
    taskDeadline: new Date(2021, 1, 12),
    taskStatus: "done",
    taskCompletedPercent: 100,
    taskListBelongedId: "list_1",
    taskOrderInlist: 2,
    taskThemeColor: "",
  },
  {
    taskId: "task_4",
    taskName: "Update phiên bản mới nhất packages.json",
    taskDescription:
      "Trong file packages.json nhiều libs bị lỗi version, cần update lên phiên bản latest gấp trước ngày 21/03/2021",
    taskPoint: 2,
    taskCreatedAt: new Date(2021, 3, 18),
    taskStartDate: new Date(2021, 3, 18),
    taskDeadline: new Date(2021, 3, 21),
    taskStatus: "todo",
    taskCompletedPercent: 0,
    taskListBelongedId: "list_2",
    taskOrderInlist: 0,
    taskThemeColor: "",
  },
  {
    taskId: "task_5",
    taskName: "API chạy chậm trên chrome",
    taskDescription:
      "Fix lỗi API chậm trên chrome, firefox và cốc cốc bình thường",
    taskPoint: 3,
    taskCreatedAt: new Date(2020, 1, 20),
    taskStartDate: new Date(2021, 1, 26),
    taskDeadline: new Date(2021, 1, 29),
    taskStatus: "doing",
    taskCompletedPercent: 41,
    taskListBelongedId: "list_3",
    taskOrderInlist: 0,
    taskThemeColor: "",
  },
  {
    taskId: "task_6",
    taskName: "Phân quyền cho leader trong nhóm",
    taskDescription:
      "Leader chưa có quyền giao task và chỉnh sửa task cho nhóm",
    taskPoint: 7,
    taskCreatedAt: new Date(2020, 4, 16),
    taskStartDate: new Date(2021, 4, 17),
    taskDeadline: new Date(2021, 4, 30),
    taskStatus: "done",
    taskCompletedPercent: 100,
    taskListBelongedId: "list_3",
    taskOrderInlist: 1,
    taskThemeColor: "",
  },
  {
    taskId: "task_7",
    taskName: "Đem theo lều và thức ăn",
    taskDescription: "Chuẩn bị búa, cọc, lều, thức ăn, bàn ghế di động,...",
    taskPoint: 3,
    taskCreatedAt: new Date(2020, 3, 17),
    taskStartDate: new Date(2021, 3, 20),
    taskDeadline: new Date(2021, 4, 1),
    taskStatus: "doing",
    taskCompletedPercent: 56,
    taskListBelongedId: "list_4",
    taskOrderInlist: 0,
    taskThemeColor: "",
  },
  {
    taskId: "task_8",
    taskName: "Lập nhóm trưởng cho ngày chơi teambuilding",
    taskDescription:
      "Tự lập đội, nhóm để tham gia các hoạt động ngày cuối của teambuilding day",
    taskPoint: 7,
    taskCreatedAt: new Date(2020, 4, 16),
    taskStartDate: new Date(2021, 4, 16),
    taskDeadline: new Date(2021, 4, 17),
    taskStatus: "doing",
    taskCompletedPercent: 12,
    taskListBelongedId: "list_4",
    taskOrderInlist: 1,
    taskThemeColor: "",
  },
  {
    taskId: "task_9",
    taskName: "Điền thông tin nhóm vào form",
    taskDescription:
      "Sau khi lập đội, leader đại diện gửi thông tin thành viên vào form của công ty",
    taskPoint: 7,
    taskCreatedAt: new Date(2020, 4, 18),
    taskStartDate: new Date(2021, 4, 18),
    taskDeadline: new Date(2021, 4, 20),
    taskStatus: "todo",
    taskCompletedPercent: 0,
    taskListBelongedId: "list_4",
    taskOrderInlist: 2,
    taskThemeColor: "",
  },
  {
    taskId: "task_10",
    taskName: "Đóng tiền quỹ",
    taskDescription:
      "Mỗi người đóng 5.000.000đ (5 triệu) tiền đi chơi, 20% số tiền sẽ được trích làm từ thiện",
    taskPoint: 7,
    taskCreatedAt: new Date(2020, 4, 22),
    taskStartDate: new Date(2021, 4, 25),
    taskDeadline: new Date(2021, 5, 3),
    taskStatus: "todo",
    taskCompletedPercent: 0,
    taskListBelongedId: "list_4",
    taskOrderInlist: 3,
    taskThemeColor: "",
  },
];

const HandleTasks = [
  {
    handleTaskId: "handle_1",
    handleTaskUserId: "user_1",
    handleTaskTaskId: "task_1",
    handleTaskCreatedAt: new Date(),
    handleTaskIsDeleted: false,
  },
  {
    handleTaskId: "handle_2",
    handleTaskUserId: "user_2",
    handleTaskTaskId: "task_2",
    handleTaskCreatedAt: new Date(),
    handleTaskIsDeleted: false,
  },
  {
    handleTaskId: "handle_3",
    handleTaskUserId: "user_3",
    handleTaskTaskId: "task_3",
    handleTaskCreatedAt: new Date(),
    handleTaskIsDeleted: false,
  },
  {
    handleTaskId: "handle_4",
    handleTaskUserId: "user_4",
    handleTaskTaskId: "task_4",
    handleTaskCreatedAt: new Date(),
    handleTaskIsDeleted: false,
  },
  {
    handleTaskId: "handle_5",
    handleTaskUserId: "user_5",
    handleTaskTaskId: "task_5",
    handleTaskCreatedAt: new Date(),
    handleTaskIsDeleted: false,
  },
  {
    handleTaskId: "handle_6",
    handleTaskUserId: "user_6",
    handleTaskTaskId: "task_6",
    handleTaskCreatedAt: new Date(),
    handleTaskIsDeleted: false,
  },
  {
    handleTaskId: "handle_7",
    handleTaskUserId: "user_7",
    handleTaskTaskId: "task_7",
    handleTaskCreatedAt: new Date(),
    handleTaskIsDeleted: false,
  },
  {
    handleTaskId: "handle_8",
    handleTaskUserId: "user_8",
    handleTaskTaskId: "task_8",
    handleTaskCreatedAt: new Date(),
    handleTaskIsDeleted: false,
  },
  {
    handleTaskId: "handle_9",
    handleTaskUserId: "user_9",
    handleTaskTaskId: "task_9",
    handleTaskCreatedAt: new Date(),
    handleTaskIsDeleted: false,
  },
  {
    handleTaskId: "handle_10",
    handleTaskUserId: "user_10",
    handleTaskTaskId: "task_10",
    handleTaskCreatedAt: new Date(),
    handleTaskIsDeleted: false,
  },
];

const Files = [
  {
    fileId: "file_1",
    fileName: "image_1",
    fileUrl: "https://emilus.themenate.net/img/others/img-13.jpg",
    fileType: "image",
    fileBelongedId: "task_1",
  },
  {
    fileId: "file_2",
    fileName: "image_2",
    fileUrl: "https://emilus.themenate.net/img/others/img-14.jpg",
    fileType: "image",
    fileBelongedId: "task_1",
  },
  {
    fileId: "file_3",
    fileName: "image_3",
    fileUrl: "https://emilus.themenate.net/img/others/img-15.jpg",
    fileType: "image",
    fileBelongedId: "task_4",
  },
  {
    fileId: "file_4",
    fileName: "image_4",
    fileUrl: "https://emilus.themenate.net/img/others/img-12.jpg",
    fileType: "image",
    fileBelongedId: "task_4",
  },
  {
    fileId: "file_5",
    fileName: "image_5",
    fileUrl: "https://emilus.themenate.net/img/others/img-14.jpg",
    fileType: "image",
    fileBelongedId: "task_7",
  },
];

const initKanbanBoardData = {
  //refactor source data for "dnd" data structure
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

//#endregion

const testInitKanbanBoardData = {
  //refactor source data for "dnd" data structure
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
    //data from api
    tasks: Tasks,
    users: Users,
    handleTasks: HandleTasks,
    kanbanBoards: KanbanBoards,
    kanbanLists: KanbanLists,
    files: Files,
    teamLoading: false,
    newNotfication: null,
  },
  reducers: {
    changeState(state, payload) {
      if (payload.payload.type === "set") {
        state.sidebarShow = payload.payload.sidebarShow;
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
  setKanbanBoardData,
  changeState,
  setCurrentPostPage,
  setDarkMode,
  setFilterChange,
  refactorTasks,
  setKanbanLists,
  handleDragEnd,
  updateTask,
  setTeamLoading,
  setNewNoti
} = actions; // named export
export default reducer; // default export
