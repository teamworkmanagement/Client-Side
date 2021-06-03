import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./MyTasks.scss";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
import { CButton, CButtonGroup, CInput, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
//import TaskList from "./Components/TaskList/TaskList";
import GanttChart from "src/shared_components/MySharedComponents/GanttChart/GanttChart";
import CreateKBListModal from "src/features/TeamPage/Components/TeamTasks/Components/CreateKBListModal/CreateKBListModal";
import { useHistory } from "react-router";
import TaskList from "src/features/TeamPage/Components/TeamTasks/Components/TaskList/TaskList";
import { AiOutlineLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

MyTasks.propTypes = {};

function MyTasks(props) {
  const [showMode, setShowMode] = useState(1); //1:kanban, 2:list, 3:gantt
  const [showAddKBList, setShowAddKBList] = useState(false);
  const history = useHistory();

  function switchShowMode(index) {
    //debugger;
    console.log(index);
    if (index === showMode) return;
    setShowMode(index);
  }
  function goBackBoards() {
    if (props.goBackBoards) {
      props.goBackBoards();
    }
  }

  const onClose = () => {
    setShowAddKBList(false);
  };

  const onCreateKBList = () => {
    setShowAddKBList(true);
  };

  return (
    <div className="my-tasks-container">
      <div className="tasks-header">
        <div className="goback-label" onClick={goBackBoards}>
          <AiOutlineLeft className="icon-goback" />
          <div className="label-text">Trở lại danh sách bảng công việc</div>
        </div>
        <div className="other-actions">
          <div className="lookup-input">
            <CInput
              type="text"
              name="teamName"
              placeholder="Tìm công việc..."
            />
            <BsSearch className="icon-search" />
          </div>
          {showMode === 1 && (
            <div onClick={onCreateKBList} className="add-btn add-list-btn">
              <CIcon name="cil-plus" />
              Tạo danh sách
            </div>
          )}
          {(showMode === 2 || showMode === 3) && (
            <div className="add-btn add-task-btn">
              <CIcon name="cil-plus" />
              Tạo công việc
            </div>
          )}

          <CButtonGroup className="show-mode">
            <CTooltip placement="top" content="Thẻ kanban">
              <CButton
                className={`first mode-btn ${showMode === 1 && "active"}`}
                color="secondary"
                onClick={() => switchShowMode(1)}
                type="button"
              >
                <CIcon name="cil-columns" />
              </CButton>
            </CTooltip>
            <CTooltip placement="top" content="Danh sách">
              <CButton
                className={` mode-btn ${showMode === 2 && "active"}`}
                color="secondary"
                onClick={() => switchShowMode(2)}
              >
                <CIcon name="cil-list" />
              </CButton>
            </CTooltip>

            <CTooltip placement="top" content="Biểu đồ Gantt">
              <CButton
                className={`last mode-btn ${showMode === 3 && "active"}`}
                color="secondary"
                onClick={() => switchShowMode(3)}
              >
                <CIcon name="cil-chart" />
              </CButton>
            </CTooltip>
          </CButtonGroup>
        </div>
      </div>

      <CreateKBListModal
        boardId={props.boardId}
        showAddKBList={showAddKBList}
        onClose={onClose}
      />

      {showMode === 1 && <KanbanBoard boardId={props.boardId} />}
      {showMode === 2 && <TaskList boardId={props.boardId} />}
      {showMode === 3 && <GanttChart boardId={props.boardId} />}
    </div>
  );
}

export default MyTasks;
