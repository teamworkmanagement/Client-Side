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


                const cloneKanbanLists = JSON.parse(JSON.stringify(state.kanbanBoard.kanbanLists))

                console.log(cloneKanbanLists);
                

                //source
                const sourceList = cloneKanbanLists.find(x => x.kanbanListId === source.droppableId);
                console.log(sourceList);
                const sourceElement = sourceList.taskUIKanban.find(x => x.orderInList === source.index);

                //set new pos for source
                sourceList.taskUIKanban.forEach(e => {
                    if (e.orderInList > source.index)
                        e.orderInList--;
                });
                //delete old pos
                sourceList.taskUIKanban.splice(source.index, 1);


                //destination
                const destinationList = cloneKanbanLists.find(x => x.kanbanListId === destination.droppableId);

                //set mew pos for destination
                destinationList.taskUIKanban.forEach(e => {
                    if (e.orderInList >= destination.index)
                        e.orderInList++;
                });

                //add new pos
                sourceElement.orderInList = destination.index;
                sourceElement.kanbanListId = destination.droppableId;

                destinationList.taskUIKanban.splice(destination.index, 0, sourceElement);

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
    handleDragEnd,
} = actions;
export default reducer;
