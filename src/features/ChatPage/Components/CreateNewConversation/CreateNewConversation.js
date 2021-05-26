import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./CreateConversation.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";

CreateNewConversationModal.propTypes = {};

function CreateNewConversationModal(props) {

  const [taskName, setTaskName] = useState("");
  function handleOnClose() {
    if (props.setShowAddCard) {
      setTaskName("");
      props.setShowAddCard(false);
    }
  }

  function onCreateCard() {
    if (props.setShowAddCard) {
      props.setShowAddCard(false);
    }
  }

  useEffect(() => {
    
  }, []);

  return (
    <CModal show={props.showAddConversation} onClose={handleOnClose} size="sm">
      <CModalHeader closeButton>Thẻ mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div className="name-label">Nhập tên:</div>
        <CInput
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Tên công việc..."
        />
        <CButton onClick={onCreateCard} className="add-card-btn">
          Tạo
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateNewConversationModal;
