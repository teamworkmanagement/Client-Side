import React from "react";
import PropTypes from "prop-types";
import "./KanbanList.scss";
import KanbanCard from "./Components/KanbanCard/KanbanCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

KanbanList.propTypes = {};

function KanbanList(props) {
  const kanbanBoardData = useSelector((state) => state.app.kanbanBoardData);

  return (
    <Draggable draggableId={props.data.listId} index={props.index}>
      {(provided) => (
        <div
          className="kanbanlist-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="kanbanlist-header" {...provided.dragHandleProps}>
            {props.data.listTitle}
          </div>
          <Droppable droppableId={props.data.listId} type="task">
            {(provided) => (
              <div
                className="kanbanlist-cards"
                ref={provided.innerRef} //required by dnd
                {...provided.droppableProps} //required by dnd
              >
                {props.data.listTaskIds.map((taskId, index) => {
                  return (
                    <KanbanCard
                      key={taskId}
                      data={kanbanBoardData.tasks[taskId]}
                      index={index} //required by dnd
                    />
                  );
                })}
                {
                  provided.placeholder //required by dnd
                }
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default KanbanList;
