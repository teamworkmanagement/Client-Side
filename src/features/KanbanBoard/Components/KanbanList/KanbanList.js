import React, { useEffect, useState } from "react";
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
import { useHistory } from "react-router";
import taskApi from "src/api/taskApi";
import queryString from "query-string";
import { BsPlusSquare } from "react-icons/bs";

KanbanList.propTypes = {};

function KanbanList(props) {
  const dispatch = useDispatch();
  const [headerTitle, setHeaderTitlte] = useState(props.data.kanbanListTitle);
  const [showAddCard, setShowAddCard] = useState(false);
  const [taskObj, setTaskObj] = useState(null);

  const { taskUIKanbans } = props.data;

  const handleShowCreateCard = () => {
    setShowAddCard(true);
  };

  const removeKbList = () => {
    const params = {
      KanbanListId: props.data.kanbanListId,
      KanbanListBoardBelongedId: props.data.kanbanListBoardBelongedId,
    };
    kanbanApi
      .removeKanbanList({
        params,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const history = useHistory();
  const user = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    /*const queryObj = queryString.parse(history.location.search);

    if (!queryObj.t || !queryObj.b)
      return;
    let params = {};
    if (props.isOfTeam) {
      params = {
        isOfTeam: true,
        ownerId: props.ownerId,
        boardId: queryObj.b,
        taskId: queryObj.t,
      }
    }
    else {
      params = {
        isOfTeam: false,
        ownerId: user.id,
        boardId: queryObj.b,
        taskId: queryObj.t
      }
    }

    taskApi.getTaskByBoard({ params }).then(res => {

    }).catch(err => {

    });*/
  }, [history.location.search]);
  return (
    <Draggable
      draggableId={props.data.kanbanListId}
      isDragDisabled={props.data.kanbanListOrderInBoard === -999999}
      index={props.index}
    >
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
            title={props.data.kanbanListTitle}
            kanbanListId={props.data.kanbanListId}
            dragHandleProps={{ ...provided.dragHandleProps }}
            defaultList={props.data.kanbanListDefault}
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
                      ownerId={props.ownerId}
                      isOfTeam={props.isOfTeam}
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
            <div className="btn-add-card">
              <BsPlusSquare className="icon-plus" />
              Thêm thẻ
            </div>
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
