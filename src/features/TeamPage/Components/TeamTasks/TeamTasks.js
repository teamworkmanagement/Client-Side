import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TeamTasks.scss";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
import { CButton, CButtonGroup, CInput, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import TaskList from "./Components/TaskList/TaskList";
import GanttChart from "src/shared_components/MySharedComponents/GanttChart/GanttChart";
import CreateKBListModal from "./Components/CreateKBListModal/CreateKBListModal";
import { AiOutlineLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

TeamTasks.propTypes = {};

function TeamTasks(props) {
  const [showMode, setShowMode] = useState(1); //1:kanban, 2:list, 3:gantt
  const [showAddKBList, setShowAddKBList] = useState(false);

  function switchShowMode(index) {
    //debugger;
    console.log(index);
    if (index === showMode) return;
    setShowMode(index);
  }
  function goBackListBoards() {
    if (props.goBackListBoards) {
      props.goBackListBoards();
    }
  }

  const addKBList = () => {
    console.log("clicked");
    setShowAddKBList(true);
  };

  const onClose = () => {
    setShowAddKBList(false);
  };

  return (
    <div className="tasks-team-container">
      <div className="tasks-header">
        <div className="goback-label" onClick={goBackListBoards}>
          <AiOutlineLeft className="icon-goback" />
          <div className="label-text">Trở lại danh sách công việc</div>
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
            <div className="add-btn add-list-btn" onClick={addKBList}>
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
                <CIcon name="cil-chart" className="rotate-90" />
              </CButton>
            </CTooltip>
          </CButtonGroup>
        </div>
      </div>

      {showMode === 1 && <KanbanBoard boardId={props.boardId} />}
      {showMode === 2 && <TaskList boardId={props.boardId} />}
      {showMode === 3 && <GanttChart boardId={props.boardId} />}

      <CreateKBListModal
        boardId={props.boardId}
        showAddKBList={showAddKBList}
        onClose={onClose}
      />
    </div>
  );
}

export default TeamTasks;
