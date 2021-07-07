import React from "react";
import "./TaskList.scss";
import TaskListItem from "./Components/TaskListItem/TaskListItem";
import { useSelector } from "react-redux";

import { BiTaskX } from "react-icons/bi";
import { VscSearchStop } from "react-icons/vsc";

function TaskList(props) {
  //const tasks = useSelector((state) => state.app.tasks);

  const kanbanLists = useSelector(
    (state) => state.kanban.kanbanBoard.kanbanLists
  );
  const tasks = [];
  //eslint-disable-next-line
  kanbanLists.map((kl) => {
    //eslint-disable-next-line
    kl.taskUIKanbans.map((task) => {
      tasks.push(task);
    });
  });

  return (
    <div className="task-list-container">
      {tasks.map((item, index) => {
        return (
          <TaskListItem
            isOfTeam={props.isOfTeam}
            ownerId={props.ownerId}
            index={index}
            zindex={tasks.length - index}
            key={item.taskId}
            data={item}
          />
        );
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
