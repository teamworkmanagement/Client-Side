import React from "react";
import "./TaskListItem.scss";
import CIcon from "@coreui/icons-react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from "@coreui/react";
import { useHistory } from "react-router";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

function TaskListItem(props) {
  const adminAction = useSelector((state) => state.kanban.adminAction);
  const history = useHistory();

  // function onEditModalClose() {
  //   setIsShowEditPopup(false);

  //   history.push({
  //     pathname: history.location.pathname,
  //     search: history.location.search.substring(
  //       0,
  //       history.location.search.lastIndexOf("&")
  //     ),
  //   });
  // }

  const TODO_COLOR = "#FF5454";
  const DOING_COLOR = "#EE8434";
  const DONE_COLOR = "#2ABB7D";
  const TODO_BACKGROUNDCOLOR = "#FBEAEA";
  const DOING_BACKGROUNDCOLOR = "#FEF5EE";
  const DONE_BACKGROUNDCOLOR = "#ECF5EA";

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
  function getStatusColor(status) {
    switch (status) {
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
  //eslint-disable-next-line
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

  const openEditPoup = async () => {
    history.push({
      pathname: history.location.pathname,
      search: history.location.search + `&t=${props.data.taskId}`,
    });
  };

  // const updateTask = useSelector(
  //   (state) => state.kanban.signalrData.updateTask
  // );

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
          zIndex: props.zindex,
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
                className={` ${getProgressClass(
                  props.data.taskCompletedPercent
                )}`}
                color={getProgressColor(props.data.taskCompletedPercent)}
                style={{
                  background: getProgressBackgroundColor(
                    props.data.taskCompletedPercent
                  ),
                }}
                value={props.data.taskCompletedPercent + 2}
              />
              <div className="progress-text">
                {props.data.taskCompletedPercent}%
              </div>
            </div>
            {props.data.userId && (
              <div className="assigned-user infor">
                <img alt="" className="avatar" src={props.data.userAvatar} />
              </div>
            )}
            <div
              style={{
                color: getStatusColor(props.data.taskStatus),
                backgroundColor: getStatusBackgroundColor(
                  props.data.taskStatus
                ),
              }}
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
                {adminAction && <CDropdownItem className="last" onClick={onRemoveTask}>
                  <AiOutlineDelete className="icon-delete" />
                  Xóa
                </CDropdownItem>}
              </CDropdownMenu>
            </CDropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskListItem;
