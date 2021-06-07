import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./EditTeamDescriptionModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
  CTextarea,
  CToast,
  CToastBody,
  CToaster,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import teamApi from "src/api/teamApi";
import { useParams } from "react-router";
import MyToaster from "src/features/ToastTest/ToastTest";

EditTeamDescriptionModal.propTypes = {};

function EditTeamDescriptionModal(props) {
  function handleOnClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <CModal
      className="modal-edit-team-description"
      show={props.show}
      onClose={handleOnClose}
      size="md"
    >
      <CModalHeader closeButton>Mô tả nhóm</CModalHeader>
      <CModalBody className="new-card-form">
        <CTextarea
          type="text"
          defaultValue={props.teamDescription}
          placeholder="Nhập mô tả nhóm..."
          autoFocus
        />
        <CButton className="add-card-btn">Lưu</CButton>
      </CModalBody>
    </CModal>
  );
}

export default EditTeamDescriptionModal;
