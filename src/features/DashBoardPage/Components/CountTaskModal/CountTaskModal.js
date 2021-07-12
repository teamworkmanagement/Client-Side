import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { BiTaskX } from "react-icons/bi";
import { VscSearchStop } from "react-icons/vsc";
import statisticsApi from "src/api/statisticsApi.js";
import CountTaskItem from "../CountTaskItem/CountTaskItem.js";
import "./CountTaskModal.scss";

function CountTaskModal({ type = 0, show, onClose }) {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    //call api get list task here
    console.log(type);
    if (type >= 0) {
      statisticsApi
        .getTasksStatusList({
          params: {
            ownerType: type === 0 || type === 1 ? "personal" : "team",
            statusType: type === 0 || type === 2 ? "todo" : "deadline",
          },
        })
        .then((res) => {
          setTaskList(res.data);
        })
        .catch((err) => {});
    }
  }, [type]);

  function handleOnClose() {
    if (onClose) {
      onClose();
    }
  }

  function getTitleByType() {
    switch (type) {
      case 0:
      case 1:
        return "Công việc cá nhân:";
      default:
        return "Công việc nhóm:";
    }
  }

  function getContentByTitle() {
    switch (type) {
      case 0:
      case 2:
        return "Đang chờ";
      default:
        return "Sắp hết hạn";
    }
  }

  return (
    <CModal
      className="count-task-modal"
      show={show}
      onClose={handleOnClose}
      size="lg"
    >
      <CModalHeader closeButton>
        <span className="title">{getTitleByType()}</span>
        <span className="content">{getContentByTitle()}</span>
      </CModalHeader>
      <CModalBody className="modal-body">
        {taskList.length === 0 && (
          <div className="nodata-image">
            <div className="icon-group">
              <BiTaskX className="icon-task" />
              <VscSearchStop className="icon-search" />
            </div>

            <div className="noti-infor">
              Chưa có công việc nào <span>{getContentByTitle()}</span>
            </div>
          </div>
        )}
        {taskList.length > 0 && (
          <div className="task-list">
            {taskList.map((task) => {
              return (
                <CountTaskItem
                  closeCountModal={handleOnClose}
                  type={type}
                  task={task}
                />
              );
            })}
          </div>
        )}
      </CModalBody>
    </CModal>
  );
}

export default CountTaskModal;
