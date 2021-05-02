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
import { useDispatch } from "react-redux";
import { addNewTask } from "src/features/KanbanBoard/kanbanSlice";

CreateCardModal.propTypes = {};

function CreateCardModal(props) {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  function handleOnClose() {
    if (props.setShowAddCard) {
      setTaskName('');
      props.setShowAddCard(false);
    }
  }
  function onCreateCard() {
    if (props.setShowAddCard) {
      console.log(taskName, props.kblistId);
      if (!taskName)
        alert('Tên task rỗng');

      taskApi.addNewTask({
        "taskName": taskName,
        "taskCreatedAt": new Date().toISOString(),
        "taskCompletedPercent": 0,
        "taskBelongedId": props.kblistId,
        "taskOrderInList": props.tasksCount,
      }).then(res => {
        const newTask = {
          "orderInList": props.tasksCount,
          "kanbanListId": props.kblistId,
          "taskId": res.data,
          "taskImageUrl": null,
          "taskName": taskName,
          "taskStartDate": null,
          "taskDescription": null,
          "taskStatus": null,
          "commentsCount": 0,
          "filesCount": 0,
          "userId": null,
          "userAvatar": null,
          "taskCompletedPercent": 0,
          "taskThemeColor": null
        };

        dispatch(addNewTask(newTask));
      }).catch(err => { })

      setTaskName('');
      props.setShowAddCard(false);
    }
  }

  useEffect(() => {
    console.log(props.kblistId);
  }, [])

  return (
    <CModal show={props.showAddCard} onClose={handleOnClose} size="sm">
      <CModalHeader closeButton>Thẻ mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div className="name-label">Nhập tên:</div>
        <CInput type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Tên công việc..." />
        <CButton onClick={onCreateCard} className="add-card-btn">
          Tạo
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateCardModal;
