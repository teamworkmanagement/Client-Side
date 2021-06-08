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
  const [value, setValue] = useState("");

  useEffect(()=>{
    setValue(props.teamName);
  },[props.teamName])

  function handleOnClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  const onSave = () => {
    if (!value)
      alert('error');
    props.onSave({
      name: 'teamName',
      value: value,
    });

    handleOnClose();
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
          value={value}
          placeholder="Nhập tên nhóm..."
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <CButton onClick={onSave} className="add-card-btn">Lưu</CButton>
      </CModalBody>
    </CModal>
  );
}

export default EditTeamNameModal;
