import React from "react";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";

import "./DeleleConfirmModal.scss";

function DeleleConfirmModal({ show, onClose }) {
  function handleOnClose(confirm) {
    if (onClose) {
      onClose(confirm);
    }
  }
  return (
    <CModal
      className={`dialog-modal }`}
      show={show}
      onClose={() => handleOnClose(false)}
      size="sm"
    >
      <CModalHeader>Xóa đặt hẹn</CModalHeader>
      <CModalBody>Bạn có chắc chắn muốn xóa lịch hẹn này</CModalBody>
      <CModalFooter>
        <CButton onClick={() => handleOnClose(false)} className="cancel-button">
          Đóng
        </CButton>
        <CButton onClick={() => handleOnClose(true)} className="ok-button">
          OK
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default DeleleConfirmModal;
