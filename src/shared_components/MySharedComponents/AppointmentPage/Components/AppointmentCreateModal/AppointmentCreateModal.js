import React, { useEffect, useState } from "react";
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTextarea,
} from "@coreui/react";

import "./AppointmentCreateModal.scss";
import { BiCameraMovie, BiTask } from "react-icons/bi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import { useSelector } from "react-redux";
import appointmentApi from "src/api/appointmentApi";

function AppointmentCreateModal({ show, onClose, onCreate, teamId }) {
  const [type, setType] = useState(0); //0:normal,1:meeting, 2:chat, 3:task,4:news,
  const [date, setDate] = useState(null);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [appointReq, setAppointReq] = useState({});

  function handleOnClose() {
    if (onClose) {
      setAppointReq({
        ...appointReq,
        name: "",
        description: "",
      });
      setDate("");
      setType(0);
      onClose();
    }
  }

  function handleOnCreate() {
    if (!appointReq.name || appointReq.name === "") {
      setShowError(true);
      setError("Bạn chưa nhập tên cuộc hẹn!");
      return;
    }
    if (!appointReq.date || appointReq.date === "") {
      setShowError(true);
      setError("Bạn chưa đặt thời gian cuộc hẹn!");
      return;
    }

    const newAppointment = {
      ...appointReq,
      type: getTypeText(),
      teamId: teamId,
      date: new Date(appointReq.date),
    };

    appointmentApi
      .createAppointment(newAppointment)
      .then((res) => {})
      .catch((res) => {})
      .finally(() => {
        handleOnClose();
      });
  }

  function formatDate(date) {
    //convert từ YYYY-MM-DD sang DD/MM/YYYY
    const dateParts = date.split("-");
    return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
  }

  function getTypeText() {
    switch (type) {
      case 0:
        return "normal";
      case 1:
        return "meeting";
      case 2:
        return "chat";
      case 3:
        return "task";
      default:
        return "news";
    }
  }

  function onDateChange(e) {
    setAppointReq({
      ...appointReq,
      date: e.target.value,
    });
  }

  function getTypeToggle() {
    switch (type) {
      case 0:
        return "Thường";
      case 1:
        return (
          <div className="type-item">
            <BiCameraMovie className="type-icon icon-meeting" />
            <div className="type-name">Họp nhóm</div>
          </div>
        );
      case 2:
        return (
          <div className="type-item">
            <IoChatbubblesOutline className="type-icon icon-chat" />
            <div className="type-name">Nhắn tin</div>
          </div>
        );
      case 3:
        return (
          <div className="type-item">
            <BiTask className="type-icon icon-task" />
            <div className="type-name">Công việc</div>
          </div>
        );
      case 4:
        return (
          <div className="type-item">
            <FaRegNewspaper className="type-icon icon-news" />
            <div className="type-name">Bản tin</div>
          </div>
        );
      default:
        return "Thường";
    }
  }

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setAppointReq({
      ...appointReq,
      [name]: value,
    });
  };
  return (
    <CModal
      className={`appointment-create-modal `}
      show={show}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader>Đặt hẹn</CModalHeader>
      <CModalBody>
        <div className="name-group">
          <div className="title">
            <span>*</span> Tên:
          </div>
          <CInput
            type="text"
            name="name"
            value={appointReq.name}
            onChange={(e) => onChangeText(e)}
            placeholder="Tên cuộc hẹn..."
          />
        </div>
        <div className="description-group">
          <div className="title">Nội dung:</div>
          <CTextarea
            type="text"
            name="description"
            value={appointReq.description}
            onChange={(e) => onChangeText(e)}
            placeholder="Nội dung lịch hẹn..."
          />
        </div>

        <div className="date-group">
          <div className="title">
            <span>*</span>Thời gian:
          </div>
          <CInput
            value={date}
            type="datetime-local"
            //defaultValue={moment("2021-07-18").format("YYYY-MM-DD")}
            placeholder="date"
            onChange={onDateChange}
          />
        </div>
        <div className="type-group">
          <div className="title">
            <span>*</span>Loại hẹn:
          </div>
          <CDropdown className="appointment-type-dropdown">
            <CDropdownToggle>{getTypeToggle()}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                className={`${type === 0 ? "active" : ""}`}
                onClick={() => setType(0)}
              >
                Thường
              </CDropdownItem>
              <CDropdownItem
                className={`${type === 1 ? "active" : ""}`}
                onClick={() => setType(1)}
              >
                <BiCameraMovie className="type-icon icon-meeting" />
                <div className="type-name">Họp nhóm</div>
              </CDropdownItem>
              <CDropdownItem
                className={`${type === 2 ? "active" : ""}`}
                onClick={() => setType(2)}
              >
                <IoChatbubblesOutline className="type-icon icon-chat" />
                <div className="type-name">Nhắn tin</div>
              </CDropdownItem>
              <CDropdownItem
                className={`${type === 3 ? "active" : ""}`}
                onClick={() => setType(3)}
              >
                <BiTask className="type-icon icon-task" />
                <div className="type-name">Công việc</div>
              </CDropdownItem>
              <CDropdownItem
                className={`${type === 4 ? "active" : ""}`}
                onClick={() => setType(4)}
              >
                <FaRegNewspaper className="type-icon icon-news" />
                <div className="type-name">Bản tin</div>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>

        {showError && <div className="error-label">{error}</div>}
      </CModalBody>
      <CModalFooter>
        <CButton onClick={handleOnClose} className="cancel-button">
          Đóng
        </CButton>
        <CButton
          onClick={() => {
            handleOnCreate();
          }}
          className="ok-button"
        >
          Tạo lịch hẹn
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default AppointmentCreateModal;
