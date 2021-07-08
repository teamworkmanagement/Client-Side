import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import React, { useEffect } from "react";
import { BiTaskX } from "react-icons/bi";
import { VscSearchStop } from "react-icons/vsc";
import CountTaskItem from "../CountTaskItem/CountTaskItem.js";
import "./CountTaskModal.scss";

function CountTaskModal({ type = 0, show, onClose }) {
  const taskList = [
    {
      taskName: "Lorem ipsum dolor sit amet",
      taskStatus: "todo",
      taskDeadline: "21/12/2021",
      taskDescription:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames",
      taskImage:
        "https://diginet.com.vn/wp-content/uploads/2020/10/tai-sao-task-management-lai-quan-trong-voi-doanh-nghiep-1.png",
    },
    {
      taskName: "Vestibulum felis justo",
      taskStatus: "doing",
      taskDeadline: "21/12/2021",
      taskDescription:
        "Sed hendrerit convallis elit eu pellentesque. Morbi ultricies ante a mi ullamcorper, sit amet vestibulum tellus placerat.",
      taskImage: "",
    },
    {
      taskName: "Donec tempus, dui a posuere ornare",
      taskStatus: "doing",
      taskDeadline: "21/12/2021",
      taskDescription: "",
      taskImage: "",
    },
    {
      taskName: "Morbi euismod iaculis dui sit amet luctus.",
      taskStatus: "done",
      taskDeadline: "21/12/2021",
      taskDescription:
        "Phasellus laoreet porttitor mi, at ullamcorper nulla ornare vitae. Donec sit amet consectetur urna.",
      taskImage:
        "https://diginet.com.vn/wp-content/uploads/2020/09/phan-mem-giao-viec-task-management-hien-dai-linh-hoat-2.jpg",
    },
    {
      taskName: "Maecenas varius aliquet magna",
      taskStatus: "todo",
      taskDeadline: "21/12/2021",
      taskDescription:
        "Donec posuere tortor eu ante lobortis consectetur. In hac habitasse platea dictumst.",
      taskImage:
        "https://isaac.vn/wp-content/uploads/2020/04/quan-ly-bang-excel-1024x769.jpg",
    },
  ];

  useEffect(() => {
    //call api get list task here
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
        <div className="nodata-image">
          <div className="icon-group">
            <BiTaskX className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">
            Chưa có công việc nào <span>{getContentByTitle()}</span>
          </div>
          {/*<div className="create-btn">Tạo công việc mới</div>*/}
        </div>
        {false && taskList.length > 0 && (
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
