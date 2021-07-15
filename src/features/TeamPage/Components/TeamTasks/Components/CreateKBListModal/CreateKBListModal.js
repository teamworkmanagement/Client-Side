import React, { useEffect, useState } from "react";
import "./CreateKBListModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import kanbanApi from "src/api/kanbanApi";
import { useDispatch, useSelector } from "react-redux";
import { FindNextRank, genNewRank } from "src/utils/lexorank/lexorank";
import { setShowDialogModal } from "src/appSlice.js";

function CreateKBListModal(props) {
  const listKBs = useSelector((state) => state.kanban.kanbanBoard.kanbanLists);
  const [listName, setListName] = useState("");
  const dispatch = useDispatch();
  function onCreateList() {
    if (!listName) {
      const data = {
        showDialogModal: true,
        dialogTitle: "Không hợp lệ",
        dialogMessage: "Tên danh sách không được để trống",
        dialogType: 2, //error
        dialogLevel: 1,
      };
      dispatch(setShowDialogModal(data));
      return;
    }

    let pos = 0;
    if (listKBs.length === 0) pos = genNewRank();
    else pos = FindNextRank(listKBs[listKBs.length - 1].kanbanListRankInBoard);

    kanbanApi
      .addList({
        kanbanListTitle: listName,
        kanbanListBoardBelongedId: props.boardId,
        kanbanListRankInBoard: pos,
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        setListName("");
        props.onClose();
      });

    console.log("rank in :", pos);
  }

  useEffect(() => {}, []);

  const handleOnClose = () => {
    setListName("");
    props.onClose();
  };

  return (
    <CModal
      className="create-kb-list-modal"
      show={props.showAddKBList}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader closeButton>Danh sách mới</CModalHeader>
      <CModalBody className="new-list-form">
        <div className="name-label">Nhập tên danh sách:</div>
        <div className="form-content">
          <CInput
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Tên danh sách..."
          />
          <CButton onClick={onCreateList} className="add-list-btn">
            Tạo
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  );
}

export default CreateKBListModal;
