import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TeamTasks.scss";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
import { CButton, CButtonGroup, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import TaskList from "./Components/TaskList/TaskList";

TeamTasks.propTypes = {};

function TeamTasks(props) {
  const [showMode, setShowMode] = useState(1); //1:kanban, 2:list, 3:gantt
  function switchShowMode(index) {
    //debugger;
    console.log(index);
    if (index === showMode) return;
    setShowMode(index);
  }
  return (
    <div className="tasks-team-container">
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
      {showMode === 1 && <KanbanBoard />}
      {showMode === 2 && <TaskList />}
    </div>
  );
}

export default TeamTasks;
