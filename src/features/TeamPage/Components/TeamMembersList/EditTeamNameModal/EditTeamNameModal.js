import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./EditTeamNameModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
  CToast,
  CToastBody,
  CToaster,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import teamApi from "src/api/teamApi";
import { useParams } from "react-router";
import MyToaster from "src/features/ToastTest/ToastTest";

EditTeamNameModal.propTypes = {};

function EditTeamNameModal(props) {
  function handleOnClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <CModal
      className="modal-edit-team-name"
      show={props.show}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader closeButton>Đổi tên nhóm</CModalHeader>
      <CModalBody className="new-card-form">
        <CInput
          type="text"
          defaultValue={props.teamName}
          placeholder="Nhập tên nhóm..."
          autoFocus
        />
        <CButton className="add-card-btn">Lưu</CButton>
      </CModalBody>
    </CModal>
  );
}

export default EditTeamNameModal;
