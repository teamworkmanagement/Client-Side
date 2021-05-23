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


CreateKBListModal.propTypes = {};

function CreateKBListModal(props) {

  const dispatch = useDispatch();
  const listKBs = useSelector(state => state.kanban.kanbanBoard.kanbanLists);
  const [listName, setListName] = useState("");

  function onCreateBoard() {
    if (!listName) {
      alert("Tên không được để trống");
      return;
    }

    let pos = 0;
    if (listKBs.length === 0)
      pos = pos + 65536;
    else
      pos = listKBs[listKBs.length - 1].kanbanListOrderInBoard + 65536;

    kanbanApi.addList({
      kanbanListTitle: listName,
      kanbanListBoardBelongedId: props.boardId,
      kanbanListOrderInBoard: pos
    }).then(res => {

    }).catch(err => {

    }).finally(() => {
      setListName("");
      props.onClose();
    })
  }

  useEffect(() => {

  }, []);

  const handleOnClose = () => {
    setListName("");
    props.onClose();
  }

  return (
    <CModal show={props.showAddKBList} onClose={handleOnClose} size="md">
      <CModalHeader closeButton>Danh sách mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div className="name-label">Nhập tên danh sách:</div>
        <CInput
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Tên danh sách..."
        />
        <CButton onClick={onCreateBoard} className="add-card-btn">
          Tạo
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateKBListModal;
