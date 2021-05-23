import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import kanbanApi from "src/api/kanbanApi";

//#region Source data: (props map to table database) from API CALL

//#endregion

export const getBoardDataForUI = createAsyncThunk(
    'kanban/getboardui',
    async (boardId) => {
        const data = await kanbanApi.getBoardUI(boardId);
        //console.log('kanban data redux: ', data.data);
        return data.data;
    }
);

const kanbanSlice = createSlice({
    name: "kanban",
    initialState: {
        kanbanBoard: {
            kanbanLists: [],
            currentBoard: null
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
        }
    },
    reducers: {
        setCurrentBoard(state, action) {
            state.kanbanBoard.currentBoard = action.payload;
        },

        signalRAddNewTask(state, action) {
            state.addNewTask = action.payload;
            const list = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.kanbanListId);
            if (list) {
                list.taskUIKanbans.push(action.payload);
            }
        },
        signalRAddNewList(state, action) {
            state.addNewList = action.payload;
            if (action.payload.kanbanListBoardBelongedId === state.kanbanBoard.currentBoard) {
                console.log("trùng");
                state.kanbanBoard.kanbanLists.push(action.payload);
            }

        },
        signalRRemoveTask(state, action) {
            state.removeTask = action.payload;

            const list = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.kanbanListId);
            if (list) {
                const index = list.taskUIKanbans.findIndex(x => x.taskId === action.payload.taskId);
                list.taskUIKanbans.splice(index, 1);
            }
        },
        signalRRemoveList(state, action) {
            state.removeList = action.payload;
            if (action.payload.kanbanListBoardBelongedId === state.kanbanBoard.currentBoard) {
                const index = state.kanbanBoard.kanbanLists.findIndex(e => e.kanbanListId === action.payload.kanbanListId);
                state.kanbanBoard.kanbanLists.splice(index, 1);
            }

        },
        signalRMoveTask(state, action) {
            state.removeTask = action.payload;
            if (action.payload.oldList === action.payload.newList) {
                const listTasks = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.newList);
                const task = listTasks.taskUIKanbans.find(x => x.taskId === action.payload.taskId);
                task.orderInList = action.payload.position;
                listTasks.taskUIKanbans.sort((x, y) => x.orderInList - y.orderInList >= 0);
            }
            else {
                const listTasksOld = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.oldList);
                const index = listTasksOld.taskUIKanbans.findIndex(x => x.taskId === action.payload.taskId);

                const task = { ...listTasksOld.taskUIKanbans[index], orderInList: action.payload.position };
                listTasksOld.taskUIKanbans.splice(index, 1);

                const listTasksNew = state.kanbanBoard.kanbanLists.find(x => x.kanbanListId === action.payload.newList);
                listTasksNew.taskUIKanbans.push(task);

                listTasksNew.taskUIKanbans.sort((x, y) => x.orderInList - y.orderInList >= 0);
            }
        },
        signalRMoveList(state, action) {
            state.removeList = action.payload;
            if (action.payload.kanbanBoardId === state.kanbanBoard.currentBoard) {
                const obj = state.kanbanBoard.kanbanLists.find(e => e.kanbanListId === action.payload.kanbanListId);
                obj.kanbanListOrderInBoard = action.payload.position;
                state.kanbanBoard.kanbanLists.sort((x, y) => x.kanbanListOrderInBoard - y.kanbanListOrderInBoard >= 0);
            }

        },
        signalRUpdateTask(state, action) {
            state.updateTask = action.payload;
        },
        signalRUpdateList(state, action) {
            state.updateList = action.payload;
        },
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
    setCurrentBoard
} = actions;
export default reducer;