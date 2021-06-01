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

    kanbanApi
      .addBoard({
        kanbanBoardTeamId: teamId,
        kanbanBoardName: boardName,
      })
      .then((res) => {
        props.onClose(res);
      })
      .catch((err) => {
        props.onClose(null);
      })
      .finally(() => {
        setBoardName("");
      });
  }

  const { teamId } = useParams();

  useEffect(() => {}, []);

  const handleOnClose = () => {
    setBoardName("");
    props.onClose(null);
  };

  return (
    <CModal show={props.showAddBoard} onClose={handleOnClose} size="sm">
      <CModalHeader closeButton>Tạo bảng công việc mới</CModalHeader>
      <CModalBody className="new-card-form">
        <CInput
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Nhập tên bảng..."
        />
        <CButton onClick={onCreateBoard} className="add-card-btn">
          Tạo
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateBoardModal;
