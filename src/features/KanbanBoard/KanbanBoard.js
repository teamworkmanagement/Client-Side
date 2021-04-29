import React, { useEffect, useState } from "react";
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
import { CButton, CButtonGroup } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getBoardDataForUI } from "./kanbanSlice";

KanbanBoard.propTypes = {};

function KanbanBoard(props) {
  const dispatch = useDispatch();

  const kanbanLists = useSelector((state) => state.kanban.kanbanBoard.kanbanLists);

  const boardId = "board_1";

  function onDragEnd(result) {
    dispatch(handleDragEnd(result));
    return;
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
