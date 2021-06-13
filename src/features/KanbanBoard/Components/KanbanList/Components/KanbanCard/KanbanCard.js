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
import queryString from "query-string";
import { setTaskSelected } from "src/features/KanbanBoard/kanbanSlice";
import { useDispatch } from "react-redux";
import { HiOutlineChat } from "react-icons/hi";

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

  const TODO_COLOR = "#FF5454";
  const DOING_COLOR = "#EE8434";
  const DONE_COLOR = "#2ABB7D";
  const TODO_BACKGROUNDCOLOR = "#FBEAEA";
  const DOING_BACKGROUNDCOLOR = "#FEF5EE";
  const DONE_BACKGROUNDCOLOR = "#ECF5EA";

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
    /*const queryObj = queryString.parse(history.location.search);
    if (props.data.taskId && !queryObj.t && isShowEditPopup) {
      setIsShowEditPopup(false);
    }

    /*if (queryObj.gr && queryObj.t && queryObj.b && !isShowEditPopup) {
      console.log(history.location.search);
      console.log(isShowEditPopup)
      openEditPopup(queryObj.t);
      console.log('call api');
    }*/
  }, [history.location.search]);

  const user = useSelector((state) => state.auth.currentUser);

  async function openEditPopup(taskId) {
    //setModaTask(null);
    //setIsShowEditPopup(true);

    const queryObj = queryString.parse(history.location.search);
    console.log(queryObj);
    if (!queryObj.t) {
      history.push({
        pathname: history.location.pathname,
        search: history.location.search + `&t=${taskId}`,
      });
    }
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

  // function getProgressColor(progress) {
  //   if (progress < 26) {
  //     return "danger";
  //   }
  //   if (progress < 51) {
  //     return "warning";
  //   }
  //   if (progress < 76) {
  //     return "info";
  //   }
  //   return "success";
  // }

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
      search: history.location.search.substring(
        0,
        history.location.search.lastIndexOf("&")
      ),
    });
  }

  function getStatusBackgroundColor() {
    switch (props.data.taskStatus) {
      case "todo":
        return TODO_BACKGROUNDCOLOR;
      case "doing":
        return DOING_BACKGROUNDCOLOR;
      default:
        return DONE_BACKGROUNDCOLOR;
    }
  }
  function getStatusColor() {
    switch (props.data.taskStatus) {
      case "todo":
        return TODO_COLOR;
      case "doing":
        return DOING_COLOR;
      default:
        return DONE_COLOR;
    }
  }
  function getProgressBackgroundColor(progress) {
    if (progress < 26) {
      return TODO_BACKGROUNDCOLOR;
    }
    if (progress < 51) {
      return "#FDF2DF";
    }
    if (progress < 76) {
      return "#D5E9F7";
    }
    return "#E4F8F3";
  }

  function getProgressColor(progress) {
    if (progress < 26) {
      return TODO_COLOR;
    }
    if (progress < 51) {
      return "#F9BC60";
    }
    if (progress < 76) {
      return "#2F93D6";
    }
    return "#28C397";
  }
  function getProgressClass(progress) {
    if (progress < 26) {
      return "progress-25";
    }
    if (progress < 51) {
      return "progress-50";
    }
    if (progress < 76) {
      return "progress-75";
    }
    return "";
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

            <div className="card-content">
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
                  style={{
                    backgroundColor: getStatusBackgroundColor(),
                    color: getStatusColor(),
                  }}
                  className="card-status"
                >
                  {getStatusText(props.data.taskStatus)}
                </div>
              </div>
              <div className="card-infor">
                <div className="infor-group">
                  {props.data.commentsCount > 0 && (
                    <div className="comment-infor">
                      <HiOutlineChat className="comment-icon" />
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
                  className={`${getProgressClass(
                    props.data.taskCompletedPercent
                  )}`}
                  color={getProgressColor(props.data.taskCompletedPercent)}
                  style={{
                    background: getProgressBackgroundColor(
                      props.data.taskCompletedPercent
                    ),
                  }}
                  //animated
                  value={props.data.taskCompletedPercent + 2}
                />
                <div className="progress-text">
                  {props.data.taskCompletedPercent}%
                </div>
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
