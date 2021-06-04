import React, { useEffect, useRef, useState } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css";
import "./GanttChart.scss";
import { useDispatch, useSelector } from "react-redux";
import taskApi from "src/api/taskApi";
import moment from "moment";
import TaskEditModal from "src/features/KanbanBoard/Components/KanbanList/Components/KanbanCard/Components/TaskEditModal/TaskEditModal";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Modals from "src/shared_components/views/notifications/modals/Modals";
import { getBoardDataForUI } from "src/features/KanbanBoard/kanbanSlice";
import { useHistory } from "react-router";

function GanttChart(props) {
  const input = useRef(null);
  //const tasks = useSelector((state) => state.app.tasks);
  const handleTasks = useSelector((state) => state.app.handleTasks);
  const users = useSelector((state) => state.app.users);
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);
  const [modalTask, setModalTask] = useState(null);
  const dispatch = useDispatch();
  const kanbanLists = useSelector(
    (state) => state.kanban.kanbanBoard.kanbanLists
  );

  const history = useHistory();
  const tasks = [];
  kanbanLists.map((kl) => {
    kl.taskUIKanbans.map((task) => {
      tasks.push(task);
    });
  });

  useEffect(() => {
    if (!props.boardId)
      return;
    dispatch(getBoardDataForUI(props.boardId));
  }, [props.boardId]);

  var initData = {
    data: refactorTasksForGantt(),
    //links: [{ id: 1, source: 1, target: 2, type: "0" }],
  };
  const [data, setData] = useState(initData);

  function getAssignedUserImage(taskId) {
    //find handleTask
    let userHandleId = "";
    for (let i = 0; i < handleTasks.length; i++) {
      if (handleTasks[i].handleTaskTaskId === taskId) {
        userHandleId = handleTasks[i].handleTaskUserId;
        break;
      }
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].userId === userHandleId) {
        return users[i].userImageUrl;
      }
    }
    return "";
  }

  function refactorTasksForGantt() {
    var ganttTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (!task.taskStartDate || !task.taskDeadline) {
        continue;
      }
      // console.log(moment(task.taskStartDate).format("YYYY-MM-DD"));
      // console.log();
      // console.log("======");

      if (task.taskThemeColor) {
        ganttTasks.push({
          ...task,
          id: task.taskId,
          text: task.taskName,
          start_date: moment(task.taskStartDate).format("YYYY-MM-DD"),
          end_date: moment(task.taskDeadline).format("YYYY-MM-DD"),
          owner: "no one",
          progress: task.taskCompletedPercent / 100,
          filesCount: task.filesCount,
          commentsCount: task.commentsCount,
          color: "white",
          progressColor: task.taskThemeColor,
          textColor: "#3c4b64",
        });
      } else {
        ganttTasks.push({
          ...task,
          id: task.taskId,
          text: task.taskName,
          start_date: moment(task.taskStartDate).format("YYYY-MM-DD"),
          end_date: moment(task.taskDeadline).format("YYYY-MM-DD"),
          owner: "no one",
          progress: task.taskCompletedPercent / 100,
          filesCount: task.filesCount,
          commentsCount: task.commentsCount,
          color: "white",
          textColor: "#3c4b64",
          progressColor: "#448AFF",
        });
      }
    }
    return ganttTasks;
  }

  function calculateDaysDistance(dateAfter, dateBefore) {
    //const before=new Date(dateBefore);
    //const after=new Date(dateAfter);
    //return Math.round((after - before) / 86400000);
    return 3;
  }

  useEffect(() => {
    gantt.config.scale_height = 54;
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.columns = [
      { name: "text", label: "Công việc", tree: true, width: 130 },
      {
        name: "buttons",
        label: "",
        width: 75,
        template: function (task) {
          //const img = getAssignedUserImage(task.id);
          if (!task.userAvatar) {
            return "";
          }
          return (
            `<img alt="" class="assigned-user-avatar" src="` +
            task.userAvatar +
            `"/>`
          );
        },
      },
    ];
    gantt.config.work_time = true;
    gantt.config.scales = [
      { unit: "month", step: 1, format: "%n/%Y" },
      {
        unit: "day",
        step: 1,
        format: "%j",
        css: function (date) {
          if (!gantt.isWorkTime(date)) {
            return "week-end";
          }
        },
      },
    ];

    gantt.templates.scale_cell_class = function (date) {
      if (date.getDay() == 0 || date.getDay() == 6) {
        return "weekend";
      }
    };
    gantt.templates.task_row_class = function (start, end, task) {
      return "#EBF1FE";
    };
    gantt.showLightbox = function (id) {
      var task = gantt.getTask(id);
      openEditPoup(id, task);
      setIsShowEditPopup(true);
    };

    gantt.hideLightbox = function () {
      setIsShowEditPopup(false);
    };

    gantt.init(input.current);

    gantt.parse(data);

    gantt.attachEvent("onAfterTaskAdd", function (id, item) {
      //any custom logic here
      props.onAfterTaskAdd(id, item);
    });

    gantt.attachEvent("onAfterTaskUpdate", function (id, newTaskData) {
      //lấy data của newtaskdata => update task cũ ở đây
      console.log(newTaskData);

      taskApi
        .updateTask({
          taskId: newTaskData.taskId,
          taskName: newTaskData.taskName,
          taskThemeColor: newTaskData.taskThemeColor,
          taskStatus: newTaskData.taskStatus,
          taskCompletedPercent: Number.parseInt(newTaskData.progress * 100),
          taskStartDate: newTaskData.start_date,
          taskDeadline: newTaskData.end_date,
          taskImageUrl: newTaskData.taskImageUrl,
        })
        .then((res) => { })
        .catch((err) => { });
    });
  }, [data]);

  const openEditPoup = async (taskId, task) => {
    setModalTask(null);
    setIsShowEditPopup(true);

    history.push({
      pathname: history.location.pathname,
      search: history.location.search + `&t=${taskId}`,
    });

    const taskModal = await taskApi.getTaskById(taskId);
    setModalTask({
      ...taskModal.data,
      filesCount: task.filesCount,
      commentsCount: task.commentsCount,
    });
  };

  function closeForm() {
    gantt.hideLightbox();
    console.log("close gantt");

    history.push({
      pathname: history.location.pathname,
      search: history.location.search.substring(0, history.location.search.lastIndexOf('&')),
    });
  }

  function updateGanttTask(task) {
    console.log("update gantt task", task);
    //     id: task.taskId,
    //     text: task.taskName,
    //     start_date: moment(task.taskStartDate).format("YYYY-MM-DD"),
    //     end_date: moment(task.taskDeadline).format("YYYY-MM-DD"),
    //     owner: "no one",
    //     progress: task.taskCompletedPercent / 100,
    //     filesCount: task.filesCount,
    //     commentsCount: task.commentsCount,

    //changes task's data
    console.log(moment(task.taskStartDate).format("DD-MM-YYYY"));

    //debugger;
    gantt.getTask(task.taskId).text = task.taskName;
    gantt.getTask(task.taskId).start_date = new Date(task.taskStartDate);
    gantt.getTask(task.taskId).end_date = new Date(task.taskDeadline);
    gantt.getTask(task.taskId).progress = task.taskCompletedPercent / 100;
    if (task.taskThemeColor) {
      gantt.getTask(task.taskId).progressColor = task.taskThemeColor;
    }
    gantt.updateTask(task.taskId); //renders the updated task
  }

  return (
    <div className="gantt-container">
      <div ref={input} style={{ width: "100%", height: "100%" }}></div>
      <TaskEditModal
        closePopup={closeForm}
        isShowEditPopup={isShowEditPopup}
        data={modalTask}
        updateGanttTask={updateGanttTask}
      />
    </div>
  );
}

export default GanttChart;
