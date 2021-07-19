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

import "./AppointmentEditModal.scss";
import { BiCameraMovie, BiTask } from "react-icons/bi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import { useSelector } from "react-redux";

function AppointmentEditModal({ show, onClose, onUpdate, appointment }) {
  const user = useSelector((state) => state.auth.currentUser);
  const [type, setType] = useState(0); //0:normal,1:meeting, 2:chat, 3:task,4:news,
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  function handleOnClose() {
    if (onClose) {
      onClose();
    }
  }

  function getDefaultDate() {
    var res = "";
    const dateParts = appointment.date.split("/");
    res = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0] + "T";
    const hour =
      appointment.hour >= 10 ? appointment.hour + "" : "0" + appointment.hour;
    const minute =
      appointment.minute >= 10
        ? appointment.minute + ""
        : "0" + appointment.minute;
    res += hour + ":" + minute;
    return res;
  }

  useEffect(() => {
    if (!appointment) return;
    setName(appointment.name);
    setDescription(appointment?.description);

    setDate(getDefaultDate());

    switch (appointment.type) {
      case "normal":
        setType(0);
        break;
      case "meeting":
        setType(1);
        break;
      case "chat":
        setType(2);
        break;
      case "task":
        setType(3);
        break;
      default:
        setType(4);
    }
  }, [show]);

  function handleOnUpdate() {
    if (!name || name === "") {
      setShowError(true);
      setError("Bạn chưa nhập tên cuộc hẹn!");
      return;
    }
    if (!date || date === "") {
      setShowError(true);
      setError("Bạn chưa đặt thời gian cuộc hẹn!");
      return;
    }

    //date ban đầu có format "2021-07-14T00:47"
    const dateParts = date.split("T");
    const dateParts1 = dateParts[0]; //chuỗi ngày
    const dateParts2 = dateParts[1]; //chuỗi thời gian
    const timeParts = dateParts2.split(":");
    const updatedAppointment = {
      name: name,
      description: description ? description : "",
      date: formatDate(dateParts1),
      hour: timeParts[0],
      minute: timeParts[1],
      type: getTypeText(),
      userCreateName: user.fullName,
      userCreateAvatar: user.userAvatar,
    };

    onUpdate(updatedAppointment);
    handleOnClose();
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
    console.log(e.target.value);
    setDate(e.target.value);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên cuộc hẹn..."
          />
        </div>
        <div className="description-group">
          <div className="title">Nội dung:</div>
          <CTextarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            handleOnUpdate();
          }}
          className="ok-button"
        >
          Cập nhật
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default AppointmentEditModal;
