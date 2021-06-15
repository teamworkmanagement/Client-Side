import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./CreateKBListModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import kanbanApi from "src/api/kanbanApi";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FindNextRank, genNewRank } from "src/utils/lexorank/lexorank";

CreateKBListModal.propTypes = {};

function CreateKBListModal(props) {
  const dispatch = useDispatch();
  const listKBs = useSelector((state) => state.kanban.kanbanBoard.kanbanLists);
  const [listName, setListName] = useState("");

  function onCreateBoard() {
    if (!listName) {
      alert("Tên không được để trống");
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
          <CButton onClick={onCreateBoard} className="add-list-btn">
            Tạo
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  );
}

export default CreateKBListModal;
