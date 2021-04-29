import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import kanbanApi from "src/api/kanbanApi";

//#region Source data: (props map to table database) from API CALL

//#endregion

export const getBoardDataForUI = createAsyncThunk(
    'kanban/getboardui',
    async (boardId) => {
        const data = await kanbanApi.getBoardUI(boardId);
        console.log('kanban data redux: ', data.data);
        return data.data;
    }
);

const kanbanSlice = createSlice({
    name: "kanban",
    initialState: {
        kanbanBoard: {
            kanbanLists:[]
        }
    },
    reducers: {
        setKanbanLists(state, payload) {

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
    },
    extraReducers: {
        [getBoardDataForUI.fulfilled]: (state, action) => {
            state.kanbanBoard.kanbanLists = action.payload.kanbanListUI;
        }
    }
},
);

const { actions, reducer } = kanbanSlice;
export const {
    setKanbanLists,
    handleDragEnd,
} = actions; // named export
export default reducer; // default export
