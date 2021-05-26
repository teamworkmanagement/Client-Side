import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./CreateMyBoardModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import kanbanApi from "src/api/kanbanApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import MyToaster from "src/features/ToastTest/ToastTest";


CreateMyBoardModal.propTypes = {};

function CreateMyBoardModal(props) {

  const [boardName, setBoardName] = useState("");
  const user = useSelector(state => state.auth.currentUser);

  function onCreateBoard() {
    if (!boardName) {
      alert("Tên không được để trống");
      return;
    }

    kanbanApi.addBoard({
      kanbanBoardUserId: user.id,
      kanbanBoardName: boardName
    }).then(res => {
      props.onClose(res);
    }).catch(err => {
      props.onClose(null);
    }).finally(() => {
      setBoardName("");
    })

  }

  const handleOnClose = () => {
    setBoardName("");
    props.onClose(null);
  }

  return (
    <CModal show={props.showAddBoard} onClose={handleOnClose} size="sm">
      <CModalHeader closeButton>Danh sách mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div className="name-label">Nhập tên danh sách:</div>
        <CInput
          className="is-invalid"
          required
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Tên danh sách..."
        />


        <CButton onClick={onCreateBoard} className="add-card-btn">
          Tạo
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateMyBoardModal;
