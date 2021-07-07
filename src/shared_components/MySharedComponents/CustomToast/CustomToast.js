import React from "react";
import "./CustomToast.scss";
import { FaCheckCircle } from "react-icons/fa";
import { MdError, MdInfo } from "react-icons/md";
import { CgClose } from "react-icons/cg";

function CustomToast(props) {
  const { type, title, message } = props;

  function getToastIcon() {
    switch (type) {
      case "success":
        return <FaCheckCircle className="toast-icon " />;
      case "error":
        return <MdError className="toast-icon icon-error" />;
      default:
        return <MdInfo className="toast-icon icon-info" />;
    }
  }

  function getToastTitle() {
    switch (type) {
      case "success":
        return "Thành công";
      case "error":
        return "Lỗi";
      default:
        return "Thông báo";
    }
  }

  return (
    <div className={`toast-container ${type}`}>
      <div className="toast-icon-container">{getToastIcon()}</div>
      <div className="toast-content">
        <div className="toast-title">{title ? title : getToastTitle()}</div>
        <div className="toast-message">{message}</div>
      </div>
      <div className="toast-close-btn">
        <CgClose className="icon-close-toast" />
      </div>
    </div>
  );
}

export default CustomToast;
