import React, { useEffect, useState } from "react";
import "./EditTeamDescriptionModal.scss";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CTextarea,
} from "@coreui/react";

function EditTeamDescriptionModal(props) {
  const [value, setValue] = useState("");

  function handleOnClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  useEffect(() => {
    setValue(props.teamDescription);
  }, [props.teamDescription]);

  const onSave = () => {
    if (!value) alert("error");
    props.onSave({
      name: "teamDescription",
      value: value,
    });

    handleOnClose();
  };

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
          value={value}
          placeholder="Nhập mô tả nhóm..."
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <CButton className="add-card-btn" onClick={onSave}>
          Lưu
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default EditTeamDescriptionModal;
