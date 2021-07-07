import React from "react";
import "./NotiPopup.scss";
import { CModal, CModalBody } from "@coreui/react";
import { FaCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { FiInfo } from "react-icons/fi";

function NotiPopup(props) {
  const { popupType, popupMessage, popupButtonText } = props;

  function getIcon() {
    switch (popupType) {
      case "success":
        return <FaCheckCircle className="icon-success icon-popup" />;
      case "error":
        return <VscError className="icon-error icon-popup" />;
      default:
        return <FiInfo className="icon-info icon-popup" />;
    }
  }

  function onClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <CModal
      show={props.showNotiPopup}
      className="noti-popup-container"
      size="sm"
      onClose={onClose}
    >
      <CModalBody className="popup-body">
        <div className="popup-content">
          {getIcon()}
          <div className="popup-message">
            {popupMessage ? popupMessage : ""}
          </div>
        </div>
        <div className="popup-btn" onClick={onClose}>
          {popupButtonText ? popupButtonText : "OK"}
        </div>
      </CModalBody>
    </CModal>
  );
}

export default NotiPopup;
