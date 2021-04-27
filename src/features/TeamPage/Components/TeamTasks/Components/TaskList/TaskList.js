import React from "react";
import PropTypes from "prop-types";
import "./TaskList.scss";
import TaskListItem from "./Components/TaskListItem/TaskListItem";
import { useSelector } from "react-redux";

TaskList.propTypes = {};

function TaskList(props) {
  const tasks = useSelector((state) => state.app.tasks);

  return (
    <div className="task-list-container">
      {tasks.map((item, index) => {
        return <TaskListItem index={index} key={item.taskId} data={item} />;
      })}
    </div>
  );
}

export default TaskList;
