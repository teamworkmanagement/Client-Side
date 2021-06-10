import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TaskHistoryModal.scss";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import { FiCalendar } from "react-icons/fi";
import { HiOutlineHome, HiOutlineMail } from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import userApi from "src/api/userApi";
import TaskInfoModal from "../TaskInfoModal/TaskInfoModal";

TaskHistoryModal.propTypes = {};

function TaskHistoryModal(props) {
  const taskVersions = [
    {
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
    },
    {
      taskVersionUpdatedAt: "13/01/2021 11:11SA",
      taskVersionTaskName: "Một vòng trái Khế",
      taskVersionTaskDescription: "Bài hát không lời bởi Khoa",
      taskVersionTaskPoint: 0,
      taskVersionTaskDeadline: "11/06/2021",
      taskVersionTaskStatus: "doing",
      taskVersionTaskCompletedPercent: 75,
      taskVersionUserImage:
        "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      taskVersionUserName: "Dũng Nguyễn",
    },
    {
      taskVersionUpdatedAt: "13/01/2021 11:11SA",
      taskVersionTaskName: "Một vòng trái Khế",
      taskVersionTaskDescription: "Bài hát không lời bởi Khoa",
      taskVersionTaskPoint: 0,
      taskVersionTaskDeadline: "11/06/2021",
      taskVersionTaskStatus: "doing",
      taskVersionTaskCompletedPercent: 25,
      taskVersionUserImage:
        "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
      taskVersionUserName: "Khoa N.H",
    },
    {
      taskVersionUpdatedAt: "13/01/2021 11:10SA",
      taskVersionTaskName: "Một vòng trái Khế",
      taskVersionTaskDescription: "Bài hát không lời bởi Dũng",
      taskVersionTaskPoint: 0,
      taskVersionTaskDeadline: "11/06/2021",
      taskVersionTaskStatus: "doing",
      taskVersionTaskCompletedPercent: 25,
      taskVersionUserImage:
        "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
      taskVersionUserName: "Khoa N.H",
    },
    {
      taskVersionUpdatedAt: "12/01/2021 3:14SA",
      taskVersionTaskName: "Một vòng trái đất",
      taskVersionTaskDescription: "Bài hát không lời bởi Dũng",
      taskVersionTaskPoint: 0,
      taskVersionTaskDeadline: "11/06/2021",
      taskVersionTaskStatus: "doing",
      taskVersionTaskCompletedPercent: 25,
      taskVersionUserImage:
        "https://emilus.themenate.net/img/avatars/thumb-7.jpg",
      taskVersionUserName: "John Đặng",
    },
    {
      taskVersionUpdatedAt: "11/01/2021 5:03CH",
      taskVersionTaskName: "Một vòng trái đất",
      taskVersionTaskDescription: "Bài hát không lời bởi Dũng",
      taskVersionTaskPoint: 0,
      taskVersionTaskDeadline: "11/06/2021",
      taskVersionTaskStatus: "doing",
      taskVersionTaskCompletedPercent: 0,
      taskVersionUserImage:
        "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      taskVersionUserName: "Dũng Nguyễn",
    },
    {
      taskVersionUpdatedAt: "11/01/2021 5:03CH",
      taskVersionTaskName: "Một vòng trái đất",
      taskVersionTaskDescription: "Bài hát không lời bởi Dũng",
      taskVersionTaskPoint: 0,
      taskVersionTaskDeadline: null,
      taskVersionTaskStatus: "doing",
      taskVersionTaskCompletedPercent: 0,
      taskVersionUserImage:
        "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      taskVersionUserName: "Dũng Nguyễn",
    },
    {
      taskVersionUpdatedAt: "11/01/2021 5:01CH",
      taskVersionTaskName: "Một vòng trái đất",
      taskVersionTaskDescription: "Bài hát không lời bởi Dũng",
      taskVersionTaskPoint: 0,
      taskVersionTaskDeadline: null,
      taskVersionTaskStatus: "todo",
      taskVersionTaskCompletedPercent: 0,
      taskVersionUserImage:
        "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      taskVersionUserName: "Dũng Nguyễn",
    },
    {
      taskVersionUpdatedAt: "11/01/2021 2:31CH",
      taskVersionTaskName: "Một vòng trái đất",
      taskVersionTaskDescription: "",
      taskVersionTaskPoint: 0,
      taskVersionTaskDeadline: null,
      taskVersionTaskStatus: "todo",
      taskVersionTaskCompletedPercent: 0,
      taskVersionUserImage:
        "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      taskVersionUserName: "Dũng Nguyễn",
    },
  ];

  const [taskVersion, setTaskVersion] = useState({});

  const [showTaskInfo, setShowTaskInfo] = useState(false);
  function handleOnClose() {
    if (props.onClose) {
      props.onClose();
    }
  }
  function onCloseTaskInfo() {
    setShowTaskInfo(false);
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
      taskBefore.taskVersionTaskDeadline !== taskAfter.taskVersionTaskDeadline
    ) {
      changedField = "Hạn hoàn thành";
      contentBefore = formatInfo(taskBefore.taskVersionTaskDeadline);
      contentAfter = formatInfo(taskAfter.taskVersionTaskDeadline);
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
        {taskVersions.map((taskVersion, index) => {
          return (
            <div
              className="task-version-info"
              onClick={() => showTaskInfoModal(index)}
            >
              <div className="version-header">
                <div className="avatar">
                  <img alt="" src={taskVersion.taskVersionUserImage} />
                  <div className="name">{taskVersion.taskVersionUserName}</div>
                </div>
                <div className="update-date">
                  Ngày cập nhật: {taskVersion.taskVersionUpdatedAt}
                </div>
              </div>
              {renderVersionContent(index)}
            </div>
          );
        })}
        <TaskInfoModal
          taskInfo={taskVersion}
          onClose={onCloseTaskInfo}
          show={showTaskInfo}
        />
      </CModalBody>
    </CModal>
  );
}

export default TaskHistoryModal;
