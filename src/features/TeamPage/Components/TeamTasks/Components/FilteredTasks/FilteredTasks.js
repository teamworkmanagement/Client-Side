import React, { useEffect, useState } from "react";
import "./FilteredTasks.scss";
import { CDataTable } from "@coreui/react";
import { BiTaskX } from "react-icons/bi";
import { VscSearchStop } from "react-icons/vsc";
import AvatarComponent from "src/shared_components/MySharedComponents/AvatarComponent/AvatarComponent";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function FilteredTasks(props) {
  const fields = [
    { key: "info", label: "Công việc", _style: { width: "50%" } },
    { key: "status", label: "Trạng thái", _style: { width: "15%" } },
    { key: "assigned", label: "Thành viên đảm nhận", _style: { width: "25%" } },
  ];

  const [tasksFilter, setTasksFilter] = useState([]);
  const kanbanLists = useSelector(
    (state) => state.kanban.kanbanBoard.kanbanLists
  );
  const tasks = [];
  kanbanLists.map((kl) => {
    kl.taskUIKanbans.map((task) => {
      tasks.push(task);
    });
  });

  useEffect(() => {
    if (props.filter) {
      let mytasks = tasks;
      console.log("filter laf: ", props.filter);
      console.log("danh sach task la: ", tasks);
      if (props.filter.taskDescription) {
        mytasks = mytasks.filter((t) =>
          t.taskDescription.includes(props.filter.taskDescription)
        );
      }

      if (props.filter.taskStatus) {
        mytasks = mytasks.filter(
          (t) => t.taskStatus == props.filter.taskStatus
        );
      }

      if (props.filter.taskName) {
        mytasks = mytasks.filter((t) =>
          t.taskName.includes(props.filter.taskName)
        );
      }

      if (props.filter.userId) {
        mytasks = mytasks.filter((t) => t.userId == props.filter.userId);
      }

      setTasksFilter(mytasks);
    }
  }, [props.filter]);
  function NoItemView() {
    return (
      <div className="no-task-view-table">
        <div className="nodata-image">
          <div className="icon-group">
            <BiTaskX className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">Chưa có công việc nào trong bảng này</div>
        </div>
      </div>
    );
  }

  const TODO_COLOR = "#FF5454";
  const DOING_COLOR = "#EE8434";
  const DONE_COLOR = "#2ABB7D";
  const TODO_BACKGROUNDCOLOR = "#FBEAEA";
  const DOING_BACKGROUNDCOLOR = "#FEF5EE";
  const DONE_BACKGROUNDCOLOR = "#ECF5EA";

  function getStatusBackgroundColor(taskStatus) {
    switch (taskStatus) {
      case "todo":
        return TODO_BACKGROUNDCOLOR;
      case "doing":
        return DOING_BACKGROUNDCOLOR;
      default:
        return DONE_BACKGROUNDCOLOR;
    }
  }
  function getStatusColor(taskStatus) {
    switch (taskStatus) {
      case "todo":
        return TODO_COLOR;
      case "doing":
        return DOING_COLOR;
      default:
        return DONE_COLOR;
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

  const history = useHistory();
  const onRowClick = (e) => {
    console.log("click: ");
    console.log(history.location.pathname);
    console.log(history.location.search);
    history.push({
      pathname: history.location.pathname,
      search: history.location.search + e.link,
    });
  };
  return (
    <div className="filtered-tasks-container">
      <CDataTable
        items={tasksFilter}
        fields={fields}
        //columnFilter
        //tableFilter
        //itemsPerPageSelect
        noItemsViewSlot={NoItemView()}
        pagination
        itemsPerPage={5}
        hover
        onRowClick={onRowClick}
        style={{
          cursor: "pointer",
        }}
        //sorter
        scopedSlots={{
          info: (task) => {
            return (
              <td className="info-td">
                <div className="task-name">{task.taskName}</div>
                <div className="task-desc">{task.taskDescription}</div>
              </td>
            );
          },
          status: (task) => {
            return (
              <td className="status-td">
                <div
                  style={{
                    backgroundColor: getStatusBackgroundColor(task.taskStatus),
                    color: getStatusColor(task.taskStatus),
                  }}
                  className="card-status"
                >
                  {getStatusText(task.taskStatus)}
                </div>
              </td>
            );
          },
          assigned: (task) => {
            return (
              <td className="assigned-td">
                {!(task.userId === "" || !task.userId) && (
                  <AvatarComponent
                    userName={task.userFullName}
                    userImage={task.userAvatar}
                    userId={task.userId}
                    disable={true}
                  />
                )}
              </td>
            );
          },
        }}
      />
    </div>
  );
}

export default FilteredTasks;
