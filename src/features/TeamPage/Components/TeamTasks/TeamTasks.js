import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TeamTasks.scss";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
import { CButton, CButtonGroup, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import TaskList from "./Components/TaskList/TaskList";
import GanttChart from "src/shared_components/MySharedComponents/GanttChart/GanttChart";

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
      <div className="tasks-header">
        {showMode === 1 && (
          <div className="add-btn add-list-btn">
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

      {showMode === 1 && <KanbanBoard />}
      {showMode === 2 && <TaskList />}
      {showMode === 3 && <GanttChart />}
    </div>
  );
}

export default TeamTasks;
