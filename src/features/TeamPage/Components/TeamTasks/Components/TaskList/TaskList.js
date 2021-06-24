import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./TaskList.scss";
import TaskListItem from "./Components/TaskListItem/TaskListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoardDataForUI,
  setCurrentBoard,
} from "src/features/KanbanBoard/kanbanSlice";
import CIcon from "@coreui/icons-react";
import { BiTaskX } from "react-icons/bi";
import { VscSearchStop } from "react-icons/vsc";

TaskList.propTypes = {};

function TaskList(props) {
  //const tasks = useSelector((state) => state.app.tasks);

  const dispatch = useDispatch();
  const kanbanLists = useSelector(
    (state) => state.kanban.kanbanBoard.kanbanLists
  );
  const tasks = [];
  kanbanLists.map((kl) => {
    kl.taskUIKanbans.map((task) => {
      tasks.push(task);
    });
  });

  return (
    <div className="task-list-container">
      {tasks.map((item, index) => {
        return <TaskListItem isOfTeam={props.isOfTeam} ownerId={props.ownerId} index={index} key={item.taskId} data={item} />;
      })}
      {tasks.length === 0 && (
        <div className="nodata-image">
          <div className="icon-group">
            <BiTaskX className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">Chưa có công việc nào trong bảng này</div>
          <div className="create-btn">Tạo công việc mới</div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
