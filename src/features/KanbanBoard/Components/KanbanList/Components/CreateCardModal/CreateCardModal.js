import React from "react";
import PropTypes from "prop-types";
import "./CreateCardModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";

CreateCardModal.propTypes = {};

function CreateCardModal(props) {
  function handleOnClose() {
    if (props.setShowAddCard) {
      props.setShowAddCard(false);
    }
  }
  function onCreateCard() {
    if (props.setShowAddCard) {
      props.setShowAddCard(false);
    }
  }
  return (
    <CModal show={props.showAddCard} onClose={handleOnClose} size="sm">
      <CModalHeader closeButton>Thẻ mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div className="name-label">Nhập tên:</div>
        <CInput type="text" placeholder="Tên công việc..." />
        <CButton onClick={onCreateCard} className="add-card-btn">
          Tạo
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateCardModal;
