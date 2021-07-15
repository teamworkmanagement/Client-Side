import React, { useState } from "react";
import "./CreateMyBoardModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import kanbanApi from "src/api/kanbanApi";
import { useDispatch, useSelector } from "react-redux";
import { setShowDialogModal } from "src/appSlice.js";

function CreateMyBoardModal(props) {
  const [boardName, setBoardName] = useState("");
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  function onCreateBoard() {
    if (!boardName) {
      const data = {
        showDialogModal: true,
        dialogTitle: "Không hợp lệ",
        dialogMessage: "Tên bảng công việc không được để trống",
        dialogType: 2, //error
        dialogLevel: 1,
      };
      dispatch(setShowDialogModal(data));
      return;
    }

    kanbanApi
      .addBoard({
        kanbanBoardUserId: user.id,
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

  const handleOnClose = () => {
    setBoardName("");
    props.onClose(null);
  };

  return (
    <CModal show={props.showAddBoard} onClose={handleOnClose} size="sm">
      <CModalHeader closeButton>Bảng công việc mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div className="name-label">Nhập tên bảng:</div>
        <CInput
          className=""
          required
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Tên bảng..."
        />

        <CButton onClick={onCreateBoard} className="add-card-btn">
          Tạo
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateMyBoardModal;
