import React, { useState } from "react";
import "./TaskHistoryModal.scss";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";

import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function TaskHistoryModal(props) {
  const [showTaskInfo, setShowTaskInfo] = useState(false);
  function handleOnClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  function showTaskInfoModal(index) {
    setShowTaskInfo(true);
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

  function renderVersionContent(index) {
    const taskVersions = props.details;
    if (index === taskVersions.length - 1) {
      return <div className="version-content">Đã tạo mới công việc</div>;
    }

    var changedField = "";
    var contentBefore = "";
    var contentAfter = "";

    const taskBefore = taskVersions[index + 1];
    const taskAfter = taskVersions[index];
    if (taskBefore.taskVersionTaskName !== taskAfter.taskVersionTaskName) {
      changedField = "Tên công việc";
      contentBefore = formatInfo(taskBefore.taskVersionTaskName);
      contentAfter = formatInfo(taskAfter.taskVersionTaskName);
    }
    if (
      taskBefore.taskVersionTaskDescription !==
      taskAfter.taskVersionTaskDescription
    ) {
      changedField = "Mô tả công việc";
      contentBefore = formatInfo(taskBefore.taskVersionTaskDescription);
      contentAfter = formatInfo(taskAfter.taskVersionTaskDescription);
    }
    if (
      new Date(taskBefore.taskVersionTaskDeadline).toDateString() !==
      new Date(taskAfter.taskVersionTaskDeadline).toDateString()
    ) {
      changedField = "Hạn hoàn thành";
      contentBefore = formatInfo(
        moment(taskBefore.taskVersionTaskDeadline).format("DD/MM/YYYY")
      );
      contentAfter = formatInfo(
        moment(taskAfter.taskVersionTaskDeadline).format("DD/MM/YYYY")
      );
    }
    if (taskBefore.taskVersionTaskStatus !== taskAfter.taskVersionTaskStatus) {
      changedField = "Trạng thái công việc";
      contentBefore = formatStatus(taskBefore.taskVersionTaskStatus);
      contentAfter = formatStatus(taskAfter.taskVersionTaskStatus);
    }
    if (
      taskBefore.taskVersionTaskCompletedPercent !==
      taskAfter.taskVersionTaskCompletedPercent
    ) {
      changedField = "Phần trăm hoàn thành";
      contentBefore = formatInfo(taskBefore.taskVersionTaskCompletedPercent);
      contentAfter = formatInfo(taskAfter.taskVersionTaskCompletedPercent);
    }
    if (taskBefore.taskVersionTaskPoint !== taskAfter.taskVersionTaskPoint) {
      changedField = "Điểm công việc";
      contentBefore = formatInfo(taskBefore.taskVersionTaskPoint);
      contentAfter = formatInfo(taskAfter.taskVersionTaskPoint);
    }

    return (
      <div className="version-content">
        <div className="title">
          Đã cập nhật <strong>{changedField}</strong>
        </div>
        <div className="label">Từ:</div>
        <div className="content-before">{contentBefore}</div>

        <div className="label">Thành:</div>
        <div className="content-after">{contentAfter}</div>
      </div>
    );
  }

  return (
    <CModal
      className="task-version-list-modal"
      show={props.show}
      onClose={handleOnClose}
      size="md"
      closeOnBackdrop="false"
    >
      <CModalHeader closeButton></CModalHeader>
      <CModalBody className="modal-body">
        {props.details.map((taskVersion, index) => {
          return (
            <div
              className="task-version-info"
              onClick={() => showTaskInfoModal(index)}
            >
              <div className="version-header">
                <div className="avatar">
                  <img alt="" src={taskVersion.taskVersionActionUserImage} />
                  <div className="name">
                    {taskVersion.taskVersionActionUserName}
                  </div>
                </div>
                <div className="update-date">
                  Ngày cập nhật:{" "}
                  {moment(Date.parse(taskVersion.taskVersionUpdatedAt)).format(
                    "DD/MM/YYYY, HH:mm:ss"
                  )}
                </div>
              </div>
              {renderVersionContent(index)}
            </div>
          );
        })}
      </CModalBody>
    </CModal>
  );
}

export default TaskHistoryModal;
