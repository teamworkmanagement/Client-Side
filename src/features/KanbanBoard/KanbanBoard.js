import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./KanbanBoard.scss";
import { useDispatch, useSelector } from "react-redux";
import KanbanList from "./Components/KanbanList/KanbanList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  setKanbanBoardData,
  setKanbanLists,
  handleDragEnd,
} from "src/appSlice";

KanbanBoard.propTypes = {};

function KanbanBoard(props) {
  const dispatch = useDispatch();

  const kanbanBoardData = useSelector((state) => state.app.kanbanBoardData);
  const kanbanLists = useSelector((state) => state.app.kanbanLists);
  const tasks = useSelector((state) => state.app.tasks);
  const boardId = "board_1";

  function onDragEnd(result) {
    dispatch(handleDragEnd(result));
    return;

    // const start = kanbanBoardData.lists[source.droppableId];
    // const finish = kanbanBoardData.lists[destination.droppableId];
    // if (start === finish) {
    //   const newTaskIds = Array.from(start.listTaskIds);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);

    //   const newData = {
    //     listId: source.droppableId,
    //     newTaskIds: newTaskIds,
    //     type: 1,
    //   };
    //   dispatch(setKanbanBoardData(newData));
    //   return;
    // }

    // const startTaskIds = Array.from(start.listTaskIds);
    // const finishTaskIds = Array.from(finish.listTaskIds);
    // startTaskIds.splice(source.index, 1);
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newData = {
    //   listIdSource: source.droppableId,
    //   startTaskIds: startTaskIds,
    //   listIdFinish: destination.droppableId,
    //   finishTaskIds: finishTaskIds,
    //   type: 2,
    // };
    // dispatch(setKanbanBoardData(newData));
  }

  function getKanbanListsData() {
    const boardId = "board_1";
    const lists = [];
    for (var i = 0; i < kanbanLists.length; i++) {
      if (kanbanLists[i].kanbanListBoardBelongedId === boardId) {
        lists.push({ ...kanbanLists[i] });
      }
    }
    if (lists.length === 0) return lists;
    //sort
    let clonedLists = [...lists];
    for (var i = 0; i < clonedLists.length; i++) {
      for (var j = i + 1; j < clonedLists.length; j++) {
        if (
          clonedLists[i].kanbanListOrderInBoard >
          clonedLists[j].kanbanListOrderInBoard
        ) {
          //debugger;
          let temp = clonedLists[i];
          clonedLists[i] = clonedLists[j];
          clonedLists[j] = temp;
        }
      }
    }
    return [...clonedLists];
  }

  let kanbanListsData = getKanbanListsData();

  return (
    <div className="kanban-board-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={boardId} direction="horizontal" type="list">
          {(provided) => (
            <div
              className="board"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {kanbanListsData.map((item, index) => {
                return (
                  <KanbanList
                    key={item.kanbanListId}
                    data={item}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;
