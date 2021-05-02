import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./TaskList.scss";
import TaskListItem from "./Components/TaskListItem/TaskListItem";
import { useDispatch, useSelector } from "react-redux";
import { getBoardDataForUI } from "src/features/KanbanBoard/kanbanSlice";

TaskList.propTypes = {};

function TaskList(props) {
  //const tasks = useSelector((state) => state.app.tasks);

  const dispatch = useDispatch();
  const kanbanLists = useSelector((state) => state.kanban.kanbanBoard.kanbanLists);
  const tasks = [];
  kanbanLists.map(kl => {
    kl.taskUIKanbans.map(task => {
      tasks.push(task);
    })
  });

  useEffect(() => {
    dispatch(getBoardDataForUI('board1'));
  }, []);
  return (
    <div className="task-list-container">
      {tasks.map((item, index) => {
        return <TaskListItem index={index} key={item.taskId} data={item} />;
      })}
      {}
    </div>
  );
}

export default TaskList;
