import CIcon from "@coreui/icons-react";
import { CProgress } from "@coreui/react";
import moment from "moment";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./KanbanCard.scss";
import { useHistory } from "react-router";
import queryString from "query-string";
import { HiOutlineChat, HiOutlinePaperClip } from "react-icons/hi";

function KanbanCard(props) {
  const initIsShowEditPopup = false;

  //eslint-disable-next-line
  const [isShowEditPopup, setIsShowEditPopup] = useState(initIsShowEditPopup);

  const TODO_COLOR = "#FF5454";
  const DOING_COLOR = "#EE8434";
  const DONE_COLOR = "#2ABB7D";
  const TODO_BACKGROUNDCOLOR = "#FBEAEA";
  const DOING_BACKGROUNDCOLOR = "#FEF5EE";
  const DONE_BACKGROUNDCOLOR = "#ECF5EA";

  const history = useHistory();

  async function openEditPopup(taskId) {
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
                      <HiOutlinePaperClip className="file-icon" />
                      <div className="attachment-count">
                        {props.data.filesCount}
                      </div>
                    </div>
                  )}
                </div>
                {props.data.userId && (
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
