import React from "react";
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
import { useSelector } from "react-redux";
import { func } from "prop-types";
import moment from "moment";
TaskListItem.propTypes = {};

function TaskListItem(props) {

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

  return (
    <div
      className="task-list-item-container"
      style={{
        animationDelay: `${props.index / 10}s`,
      }}
    >
      <div className="task-title">
        <div className="task-name">{props.data.taskName}</div>
        <div className="task-description">{props.data.taskDescription}</div>
      </div>
      <div className="task-detail">
        <div
          className="attachment infor"
          style={{ visibility: props.data.filesCount === 0 ? "hidden" : "visible" }}
        >
          <CIcon name="cil-paperclip" className=""></CIcon>
          <div className="">{props.data.filesCount} </div>
        </div>
        <div className="comment infor">
          <CIcon name="cil-speech" className=""></CIcon>
          <div className="">3 </div>
        </div>
        <div className="deadline infor">
          <CIcon name="cil-clock" className=""></CIcon>
          {countDaysLeft()}
        </div>
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
              <CDropdownItem className="first">
                <CIcon name="cil-pencil" />
                Chỉnh sửa
              </CDropdownItem>
              <CDropdownItem className="last">
                <CIcon name="cil-trash" className="icon-delete" />
                Xóa
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </div>
    </div>
  );
}

export default TaskListItem;
