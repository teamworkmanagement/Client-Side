import React from "react";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTooltip,
} from "@coreui/react";

import "./AppointmentDetailModal.scss";
import { BsAlarm } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BiCameraMovie, BiTask } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

function AppointmentDetailModal({ show, onClose, appointment }) {
  function handleOnClose() {
    if (onClose) {
      onClose();
    }
  }

  function getHour() {
    if (!appointment) {
      return "";
    }
    var res = appointment.hour + "";
    if (res.length === 1) {
      res = "0" + res;
    }
    return res;
  }

  const appointmentType = ["meeting", "chat", "task", "news", "normal"];

  function getMinute() {
    if (!appointment) {
      return "";
    }
    var res = appointment.minute + "";
    if (res.length === 1) {
      res = "0" + res;
    }
    return res;
  }

  function getType() {
    if (!appointment) return "";
    switch (appointment.type) {
      case "meeting":
        return (
          <div className="type-item">
            <BiCameraMovie className="type-icon icon-meeting" />
            <div className="type-name">Họp nhóm</div>
          </div>
        );
      case "chat":
        return (
          <div className="type-item">
            <IoChatbubblesOutline className="type-icon icon-chat" />
            <div className="type-name">Nhắn tin</div>
          </div>
        );
      case "task":
        return (
          <div className="type-item">
            <BiTask className="type-icon icon-task" />
            <div className="type-name">Công việc</div>
          </div>
        );
      case "news":
        return (
          <div className="type-item">
            <FaRegNewspaper className="type-icon icon-news" />
            <div className="type-name">Bản tin</div>
          </div>
        );
      default:
        return <div className="type-item normal">bình thường</div>;
    }
  }

  return (
    <CModal
      className={`appointment-detail-modal`}
      show={show}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader>Thông tin Lịch hẹn</CModalHeader>
      <CModalBody>
        <BsAlarm className="icon-alarm" />
        <div className="appointment-name-group">
          <span>Tên:</span>
          {appointment?.name}
        </div>
        <div className="appointment-description-group">
          <span>Nội dung:</span>
          {appointment?.description ? appointment?.description : "..."}
        </div>
        <div className="appointment-time-group">
          <span>Thời gian:</span>
          {moment(appointment?.date).format("HH:mm DD/MM/YYYY")}
        </div>
        <div className="leader-infor">
          <div className="owner-title">Tạo bởi:</div>
          <CTooltip placement="top" content={appointment?.userCreateName}>
            <div className="leader-name">
              <img
                className="leader-avatar"
                alt=""
                src={appointment?.userCreateAvatar}
              />
              {appointment?.userCreateName}
            </div>
          </CTooltip>
        </div>
        <div className="type-group">
          *Loại nhắc hẹn: <span>{getType()}</span>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton onClick={handleOnClose} className="ok-button">
          Đóng
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default AppointmentDetailModal;
