import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./CreateCardModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import taskApi from "src/api/taskApi";
import { useDispatch, useSelector } from "react-redux";

CreateCardModal.propTypes = {};

function CreateCardModal(props) {

  const kbLists = useSelector(state => state.kanban.kanbanBoard.kanbanLists);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  function handleOnClose() {
    if (props.setShowAddCard) {
      setTaskName("");
      props.setShowAddCard(false);
    }
  }


  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

  function onCreateCard() {
    if (props.setShowAddCard) {
      console.log(taskName, props.kblistId);
      if (!taskName) alert("Tên task rỗng");

      var date = new Date();
      const obj = kbLists.find(x => x.kanbanListId === props.kblistId);
      let pos = -9999;
      if (obj.taskUIKanbans.length === 0)
        pos = 65536;
      else pos = obj.taskUIKanbans[obj.taskUIKanbans.length - 1].orderInList + 65536;
      taskApi
        .addNewTask({
          taskName: taskName,
          taskCreatedAt: new Date().toISOString(),
          taskCompletedPercent: 0,
          taskBelongedId: props.kblistId,
          taskOrderInList: pos,
          taskStartDate: date,
          taskStatus: 'todo',
          taskDeadline: date.addDays(1),
        })
        .then((res) => {

        })
        .catch((err) => { });

      setTaskName("");
      props.setShowAddCard(false);
    }
  }


  return (
    <CModal show={props.showAddCard} onClose={handleOnClose} size="sm">
      <CModalHeader closeButton>Thẻ mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div className="name-label">Nhập tên:</div>
        <CInput
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Tên công việc..."
        />
        <CButton onClick={onCreateCard} className="add-card-btn">
          Tạo
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateCardModal;
