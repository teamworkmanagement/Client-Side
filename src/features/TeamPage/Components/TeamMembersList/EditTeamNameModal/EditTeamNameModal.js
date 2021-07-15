import React, { useEffect, useState } from "react";
import "./EditTeamNameModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import { setShowDialogModal } from "src/appSlice.js";
import { useDispatch } from "react-redux";

function EditTeamNameModal(props) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setValue(props.teamName);
  }, [props.teamName]);

  function handleOnClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  const onSave = () => {
    if (!value) {
      const data = {
        showDialogModal: true,
        dialogTitle: "Không hợp lệ",
        dialogMessage: "Tên nhóm không được để trống",
        dialogType: 2, //error
        dialogLevel: 1,
      };
      dispatch(setShowDialogModal(data));
      return;
    }
    props.onSave({
      name: "teamName",
      value: value,
    });

    handleOnClose();
  };

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
        <CButton onClick={onSave} className="add-card-btn">
          Lưu
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default EditTeamNameModal;
