import CIcon from "@coreui/icons-react";
import { CProgress } from "@coreui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import taskApi from "src/api/taskApi";
import TaskEditModal from "./Components/TaskEditModal/TaskEditModal";
import "./KanbanCard.scss";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string';
import { setTaskSelected } from "src/features/KanbanBoard/kanbanSlice";
import { useDispatch } from "react-redux";

KanbanCard.propTypes = {};

function KanbanCard(props) {
  const initIsShowEditPopup = false;

  const [isShowEditPopup, setIsShowEditPopup] = useState(initIsShowEditPopup);
  const [modalTask, setModaTask] = useState(null);

  /*const files = useSelector((state) => state.app.files);
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
  }*/


  const history = useHistory();

  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = queryString.parse(location.search);


  /*const firstTask = useSelector(state => state.kanban.taskSelected);
  useEffect(() => {
    if (firstTask)
      if (firstTask && firstTask === props.data.taskId) {
        openEditPopup(firstTask);
        dispatch(setTaskSelected(null));
        console.log('firstask: ', firstTask);
      }
  }, [firstTask])*/

  useEffect(() => {
    const queryObj = queryString.parse(history.location.search);
    if (props.data.taskId && !queryObj.t && isShowEditPopup) {
      setIsShowEditPopup(false);
    }

    if (props.data.taskId && queryObj.t && queryObj.b) {
      openEditPopup(queryObj.t);
    }
  }, [history.location.search])


  const user = useSelector(state => state.auth.currentUser);
  async function openEditPopup(taskId) {
    setModaTask(null);
    setIsShowEditPopup(true);

    const queryObj = queryString.parse(history.location.search);
    if (!queryObj.t) {
      history.push({
        pathname: history.location.pathname,
        search: history.location.search + `&t=${taskId}`,
      });
    }

    console.log(history.location.pathname);
    console.log(history.location.search);

    /*const taskModal = await taskApi.getTaskById(taskId);
    setModaTask({
      ...taskModal.data,
      filesCount: props.data.filesCount,
      commentsCount: props.data.commentsCount,
    });*/
    const pathArr = history.location.pathname.split('/');
    const queryOb = queryString.parse(history.location.search);
    let params = {};
    if (props.isOfTeam) {
      params = {
        isOfTeam: true,
        ownerId: props.ownerId,
        boardId: queryOb.b,
        taskId: queryOb.t
      }
    }
    else {
      params = {
        isOfTeam: false,
        ownerId: user.id,
        boardId: queryOb.b,
        taskId: queryOb.t
      }
    }
    taskApi.getTaskByBoard({ params }).then(res => {
      setModaTask({
        ...res.data,
        filesCount: props.data.filesCount,
        commentsCount: props.data.commentsCount,
      });
    }).catch(err => {
      console.log(history.location.search);
      history.push({
        pathname: history.location.pathname,
        search: history.location.search.substring(0, history.location.search.lastIndexOf('&')),
      });
      setIsShowEditPopup(false);
    })
  }

  function removeYearOfDate(date) {
    var dt = new Date(date);

    if (new Date().getFullYear() === dt.getFullYear()) {
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

  /*function getCardImage() {
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
  }*/

  function onEditModalClose() {
    setIsShowEditPopup(false);
    console.log("ok");

    history.push({
      pathname: history.location.pathname,
      search: history.location.search.substring(0, history.location.search.lastIndexOf('&')),
    });
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
            data={modalTask}
          />

          <div
            className="card-component"
            style={{
              animationDelay: `${props.index / 10}s`,
              borderLeft: props.data.taskThemeColor
                ? `0.3rem solid ${props.data.taskThemeColor}`
                : "1px",
            }}
            onClick={() => openEditPopup(props.data.taskId)}
          >
            {props.data.taskImageUrl && (
              <div className="card-image-label">
                <img alt="" src={props.data.taskImageUrl} />
              </div>
            )}

            <div className="card-header">
              <div className="title">{props.data.taskName}</div>
            </div>
            <div className="card-labels">
              {props.data.taskDeadline && (
                <div className="deadline">
                  <div className="deadline-icon">
                    <CIcon name="cil-calendar" />
                  </div>
                  <div className="date">
                    {removeYearOfDate(props.data.taskDeadline)}
                  </div>
                </div>
              )}
              <div
                style={getStatusColor(props.data.taskStatus)}
                className="card-status"
              >
                {getStatusText(props.data.taskStatus)}
              </div>
            </div>
            <div className="card-infor">
              <div className="infor-group">
                {props.data.commentsCount > 0 && (
                  <div className="comment-infor">
                    <div className="comment-icon">
                      <CIcon name="cil-speech" />
                    </div>
                    <div className="comment-count">
                      {props.data.commentsCount}
                    </div>
                  </div>
                )}
                {props.data.filesCount > 0 && (
                  <div className="attachment-infor">
                    <div className="attachment-icon">
                      <CIcon name="cil-paperclip" />
                    </div>
                    <div className="attachment-count">
                      {props.data.filesCount}
                    </div>
                  </div>
                )}
              </div>
              {props.data.userAvatar && (
                <div className="user-assign-avatar">
                  <img alt="avatar" src={props.data.userAvatar} />
                </div>
              )}
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
