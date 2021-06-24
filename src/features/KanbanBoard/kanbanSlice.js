import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import kanbanApi from "src/api/kanbanApi";

//#region Source data: (props map to table database) from API CALL

//#endregion

export const getBoardDataForUI = createAsyncThunk(
    'kanban/getboardui',
    async (boardId, { rejectWithValue }) => {
        try {
            const data = await kanbanApi.getBoardUI(boardId);
            //console.log('kanban data redux: ', data.data);
            return data.data;
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
);

const kanbanSlice = createSlice({
    name: "kanban",
    initialState: {
        kanbanBoard: {
            kanbanLists: [],
            currentBoard: null,
            taskSelected: null,
        },
        signalrData: {
            addNewTask: null,
            addNewList: null,
            removeTask: null,
            removeList: null,
            moveTask: null,
            moveList: null,
            updateTask: null,
            updateList: null,
            reAssignUser: null,
            addNewFile: null,
        }
    },
    reducers: {
        setCurrentBoard(state, action) {
            state.kanbanBoard.currentBoard = action.payload;
        },
        setTaskSelected(state, action) {
            state.taskSelected = action.payload;
        },
        signalRAddNewTask(state, action) {
            const list = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.kanbanListId);
            if (list) {
                state.signalrData.addNewTask = action.payload;
                list.taskUIKanbans.push(action.payload);
            }
        },
        signalRAddNewList(state, action) {
            if (action.payload.kanbanListBoardBelongedId === state.kanbanBoard.currentBoard) {
                console.log("trùng");
                state.signalrData.addNewList = action.payload;
                state.kanbanBoard.kanbanLists.push(action.payload);
            }

        },
        signalRRemoveTask(state, action) {
            const list = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.kanbanListId);
            if (list) {
                state.signalrData.removeTask = action.payload;
                const index = list.taskUIKanbans.findIndex(x => x.taskId === action.payload.taskId);
                list.taskUIKanbans.splice(index, 1);
            }
        },
        signalRRemoveList(state, action) {
            state.removeList = action.payload;
            if (action.payload.kanbanListBoardBelongedId === state.kanbanBoard.currentBoard) {
                state.signalrData.removeList = action.payload;
                const index = state.kanbanBoard.kanbanLists.findIndex(e => e.kanbanListId === action.payload.kanbanListId);
                state.kanbanBoard.kanbanLists.splice(index, 1);
            }

        },
        signalRMoveTask(state, action) {

            if (state.kanbanBoard.currentBoard === action.payload.boardId) {
                state.signalrData.moveTask = action.payload;
                if (action.payload.oldList === action.payload.newList) {
                    const listTasks = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.newList);
                    const task = listTasks.taskUIKanbans.find(x => x.taskId === action.payload.taskId);
                    console.log(task);
                    task.taskRankInList = action.payload.position;
                    listTasks.taskUIKanbans.sort((x, y) => x.taskRankInList > y.taskRankInList);
                }
                else {

                    const listTasksOld = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.oldList);

                    const index = listTasksOld.taskUIKanbans.findIndex(x => x.taskId === action.payload.taskId);

                    const task = { ...listTasksOld.taskUIKanbans[index], taskRankInList: action.payload.position, kanbanListId: action.payload.newList };
                    listTasksOld.taskUIKanbans.splice(index, 1);


                    const listTasksNew = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.newList);

                    listTasksNew.taskUIKanbans.push(task);

                    listTasksNew.taskUIKanbans.sort((x, y) => x.taskRankInList > y.taskRankInList);
                }
            }
        },
        signalRMoveList(state, action) {

            if (action.payload.kanbanBoardId === state.kanbanBoard.currentBoard) {
                const obj = state.kanbanBoard.kanbanLists.find(e => e.kanbanListId === action.payload.kanbanListId);
                obj.kanbanListRankInBoard = action.payload.position;
                state.kanbanBoard.kanbanLists.sort((x, y) => x.kanbanListRankInBoard > y.kanbanListRankInBoard);
            }

        },
        signalRUpdateTask(state, action) {
            state.signalrData.updateTask = action.payload;

            const list = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.kanbanListId);

            if (list) {
                const obj = list.taskUIKanbans.find(x => x.taskId === action.payload.taskId);

                obj.taskName = action.payload.taskName;
                obj.taskStartDate = action.payload.taskStartDate;
                obj.taskDeadline = action.payload.taskDeadline;
                obj.taskStatus = action.payload.taskStatus;
                obj.taskDescription = action.payload.taskDescription;

                obj.taskImageUrl = action.payload.taskImageUrl;
                obj.taskCompletedPercent = action.payload.taskCompletedPercent;

                obj.taskThemeColor = action.payload.taskThemeColor;
                obj.commentsCount = action.payload.commentsCount;
            }
        },
        signalRUpdateList(state, action) {
            state.updateList = action.payload;
        },

        dragTaskLocal(state, action) {
            if (action.payload.oldList === action.payload.newList) {
                const listTasks = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.newList);
                const task = listTasks.taskUIKanbans.find(x => x.taskId === action.payload.taskId);
                console.log(task);
                task.taskRankInList = action.payload.position;
                listTasks.taskUIKanbans.sort((x, y) => x.taskRankInList > y.taskRankInList);
            }
            else {
                const listTasksOld = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.oldList);

                const index = listTasksOld.taskUIKanbans.findIndex(x => x.taskId === action.payload.taskId);

                const task = { ...listTasksOld.taskUIKanbans[index], taskRankInList: action.payload.position, kanbanListId: action.payload.newList };
                listTasksOld.taskUIKanbans.splice(index, 1);

                const listTasksNew = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.newList);

                listTasksNew.taskUIKanbans.push(task);

                listTasksNew.taskUIKanbans.sort((x, y) => x.taskRankInList > y.taskRankInList);
            }
        },

        dragListLocal(state, action) {
            const obj = state.kanbanBoard.kanbanLists.find(e => e.kanbanListId === action.payload.kanbanListId);
            obj.kanbanListRankInBoard = action.payload.position;
            state.kanbanBoard.kanbanLists.sort((x, y) => x.kanbanListRankInBoard > y.kanbanListRankInBoard);
        },

        reAssignUser(state, action) {
            const list = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.kanbanListId);
            if (list) {
                state.signalrData.reAssignUser = action.payload;
                const task = list.taskUIKanbans.find(x => x.taskId === action.payload.taskId);
                task.userId = action.payload.userId;
                task.userAvatar = action.payload.userAvatar;
            }
        },
        signalRChangeNameList(state, action) {
            const obj = state.kanbanBoard.kanbanLists.find(e => e.kanbanListId === action.payload.kanbanListId);
            obj.kanbanListTitle = action.payload.kanbanListName;
        },
        signalRAddFile(state, action) {
            const list = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.kanbanListId);
            if (list) {
                state.signalrData.addNewFile = action.payload;
                const task = list.taskUIKanbans.find(x => x.taskId === action.payload.fileTaskOwnerId);
                task.filesCount++;
            }
        }
    },
    extraReducers: {
        [getBoardDataForUI.fulfilled]: (state, action) => {
            state.kanbanBoard.kanbanLists = action.payload ? action.payload.kanbanListUIs : [];
            state.kanbanBoard.currentBoard = action.payload ? action.payload.kanbanBoardId : null;
        }
    }
},
);

const { actions, reducer } = kanbanSlice;
export const {
    signalRAddNewTask,
    signalRAddNewList,
    signalRRemoveTask,
    signalRRemoveList,
    signalRMoveTask,
    signalRMoveList,
    signalRUpdateTask,
    signalRUpdateList,
    setCurrentBoard,
    setTaskSelected,
    dragListLocal,
    dragTaskLocal,
    reAssignUser,
    signalRChangeNameList,
    signalRAddFile
} = actions;
export default reducer;