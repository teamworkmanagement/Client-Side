import React, { useEffect, useState } from "react";
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
import { setShowDialogModal } from "src/appSlice.js";
import { useDispatch } from "react-redux";

function CreateBoardModal(props) {
  const [boardName, setBoardName] = useState("");
  const dispatch = useDispatch();
  function onCreateBoard() {
    if (!boardName) {
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
    <CModal
      className="create-board-modal"
      show={props.showAddBoard}
      onClose={handleOnClose}
      size="sm"
    >
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
