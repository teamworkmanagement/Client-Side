import React, { useState } from "react";
import PropTypes from "prop-types";
import "./KanbanList.scss";
import KanbanCard from "./Components/KanbanCard/KanbanCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import KanbanListHeader from "./Components/KanbanListHeader/KanbanListHeader";

KanbanList.propTypes = {};

function KanbanList(props) {
  const [headerTitle, setHeaderTitlte] = useState(props.data.kanbanListTitle);
  const { taskUIKanban } = props.data;

  return (
    <Draggable draggableId={props.data.kanbanListId} index={props.index}>
      {(provided) => (
        <div
          className="kanbanlist-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <KanbanListHeader
            title={headerTitle}
            dragHandleProps={{ ...provided.dragHandleProps }}
          />
          <Droppable droppableId={props.data.kanbanListId} type="task">
            {(provided) => (
              <div
                className="kanbanlist-cards"
                ref={provided.innerRef} //required by dnd
                {...provided.droppableProps} //required by dnd
              >
                {taskUIKanban.map((item, index) => {
                  return (
                    <KanbanCard
                      key={item.taskId}
                      data={item}
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
          <div className="kanbanlist-footer-container">
            <CIcon name="cil-plus" />
            Thêm thẻ
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default KanbanList;
