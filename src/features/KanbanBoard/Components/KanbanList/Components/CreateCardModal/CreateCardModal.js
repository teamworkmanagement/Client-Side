import React, { useEffect, useState } from "react";
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
import { FindNextRank, genNewRank } from "src/utils/lexorank/lexorank";
import { setShowDialogModal } from "src/appSlice.js";

function CreateCardModal(props) {
  const kbLists = useSelector((state) => state.kanban.kanbanBoard.kanbanLists);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
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
  };

  function onCreateCard() {
    if (props.setShowAddCard) {
      console.log(taskName, props.kblistId);
      if (!taskName) {
        const data = {
          showDialogModal: true,
          dialogTitle: "Không hợp lệ",
          dialogMessage: "Tên công việc không được để trống",
          dialogType: 2, //error
          dialogLevel: 1,
        };
        dispatch(setShowDialogModal(data));
        return;
      }

      console.log(props.defaultList);

      if (!props.defaultList) {
        var date = new Date();
        const obj = kbLists.find((x) => x.kanbanListId === props.kblistId);
        let pos = -9999;
        if (obj.taskUIKanbans.length === 0) pos = genNewRank();
        else
          pos = FindNextRank(
            obj.taskUIKanbans[obj.taskUIKanbans.length - 1].taskRankInList
          );
        taskApi
          .addNewTask({
            taskName: taskName,
            taskCreatedAt: new Date().toISOString(),
            taskCompletedPercent: 0,
            taskBelongedId: props.kblistId,
            taskRankInList: pos,
            taskStartDate: date,
            taskStatus: "todo",
            taskDeadline: date.addDays(1),
            userActionId: user.id,
            taskPoint: 0,
          })
          .then((res) => {})
          .catch((err) => {});

        setTaskName("");
      } else {
        //eslint-disable-next-line
        var date = new Date();
        const obj = kbLists.find((x) => x.kanbanListDefault);
        if (obj) {
          let pos = -9999;
          if (obj.taskUIKanbans.length === 0) pos = genNewRank();
          else
            pos = FindNextRank(
              obj.taskUIKanbans[obj.taskUIKanbans.length - 1].taskRankInList
            );
          taskApi
            .addNewTask({
              taskName: taskName,
              taskCreatedAt: new Date().toISOString(),
              taskCompletedPercent: 0,
              taskBelongedId: obj.kanbanListId,
              taskRankInList: pos,
              taskStartDate: date,
              taskStatus: "todo",
              taskDeadline: date.addDays(1),
              userActionId: user.id,
              taskPoint: 0,
            })
            .then((res) => {})
            .catch((err) => {});
        }

        setTaskName("");
      }
      props.setShowAddCard(false);
    }
  }

  useEffect(() => {
    console.log(props.kblistId);
  }, []);

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
