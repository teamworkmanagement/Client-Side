import React from "react";
import PropTypes from "prop-types";
import "./FilteredTasks.scss";
import { CDataTable, CTooltip } from "@coreui/react";
import { BiTaskX } from "react-icons/bi";
import { VscSearchStop } from "react-icons/vsc";
import AvatarComponent from "src/shared_components/MySharedComponents/AvatarComponent/AvatarComponent";

FilteredTasks.propTypes = {};

function FilteredTasks(props) {
  const filterTasks = [
    {
      taskName: "Thu gọn header",
      taskDescription: "Thêm button thu gọn sub-header",
      taskStatus: "todo",
      taskUserId: "aaaaaaaaa",
      taskUserAvatar: "https://emilus.themenate.net/img/avatars/thumb-5.jpg",
      taskUserName: "Dũng Nguyễn",
    },
    {
      taskName: "Làm tempalte cho excel report",
      taskDescription: "Suy nghĩ layout, nội dung và xuất chart cho report",
      taskStatus: "doing",
      taskUserId: "aaaaaaaaa",
      taskUserAvatar: "https://emilus.themenate.net/img/avatars/thumb-7.jpg",
      taskUserName: "Khoa Anh",
    },
    {
      taskName: "Lỗi render table trên mobile width",
      taskDescription:
        "table render lỗi khi dùng mobile, làm footer bị overflow view",
      taskStatus: "doing",
      taskUserId: "",
      taskUserAvatar: "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
      taskUserName: "Trí Phạm",
    },
    {
      taskName: "Viết lại lexorank cho báo cáo",
      taskDescription: "Cập nhật ảnh minh họa và nội dung thuật toán lexorank",
      taskStatus: "done",
      taskUserId: "i",
      taskUserAvatar: "",
      taskUserName: "Trí Phạm",
    },
    {
      taskName: "Fix gantt chart render",
      taskDescription: "Fix bug render height cho gantt chart",
      taskStatus: "todo",
      taskUserId: "d",
      taskUserAvatar: "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
      taskUserName: "Trí Phạm",
    },
  ];

  const fields = [
    { key: "info", label: "Công việc", _style: { width: "50%" } },
    { key: "status", label: "Trạng thái", _style: { width: "15%" } },
    { key: "assigned", label: "Thành viên đảm nhận", _style: { width: "25%" } },
  ];

  function NoItemView() {
    return (
      <div className="no-task-view-table">
        <div className="nodata-image">
          <div className="icon-group">
            <BiTaskX className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">Chưa có công việc nào trong bảng này</div>
          <div className="create-btn">Tạo công việc mới</div>
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

  return (
    <div className="filtered-tasks-container">
      <CDataTable
        items={filterTasks}
        fields={fields}
        //columnFilter
        //tableFilter
        //itemsPerPageSelect
        noItemsViewSlot={NoItemView()}
        pagination
        itemsPerPage={5}
        hover
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
                {!(task.taskUserId === "" || !task.taskUserId) && (
                  <AvatarComponent
                    userName={task.taskUserName}
                    userImage={task.taskUserAvatar}
                    userId={task.taskUserId}
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
