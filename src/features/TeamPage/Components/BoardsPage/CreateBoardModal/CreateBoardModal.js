import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./CreateBoardModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import kanbanApi from "src/api/kanbanApi";
import { useParams } from "react-router";


CreateBoardModal.propTypes = {};

function CreateBoardModal(props) {

  const [boardName, setBoardName] = useState("");

  function onCreateBoard() {
    if (!boardName) {
      alert("Tên không được để trống");
      return;
    }

    kanbanApi.addBoard({
      kanbanBoardBelongedId: teamId,
      kanbanBoardName: boardName
    }).then(res => {
      props.onClose(res);
    }).catch(err => {
      props.onClose(null);
    }).finally(() => {
      setBoardName("");
    })

  }

  const { teamId } = useParams();

  useEffect(() => {

  }, []);

  const handleOnClose = () => {
    setBoardName("");
  }

  return (
    <CModal show={props.showAddBoard} onClose={handleOnClose} size="sm">
      <CModalHeader closeButton>Danh sách mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div className="name-label">Nhập tên danh sách:</div>
        <CInput
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

export default CreateBoardModal;
