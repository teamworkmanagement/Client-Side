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

import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { BsClockHistory } from "react-icons/bs";
import moment from "moment";

import "./AppointmentEditModal.scss";
import { BiCameraMovie, BiTask } from "react-icons/bi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import appointmentApi from "src/api/appointmentApi";

function AppointmentEditModal({ show, onClose, onUpdate, appointment }) {
  const [type, setType] = useState(0); //0:normal,1:meeting, 2:chat, 3:task,4:news,
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!appointment) return;
    setDate(moment(new Date(appointment.date)).format("YYYY-MM-DD"));
    setTime(new Date(appointment.date));
    setName(appointment.name);
    setDescription(appointment.description ? appointment.description : "");
    setType(getTypeNumber(appointment.type));
  }, [show]);

  function handleOnClose() {
    if (onClose) {
      onClose();
    }
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
  function getTypeNumber(defaultType) {
    switch (defaultType) {
      case "normal":
        return 0;
      case "meeting":
        return 1;
      case "chat":
        return 2;
      case "task":
        return 3;
      default:
        return 4;
    }
  }

  function handleOnUpdate() {
    if (!name || name === "") {
      setShowError(true);
      setError("B???n ch??a nh???p t??n cu???c h???n!");
      return;
    }
    if (time + "" === "Invalid Date") {
      setShowError(true);
      setError("Th???i gian kh??ng h???p l???!");
      return;
    }

    const hour = time.getHours();
    const minute = time.getMinutes();
    const alarmDate = new Date(date);
    const dateWithHour = new Date(alarmDate.setHours(hour));
    const dateWithHourMinute = new Date(dateWithHour.setMinutes(minute));

    const updateObj = {
      id: appointment.id,
      name: name,
      description: description,
      date: dateWithHourMinute,
      type: getTypeText(),
    };

    appointmentApi
      .updateAppointment(updateObj)
      .then((res) => {})
      .catch((err) => {});

    handleOnClose();
  }

  function onDateChange(e) {
    setDate(e.target.value);
  }

  function getTypeToggle() {
    switch (type) {
      case 0:
        return "Th?????ng";
      case 1:
        return (
          <div className="type-item">
            <BiCameraMovie className="type-icon icon-meeting" />
            <div className="type-name">H???p nh??m</div>
          </div>
        );
      case 2:
        return (
          <div className="type-item">
            <IoChatbubblesOutline className="type-icon icon-chat" />
            <div className="type-name">Nh???n tin</div>
          </div>
        );
      case 3:
        return (
          <div className="type-item">
            <BiTask className="type-icon icon-task" />
            <div className="type-name">C??ng vi???c</div>
          </div>
        );
      case 4:
        return (
          <div className="type-item">
            <FaRegNewspaper className="type-icon icon-news" />
            <div className="type-name">B???n tin</div>
          </div>
        );
      default:
        return "Th?????ng";
    }
  }

  return (
    <CModal
      className={`appointment-create-modal `}
      show={show}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader>?????t h???n</CModalHeader>
      <CModalBody>
        <div className="name-group">
          <div className="title">
            <span>*</span> T??n:
          </div>
          <CInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="T??n cu???c h???n..."
          />
        </div>
        <div className="description-group">
          <div className="title">N???i dung:</div>
          <CTextarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="N???i dung l???ch h???n..."
          />
        </div>
        <div className="time-group">
          <div className="title">
            <span>*</span>Th???i gian:
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              ampm={false}
              helperText=""
              variant="inline"
              value={time}
              onChange={setTime}
              keyboardIcon={<BsClockHistory className="icon-time" />}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="date-group">
          <div className="title">
            <span>*</span>Ng??y:
          </div>
          <CInput
            value={date}
            type="date"
            placeholder="date"
            onChange={onDateChange}
          />
        </div>
        <div className="type-group">
          <div className="title">
            <span>*</span>Lo???i h???n:
          </div>
          <CDropdown className="appointment-type-dropdown">
            <CDropdownToggle>{getTypeToggle()}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                className={`${type === 0 ? "active" : ""}`}
                onClick={() => setType(0)}
              >
                Th?????ng
              </CDropdownItem>
              <CDropdownItem
                className={`${type === 1 ? "active" : ""}`}
                onClick={() => setType(1)}
              >
                <BiCameraMovie className="type-icon icon-meeting" />
                <div className="type-name">H???p nh??m</div>
              </CDropdownItem>
              <CDropdownItem
                className={`${type === 2 ? "active" : ""}`}
                onClick={() => setType(2)}
              >
                <IoChatbubblesOutline className="type-icon icon-chat" />
                <div className="type-name">Nh???n tin</div>
              </CDropdownItem>
              <CDropdownItem
                className={`${type === 3 ? "active" : ""}`}
                onClick={() => setType(3)}
              >
                <BiTask className="type-icon icon-task" />
                <div className="type-name">C??ng vi???c</div>
              </CDropdownItem>
              <CDropdownItem
                className={`${type === 4 ? "active" : ""}`}
                onClick={() => setType(4)}
              >
                <FaRegNewspaper className="type-icon icon-news" />
                <div className="type-name">B???n tin</div>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>

        {showError && <div className="error-label">{error}</div>}
      </CModalBody>
      <CModalFooter>
        <CButton onClick={handleOnClose} className="cancel-button">
          ????ng
        </CButton>
        <CButton
          onClick={() => {
            handleOnUpdate();
          }}
          className="ok-button"
        >
          C???p nh???t
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default AppointmentEditModal;
