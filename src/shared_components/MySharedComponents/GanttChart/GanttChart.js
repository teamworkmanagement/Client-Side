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
  const tasks = [];
  kanbanLists.map((kl) => {
    kl.taskUIKanbans.map((task) => {
      tasks.push(task);
    });
  });

  useEffect(() => {
    dispatch(getBoardDataForUI("board1"));
  }, []);

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
      ganttTasks.push({
        id: task.taskId,
        text: task.taskName,
        start_date: moment(task.taskStartDate).format("YYYY-MM-DD"),
        owner: "no one",
        duration: calculateDaysDistance(task.taskDeadline, task.taskStartDate),
        progress: task.taskCompletedPercent / 100,
        filesCount: task.filesCount,
        commentsCount: task.commentsCount,
      });
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
          const img = getAssignedUserImage(task.id);
          return `<img alt="" class="assigned-user-avatar" src="` + img + `"/>`;
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

    gantt.init(input.current);

    gantt.parse(data);

    gantt.attachEvent("onAfterTaskAdd", function (id, item) {
      //any custom logic here
      props.onAfterTaskAdd(id, item);
    });
  }, [data]);

  const openEditPoup = async (taskId, task) => {
    setModalTask(null);
    setIsShowEditPopup(true);
    const taskModal = await taskApi.getTaskById(taskId);
    setModalTask({
      ...taskModal.data,
      filesCount: task.filesCount,
      commentsCount: task.commentsCount,
    });
  };

  gantt.showLightbox = function (id) {
    var task = gantt.getTask(id);
    openEditPoup(id, task);
    setIsShowEditPopup(true);
  };

  gantt.hideLightbox = function () {
    setIsShowEditPopup(false);
  };

  function closeForm() {
    gantt.hideLightbox();
  }

  return (
    <div className="gantt-container">
      <div ref={input} style={{ width: "100%", height: "100%" }}></div>
      <TaskEditModal
        closePopup={closeForm}
        isShowEditPopup={isShowEditPopup}
        data={modalTask}
      />
      {/* <CModal
        show={isShowEditPopup}
        onClose={closeForm}
        size="lg"
        style={{ zIndex: 1000 }}
      >
        <CModalHeader closeButton></CModalHeader>
        <CModalBody>ok</CModalBody>
      </CModal> */}
    </div>
  );
}

export default GanttChart;
