import React from "react";
import "./TaskInfoModal.scss";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";

function TaskInfoModal(props) {
  const task = {
    taskVersionUpdatedAt: "13/01/2021 11:11SA",
    taskVersionTaskName: "Một vòng trái Khế",
    taskVersionTaskDescription: "Bài hát không lời bởi Khoa",
    taskVersionTaskPoint: 0,
    taskVersionTaskDeadline: "31/05/2021",
    taskVersionTaskStatus: "doing",
    taskVersionTaskCompletedPercent: 75,
    taskVersionUserImage:
      "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
    taskVersionUserName: "Khoa N.H",
  };

  function handleOnClose() {
    if (props.onClose) {
      props.onClose();
    }
  }
  function formatInfo(str) {
    if (!str || str === "") {
      return "...";
    }

    return str;
  }
  function formatStatus(status) {
    if (!status || status === "") {
      return "...";
    }
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
    <CModal
      className="task-info-modal"
      show={props.show}
      onClose={handleOnClose}
      size="sm"
      closeOnBackdrop="false"
    >
      <CModalHeader closeButton></CModalHeader>
      {/* <CModalBody className="modal-body">
        <CDataTable
          items={taskData}
          fields={fields}
          itemsPerPage={5}
          pagination
          // scopedSlots={{
          //   status: (item) => (
          //     <td>
          //       <CBadge color={getBadge(item.status)}>
          //         {item.status}
          //       </CBadge>
          //     </td>
          //   ),
          // }}
        />
      </CModalBody> */}
      <CModalBody className="modal-body">
        <div className="info-row">
          <strong>Tên:</strong>
          {formatInfo(task.taskVersionTaskName)}
        </div>
        <div className="info-row">
          <strong>Mô tả:</strong>
          {formatInfo(task.taskVersionTaskDescription)}
        </div>
        <div className="info-row">
          <strong>Hạn hoàn thành:</strong>
          {formatInfo(task.taskVersionTaskDeadline)}
        </div>
        <div className="info-row">
          <strong>Trạng thái:</strong>
          {formatStatus(task.taskVersionTaskStatus)}
        </div>
        <div className="info-row">
          <strong>Phần trăm hoàn thành:</strong>
          {formatInfo(task.taskVersionTaskCompletedPercent)}
        </div>
        <div className="info-row">
          <strong>Điểm:</strong>
          {task.taskVersionTaskPoint}
        </div>
      </CModalBody>
    </CModal>
  );
}

export default TaskInfoModal;
