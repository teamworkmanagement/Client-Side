import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import "./KanbanCard.scss";

KanbanCard.propTypes = {};

function KanbanCard(props) {
  return (
    <Draggable draggableId={props.data.taskId} index={props.index}>
      {(provided) => (
        <div
          className="kanbancard-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="card-name">{props.data.taskName}</div>
        </div>
      )}
    </Draggable>
  );
}

export default KanbanCard;
