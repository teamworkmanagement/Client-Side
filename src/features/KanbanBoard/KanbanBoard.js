import React from "react";
import PropTypes from "prop-types";
import "./KanbanBoard.scss";
import { useDispatch, useSelector } from "react-redux";
import KanbanList from "./Components/KanbanList/KanbanList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { setKanbanBoardData } from "src/appSlice";

KanbanBoard.propTypes = {};

function KanbanBoard(props) {
  const dispatch = useDispatch();
  const kanbanBoardData = useSelector((state) => state.app.kanbanBoardData);

  function handleDragEnd(result) {
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
      const newColumnOrder = Array.from(kanbanBoardData.listOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newData = {
        newColumnOrder: newColumnOrder,
        type: 3,
      };
      dispatch(setKanbanBoardData(newData));

      return;
    }

    const start = kanbanBoardData.lists[source.droppableId];
    const finish = kanbanBoardData.lists[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.listTaskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newData = {
        listId: source.droppableId,
        newTaskIds: newTaskIds,
        type: 1,
      };
      dispatch(setKanbanBoardData(newData));
      return;
    }

    const startTaskIds = Array.from(start.listTaskIds);
    const finishTaskIds = Array.from(finish.listTaskIds);
    startTaskIds.splice(source.index, 1);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newData = {
      listIdSource: source.droppableId,
      startTaskIds: startTaskIds,
      listIdFinish: destination.droppableId,
      finishTaskIds: finishTaskIds,
      type: 2,
    };
    dispatch(setKanbanBoardData(newData));
  }

  return (
    <div className="kanban-board-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="board"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {kanbanBoardData.listOrder.map((listId, index) => {
                return (
                  <KanbanList
                    key={listId}
                    data={kanbanBoardData.lists[listId]}
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
