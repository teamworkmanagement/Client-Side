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
            kanbanLists: []
        }
    },
    reducers: {
        handleDragEnd(state, action) {
            const { destination, source, draggableId, type } = action.payload;

            if (!destination) return;
            if (type == 'task') {
                if (destination.droppableId === source.droppableId && destination.index === source.index)
                    return;


                const cloneKanbanLists = JSON.parse(JSON.stringify(state.kanbanBoard.kanbanLists));

                //        console.log(cloneKanbanLists);



                //source
                const sourceList = cloneKanbanLists.find(x => x.kanbanListId === source.droppableId);
                //      console.log(sourceList);
                const sourceElement = sourceList.taskUIKanbans.find(x => x.orderInList === source.index);

                //set new pos for source
                sourceList.taskUIKanbans.forEach(e => {
                    if (e.orderInList > source.index)
                        e.orderInList--;
                });
                //delete old pos
                sourceList.taskUIKanbans.splice(source.index, 1);


                //destination
                const destinationList = cloneKanbanLists.find(x => x.kanbanListId === destination.droppableId);

                //set mew pos for destination
                destinationList.taskUIKanbans.forEach(e => {
                    if (e.orderInList >= destination.index)
                        e.orderInList++;
                });

                //add new pos
                sourceElement.orderInList = destination.index;
                sourceElement.kanbanListId = destination.droppableId;

                destinationList.taskUIKanbans.splice(destination.index, 0, sourceElement);

                state.kanbanBoard.kanbanLists = cloneKanbanLists;
            }
            else {
                if (destination.droppableId === source.droppableId && destination.index === source.index)
                    return;

                const cloneKanbanLists = JSON.parse(JSON.stringify(state.kanbanBoard.kanbanLists));

                cloneKanbanLists[destination.index].kanbanListOrderInBoard = source.index;
                cloneKanbanLists[source.index].kanbanListOrderInBoard = destination.index;

                //swap list
                [cloneKanbanLists[destination.index], cloneKanbanLists[source.index]] = [cloneKanbanLists[source.index], cloneKanbanLists[destination.index]];

                state.kanbanBoard.kanbanLists = cloneKanbanLists;
            }

        },

        updateEditTask(state, action) {

            const cloneKanbanLists = JSON.parse(JSON.stringify(state.kanbanBoard.kanbanLists));

            const kbList = cloneKanbanLists.find(x => x.kanbanListId === action.payload.kanbanListId);
            const taskIndex = kbList.taskUIKanbans.findIndex(x => x.taskId === action.payload.taskId);

            const newTask = {
                ...kbList.taskUIKanbans[taskIndex],
                ...action.payload,
            };

            console.log(newTask);

            kbList.taskUIKanbans[taskIndex] = newTask;

            state.kanbanBoard.kanbanLists = cloneKanbanLists;
        },
        addNewTask(state, action) {
            const cloneKanbanLists = JSON.parse(JSON.stringify(state.kanbanBoard.kanbanLists));
            const kbLists = cloneKanbanLists.find(x => x.kanbanListId === action.payload.kanbanListId);

            //console.log(kbLists);
            //console.log(action.payload);

            //console.log(kbLists.taskUIKanbans);
            kbLists.taskUIKanbans.push(action.payload);
            //console.log(kbLists.taskUIKanbans);
            //console.log(cloneKanbanLists);
            state.kanbanBoard.kanbanLists = cloneKanbanLists;
        },
        removeTask(state, action) {

            const cloneKanbanLists = JSON.parse(JSON.stringify(state.kanbanBoard.kanbanLists));
            const kbList = cloneKanbanLists.find(x => x.kanbanListId === action.payload.kanbanListId);

            //console.log(kbLists.taskUIKanbans);
            //console.log(action.payload);

            kbList.taskUIKanbans.forEach(e => {
                if (e.orderInList > action.payload.orderInList)
                    e.orderInList--;
            });

            kbList.taskUIKanbans.splice(action.payload.orderInList, 1);

            //console.log(kbList.taskUIKanbans);
            state.kanbanBoard.kanbanLists = cloneKanbanLists;
        }
    },
    extraReducers: {
        [getBoardDataForUI.fulfilled]: (state, action) => {
            state.kanbanBoard.kanbanLists = action.payload.kanbanListUIs;
        }
    }
},
);

const { actions, reducer } = kanbanSlice;
export const {
    handleDragEnd,
    updateEditTask,
    addNewTask,
    removeTask
} = actions;
export default reducer;