import CIcon from "@coreui/icons-react";
import { CTooltip } from "@coreui/react";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import moment from "moment";
import "moment/locale/vi";
import "./CountTaskItem.scss";
import { useHistory } from "react-router-dom";

moment.locale("vi");

function CountTaskItem({ type = 0, task, closeCountModal }) {
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

  const TODO_COLOR = "#FF5454";
  const DOING_COLOR = "#EE8434";
  const DONE_COLOR = "#2ABB7D";
  const TODO_BACKGROUNDCOLOR = "#FBEAEA";
  const DOING_BACKGROUNDCOLOR = "#FEF5EE";
  const DONE_BACKGROUNDCOLOR = "#ECF5EA";

  function getStatusBackgroundColor(status) {
    switch (status) {
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

  const history = useHistory();
  function handleRouting() {
    //close modal first
    /*if (closeCountModal) {
      closeCountModal();
    }*/

    history.push(task.link);
    //routing here
  }

  return (
    <div className="count-task-item">
      <div className="overview-info">
        <CIcon name="cil-task" />
        {task.taskImage && task.taskImage !== "" && (
          <img alt="" className="task-image" src={task.taskImage} />
        )}

        <div className="info-group">
          <div className="name">
            <span>{task.taskName}</span>
          </div>
          <div className="description">{task.taskDescription}</div>
          {task.taskDeadline && <div className="deadline">
            Thời hạn: <span>{moment(task.taskDeadline).format("DD/MM/YYYY")}</span>
          </div>}
        </div>
      </div>
      <div className="detail-info">
        {task.taskDeadline && <div className="deadline">
          Thời hạn: <span>{moment(task.taskDeadline).format("DD/MM/YYYY")}</span>
        </div>}
        {type !== 0 && type !== 2 && (
          <div
            className="status"
            style={{
              color: getStatusColor(task.taskStatus),
              backgroundColor: getStatusBackgroundColor(task.taskStatus),
            }}
          >
            {getStatusText(task.taskStatus)}
          </div>
        )}

        <CTooltip content="Đi đến công việc" placement="top-end">
          <div className="goto-btn" onClick={handleRouting}>
            <FaChevronRight className="arrow-icon" />
          </div>
        </CTooltip>
      </div>
    </div>
  );
}

export default CountTaskItem;
