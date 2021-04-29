import React, { useState } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import "./KanbanCard.scss";
import {
  CButton,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
  CProgress,
  CRow,
  CTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import moment from "moment";
import { useSelector } from "react-redux";
import { CirclePicker } from "react-color";
import TaskEditModal from "./Components/TaskEditModal/TaskEditModal";

KanbanCard.propTypes = {};

function KanbanCard(props) {
  const initIsShowEditPopup = false;

  const [isShowEditPopup, setIsShowEditPopup] = useState(initIsShowEditPopup);

  const files = useSelector((state) => state.app.files);
  const handleTasks = useSelector((state) => state.app.handleTasks);
  const users = useSelector((state) => state.app.users);
  const imageCard = getCardImage();
  const attachmentsCount = getAttachmentsCount();
  const assignedUserImage = getAssignedUserImage();

  function getAssignedUserImage() {
    //find handleTask
    let userHandleId = "";
    for (let i = 0; i < handleTasks.length; i++) {
      if (handleTasks[i].handleTaskTaskId === props.data.taskId) {
        userHandleId = handleTasks[i].handleTaskUserId;
        break;
      }
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].userId === userHandleId) {
        return users[i].userImageUrl;
      }
    }
    return "";
  }

  function openEditPopup() {
    setIsShowEditPopup(true);
  }

  function removeYearOfDate(date) {
    if (new Date().getFullYear() === date.getFullYear()) {
      return moment(date).format("DD/MM");
    }
    return moment(date).format("DD/MM/YYYY");
  }

  function getStatusText(status) {
    switch (status) {
      case "todo":
        return "Đang chờ";
      case "doing":
        return "Đang thực hiện";
      default:
        return "Hoàn thành";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "todo":
        return {
          backgroundColor: "#DE4436",
        };
      case "doing":
        return {
          backgroundColor: "#FFC542",
        };
      default:
        return {
          backgroundColor: "#04D182",
        };
    }
  }

  function getProgressColor(progress) {
    if (progress < 26) {
      return "danger";
    }
    if (progress < 51) {
      return "warning";
    }
    if (progress < 76) {
      return "info";
    }
    return "success";
  }

  function getCardImage() {
    //debugger;

    for (let i = 0; i < files.length; i++) {
      if (
        files[i].fileBelongedId === props.data.taskId &&
        files[i].fileType === "image"
      ) {
        return files[i].fileUrl;
      }
    }
    return false;
  }
  function getAttachmentsCount() {
    let count = 0;
    for (let i = 0; i < files.length; i++) {
      if (files[i].fileBelongedId === props.data.taskId) {
        count++;
      }
    }
    return count;
  }

  function onEditModalClose() {
    setIsShowEditPopup(false);
    console.log("ok");
  }

  return (
    <Draggable
      isDragDisabled={isShowEditPopup}
      draggableId={props.data.taskId}
      index={props.index}
    >
      {(provided) => (
        <div
          className="card-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <TaskEditModal
            closePopup={onEditModalClose}
            isShowEditPopup={isShowEditPopup}
            data={props.data}
          />

          <div
            className="card-component"
            style={{
              animationDelay: `${props.index / 10}s`,
              borderLeft: props.data.taskThemeColor
                ? `0.3rem solid ${props.data.taskThemeColor}`
                : "1px",
            }}
            onClick={openEditPopup}
          >
            {imageCard && (
              <div className="card-image-label">
                <img alt="" src={imageCard} />
              </div>
            )}

            <div className="card-header">
              <div className="title">{props.data.taskName}</div>
            </div>
            <div className="card-labels">
              <div className="deadline">
                <div className="deadline-icon">
                  <CIcon name="cil-calendar" />
                </div>
                <div className="date">
                  {removeYearOfDate(props.data.taskDeadline)}
                </div>
              </div>
              <div
                style={getStatusColor(props.data.taskStatus)}
                className="card-status"
              >
                {getStatusText(props.data.taskStatus)}
              </div>
            </div>
            <div className="card-infor">
              <div className="infor-group">
                <div className="comment-infor">
                  <div className="comment-icon">
                    <CIcon name="cil-speech" />
                  </div>
                  <div className="comment-count">12</div>
                </div>
                {attachmentsCount > 0 && (
                  <div className="attachment-infor">
                    <div className="attachment-icon">
                      <CIcon name="cil-paperclip" />
                    </div>
                    <div className="attachment-count">{attachmentsCount}</div>
                  </div>
                )}
              </div>

              <div className="user-assign-avatar">
                <img alt="avatar" src={assignedUserImage} />
              </div>
            </div>
            <div className="card-progress">
              <CProgress
                color={getProgressColor(props.data.taskCompletedPercent)}
                animated
                value={props.data.taskCompletedPercent + 2}
              />
              <div className="progress-text">
                {props.data.taskCompletedPercent}%
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default KanbanCard;

//bỏ đi mycomment+commentlist tạm thời
