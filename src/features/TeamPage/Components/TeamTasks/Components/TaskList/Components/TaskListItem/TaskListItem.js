import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TaskListItem.scss";
import CIcon from "@coreui/icons-react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import TaskEditModal from "src/features/KanbanBoard/Components/KanbanList/Components/KanbanCard/Components/TaskEditModal/TaskEditModal";
import taskApi from "src/api/taskApi";
import { useHistory } from "react-router";
import queryString from 'query-string';

TaskListItem.propTypes = {};

function TaskListItem(props) {
  //const files = useSelector((state) => state.app.files);
  //const handleTasks = useSelector((state) => state.app.handleTasks);
  //const users = useSelector((state) => state.app.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);
  const [modalTask, setModaTask] = useState(null);
  //const attachmentsCount = getAttachmentsCount();
  const daysLeftCount = countDaysLeft();
  //const assignedUserImage = getAssignedUserImage();

  function onEditModalClose() {
    setIsShowEditPopup(false);

    history.push({
      pathname: history.location.pathname,
      search: history.location.search.substring(0, history.location.search.lastIndexOf('&')),
    });
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
      case "done":
        return {
          backgroundColor: "#04D182",
        };
      default:
        return {
          backgroundColor: "#DE4436",
        };
    }
  }

  function getStatusText(status) {
    switch (status) {
      case "todo":
        return "Đang chờ";
      case "doing":
        return "Đang thực hiện";
      case "done":
        return "Hoàn thành";
      default:
        return "Đang chờ";
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

  function countDaysLeft() {
    const nowdate = new Date();
    const deadlineDate = new Date(props.data.taskDeadline);
    const spaceTime = Math.round((deadlineDate - nowdate) / 86400000);
    if (spaceTime >= 0) return "Còn " + spaceTime + " ngày";
    return "Trễ " + -spaceTime + " ngày";
  }

  const user = useSelector(state => state.auth.currentUser);

  const openEditPoup = async () => {
    setModaTask(null);
    setIsShowEditPopup(true);

    history.push({
      pathname: history.location.pathname,
      search: history.location.search + `&t=${props.data.taskId}`,
    });

    const queryObj = queryString.parse(history.location.search);

    let params = {};
    if (props.isOfTeam) {
      params = {
        isOfTeam: true,
        ownerId: props.ownerId,
        boardId: queryObj.b,
        taskId: props.data.taskId,
        userRequest: user.id,
      }
    }
    else {
      params = {
        isOfTeam: false,
        ownerId: user.id,
        boardId: queryObj.b,
        taskId: props.data.taskId,
        userRequest: user.id,
      }
    }

    taskApi.getTaskByBoard({ params }).then(res => {
      setModaTask({
        ...res.data,
        filesCount: props.data.filesCount,
        commentsCount: props.data.commentsCount,
      });
      console.log(res.data);
    }).catch(err => {
      history.push({
        pathname: history.location.pathname,
        search: history.location.search.substring(0, history.location.search.lastIndexOf('&')),
      });
      setIsShowEditPopup(false);
    })
  };


  const updateTask = useSelector(state => state.kanban.signalrData.updateTask);

  useEffect(() => {
    console.log("realtime", updateTask);
    const queryObj = queryString.parse(history.location.search);
    if (!queryObj.t) return;

    if (updateTask && updateTask.taskId === queryObj.t && updateTask.taskId === props.data.taskId) {

      console.log("realtime");

      let params = {};
      if (props.isOfTeam) {
        params = {
          isOfTeam: true,
          ownerId: props.ownerId,
          boardId: queryObj.b,
          taskId: updateTask.taskId,
          userRequest: user.id,
        }
      }
      else {
        params = {
          isOfTeam: false,
          ownerId: user.id,
          boardId: queryObj.b,
          taskId: updateTask.taskId,
          userRequest: user.id,
        }
      }
      taskApi.getTaskByBoard({ params }).then(res => {
        setModaTask(res.data);
      }).catch(err => {

      })
    }
  }, [updateTask])

  const onRemoveTask = () => {


    if (props.closePopup) {
      props.closePopup();
    }
  };
  return (
    <div>
      <div
        className="task-list-item-container"
        style={{
          animationDelay: `${props.index / 10}s`,
        }}
      >
        <div className="task-infor-container">
          <div className="task-title">
            <div className="task-name">{props.data.taskName}</div>
            <div className="task-description">{props.data.taskDescription}</div>
          </div>
          <div className="task-detail">
            <div
              className="attachment infor"
              style={{ display: props.data.filesCount === 0 ? "none" : "flex" }}
            // style={{ visibility: attachmentsCount === 0 ? "hidden" : "visible" }}
            >
              <CIcon name="cil-paperclip" className=""></CIcon>
              <div className="">{props.data.filesCount} </div>
            </div>
            <div className="comment infor">
              <CIcon name="cil-speech" className=""></CIcon>
              <div className="">{props.data.commentsCount}</div>
            </div>
            {props.data.taskDeadline && (
              <div className="deadline infor">
                <CIcon name="cil-clock" className=""></CIcon>
                {countDaysLeft()}
              </div>
            )}

            <div className="progress infor">
              <CProgress
                className="progress-bar"
                color={getProgressColor(props.data.taskCompletedPercent)}
                value={props.data.taskCompletedPercent + 2}
              />
              <div className="progress-text">
                {props.data.taskCompletedPercent}%
              </div>
            </div>
            <div className="assigned-user infor">
              <img alt="" className="avatar" src={props.data.userAvatar} />
            </div>
            <div
              style={getStatusColor(props.data.taskStatus)}
              className="infor status"
            >
              {getStatusText(props.data.taskStatus)}
            </div>
          </div>
        </div>

        <div className="task-actions">
          <div className="header-actions-dropdown">
            <CDropdown>
              <CDropdownToggle id="dropdownMenuButton" caret>
                <div className="lane-actions">
                  <CIcon name="cil-options" />
                </div>
              </CDropdownToggle>
              <CDropdownMenu
                aria-labelledby="dropdownMenuButton"
                placement="bottom-end"
              >
                <CDropdownItem className="first" onClick={openEditPoup}>
                  <CIcon name="cil-pencil" />
                  Chỉnh sửa
                </CDropdownItem>
                <CDropdownItem className="last" onClick={onRemoveTask}>
                  <CIcon name="cil-trash" className="icon-delete" />
                  Xóa
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </div>
      </div>
      <TaskEditModal
        closePopup={onEditModalClose}
        isShowEditPopup={isShowEditPopup}
        data={modalTask}
      />
    </div>
  );
}

export default TaskListItem;
