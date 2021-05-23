import React, { useState } from "react";
import PropTypes from "prop-types";
import "./KanbanList.scss";
import KanbanCard from "./Components/KanbanCard/KanbanCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
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
import CreateCardModal from "./Components/CreateCardModal/CreateCardModal";
import kanbanApi from "src/api/kanbanApi";

KanbanList.propTypes = {};

function KanbanList(props) {

  const dispatch = useDispatch();
  const [headerTitle, setHeaderTitlte] = useState(props.data.kanbanListTitle);
  const [showAddCard, setShowAddCard] = useState(false);

  const { taskUIKanbans } = props.data;

  const handleShowCreateCard = () => {
    setShowAddCard(true);
  };

  const removeKbList = () => {
    const params = {
      KanbanListId: props.data.kanbanListId,
      KanbanListBoardBelongedId: props.data.kanbanListBoardBelongedId,
    }
    kanbanApi.removeKanbanList({
      params
    }).then(res => { }).catch(err => { })
  }
  return (
    <Draggable draggableId={props.data.kanbanListId} index={props.index}>
      {(provided) => (
        <div
          className="kanbanlist-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <KanbanListHeader
            removeList={removeKbList}
            handleShowCreateCard={handleShowCreateCard}
            cardCount={props.data.taskUIKanbans.length}
            title={headerTitle}
            dragHandleProps={{ ...provided.dragHandleProps }}
          />
          <Droppable droppableId={props.data.kanbanListId} type="task">
            {(provided, snapshot) => (
              <div
                className="kanbanlist-cards"
                ref={provided.innerRef} //required by dnd
                {...provided.droppableProps} //required by dnd
                isDraggingOver={snapshot.isDraggingOver}
              >
                {taskUIKanbans.map((item, index) => {
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
          <div
            className="kanbanlist-footer-container"
            onClick={() => setShowAddCard(true)}
          >
            <CIcon name="cil-plus" />
            Thêm thẻ
          </div>
          <CreateCardModal
            showAddCard={showAddCard}
            setShowAddCard={setShowAddCard}
            kblistId={props.data.kanbanListId}
            tasksCount={props.data.taskUIKanbans.length}
          />
        </div>
      )}
    </Draggable>
  );
}

export default KanbanList;
