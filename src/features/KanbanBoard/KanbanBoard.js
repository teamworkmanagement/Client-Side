import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./KanbanBoard.scss";
import { useDispatch, useSelector } from "react-redux";
import KanbanList from "./Components/KanbanList/KanbanList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { CButton, CButtonGroup } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getBoardDataForUI, handleDragEnd } from "./kanbanSlice";
import taskApi from "src/api/taskApi";
import kanbanApi from "src/api/kanbanApi";

KanbanBoard.propTypes = {};

function KanbanBoard(props) {
  const dispatch = useDispatch();

  const kanbanLists = useSelector((state) => state.kanban.kanbanBoard.kanbanLists);

  const boardId = "board1";

  function onDragEnd(result) {
    //call api update pos (task/list) here

    console.log(result);
    dispatch(handleDragEnd(result));
    const { destination, source, type } = result;
    if (type === 'task') {
      if (destination.index === source.index && destination.droppableId === source.droppableId)
        return;
      taskApi.dragTask({
        "sourceDroppableId": source.droppableId,
        "sourceIndex": source.index,
        "destinationDroppableId": destination.droppableId,
        "destinationIndex": destination.index,
      });
    }
    else {
      if (destination.index === source.index && destination.droppableId === source.droppableId)
        return;
      kanbanApi.swapList({
        "kanbanBoardId": boardId,
        "sourceIndex": source.index,
        "destinationIndex": destination.index,
      });
    }
  }


  useEffect(() => {
    dispatch(getBoardDataForUI('board1'));
  }, []);

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
              {kanbanLists.map((item, index) => {
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
