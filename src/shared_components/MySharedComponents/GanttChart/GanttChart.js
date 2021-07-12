import React, { useEffect, useRef, useState } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css";
import "./GanttChart.scss";
import { useDispatch, useSelector } from "react-redux";
import taskApi from "src/api/taskApi";
import moment from "moment";
import { BiTaskX } from "react-icons/bi";
import { VscSearchStop } from "react-icons/vsc";
import { useHistory } from "react-router";
import "moment/locale/vi";
import { setNullSignalRData } from "src/features/KanbanBoard/kanbanSlice";

moment.locale("vi");

function GanttChart(props) {
  const input = useRef(null);
  const history = useHistory();
  //eslint-disable-next-line
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);
  const kanbanLists = useSelector(
    (state) => state.kanban.kanbanBoard.kanbanLists
  );
  const tasks = [];
  const dispatch = useDispatch();
  //eslint-disable-next-line
  kanbanLists.map((kl) => {
    //eslint-disable-next-line
    kl.taskUIKanbans.map((task) => {
      tasks.push(task);
    });
  });

  //eslint-disable-next-line
  const [data, setData] = useState({
    data: refactorTasksForGantt(),
  });
  var dataBackup = refactorTasksForGantt();
  var durationDate = 0; //số ngày của task, tính từ start_date
  var isMoving = false; //flag cho trạng thái moving

  const addNewTask = useSelector(
    (state) => state.kanban.signalrData.addNewTask
  );
  const removeTask = useSelector(
    (state) => state.kanban.signalrData.removeTask
  );
  const removeList = useSelector(
    (state) => state.kanban.signalrData.removeList
  );
  const updateTask = useSelector(
    (state) => state.kanban.signalrData.updateTask
  );
  const assignUser = useSelector(
    (state) => state.kanban.signalrData.reAssignUser
  );

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
          color: task.taskThemeColor,
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
          color: "#3D77F4",
          textColor: "#3c4b64",
          progressColor: "#3D77F4",
        });
      }
    }
    return ganttTasks;
  }

  useEffect(() => {
    ganttFunc();
  }, [])

  /*useEffect(() => {
    const newData = refactorTasksForGantt();
    setData({
      data: newData,
    });
  }, [addNewTask, removeTask, removeList]);*/

  /*useEffect(() => {
    if (data) {
      console.log('task là: ', data);
      gantt.parse({ data: data });
    }
  }, [data])*/

  const user = useSelector((state) => state.auth.currentUser);
  function compareEqualStrWithDate(str, date) {
    const strParts = str.split("-");
    if (Number.parseInt(date.getDate()) !== Number.parseInt(strParts[2])) {
      return false;
    }
    if (Number.parseInt(date.getMonth() + 1) !== Number.parseInt(strParts[1])) {
      return false;
    }
    if (Number.parseInt(date.getFullYear()) !== Number.parseInt(strParts[0])) {
      return false;
    }
    return true;
  }
  function checkDiffData(id, newTaskData) {
    //debugger;
    for (let i = 0; i < dataBackup.length; i++) {
      if (dataBackup[i].taskId === id) {
        if (
          Math.round(dataBackup[i].progress * 100) !==
          Math.round(newTaskData.progress * 100)
        ) {
          dataBackup[i].progress = Math.round(newTaskData.progress * 100) / 100;
          return true;
        }
        if (
          !compareEqualStrWithDate(
            dataBackup[i].start_date,
            newTaskData.start_date
          )
        ) {
          const start_date = newTaskData.start_date;
          dataBackup[i].start_date =
            start_date.getFullYear() +
            "-" +
            (start_date.getMonth() + 1) +
            "-" +
            start_date.getDate();
          return true;
        }
        if (
          !compareEqualStrWithDate(dataBackup[i].end_date, newTaskData.end_date)
        ) {
          const end_date = newTaskData.end_date;
          dataBackup[i].end_date =
            end_date.getFullYear() +
            "-" +
            (end_date.getMonth() + 1) +
            "-" +
            end_date.getDate();
          return true;
        }
        break;
      }
    }
    return false;
  }

  function getDurationDateFromTaskId(id) {
    var durationDate = 0;
    for (let i = 0; i < dataBackup.length; i++) {
      if (dataBackup[i].taskId === id) {
        const startDate = new Date(dataBackup[i].start_date);
        const endDate = new Date(dataBackup[i].end_date);
        durationDate =
          Math.round(((endDate - startDate) / 86400000) * 1000) / 1000;

        break;
      }
    }
    return durationDate;
  }

  function getEndDate(start_date) {
    var end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + durationDate);
    return end_date;
  }

  var myTemplate = function myFunc(task) {
    const showIcon = task.taskThemeColor ? "" : "not-show";
    return `<div class="column-content">
      <div class="icon-container">
      <svg class="${showIcon}"
      style="color:${task.taskThemeColor ? task.taskThemeColor : "red"};"
       stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></svg>
      </div>
      <div class="column-name">
        ${task.text}
      </div>
    </div>`;
  };

  const ganttFunc = () => {
    const myData = { data: refactorTasksForGantt() };
    console.log("zzzzzzz: ", myData);
    gantt.clearAll();
    gantt.config.scale_height = 54;
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.row_height = 55;
    gantt.config.columns = [
      {
        name: "text",
        label: "Công việc",
        //tree: true,
        width: 130,
        template: myTemplate,
      },
      {
        name: "buttons",
        label: "",
        width: 75,
        template: function (task) {
          //const img = getAssignedUserImage(task.id);

          return `<b class="percent-in-column">
             ${task.taskCompletedPercent}%
           </b>`;
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
      if (date.getDay() === 0 || date.getDay() === 6) {
        return "weekend";
      }
    };
    gantt.templates.task_row_class = function (start, end, task) {
      return "#EBF1FE";
    };
    gantt.templates.task_text = function (start, end, task) {
      if (!task.userId) {
        return `<div class="task-content">
       
        <div class="task-name">
          ${task.text}
        </div>
      </div>`;
      }
      return `<div class="task-content">
        <div class="image-container">
          <img alt="" src="${task.userAvatar}"/>
        </div>
        <div class="task-name">
          ${task.text}
        </div>
      </div>`;
    };
    // gantt.templates.leftside_text = function (start, end, task) {
    //   if (!task.userId) return "";
    //   return `<img
    //       alt=""
    //       class="image-leftside"
    //       src="${task.userAvatar}"
    //     />`;
    // };
    gantt.showLightbox = function (id) {
      var task = gantt.getTask(id);
      openEditPoup(id, task);
      setIsShowEditPopup(true);
    };

    gantt.hideLightbox = function () {
      setIsShowEditPopup(false);
    };

    gantt.init(input.current);

    gantt.parse(myData);
    //console.log(data);

    gantt.attachEvent("onAfterTaskAdd", function (id, item) {
      //any custom logic here
      props.onAfterTaskAdd(id, item);
    });

    gantt.attachEvent("onBeforeTaskDrag", function (id, mode, e) {
      var modes = gantt.config.drag_mode;
      if (isMoving) {
        return false;
      }
      switch (mode) {
        case modes.move:
          console.log("moving");
          isMoving = true;
          durationDate = getDurationDateFromTaskId(id);
          break;
        default:
          break;
      }
      //return true;
      return false;
    });

    gantt.attachEvent("onAfterTaskUpdate", function (id, newTaskData) {
      //lấy data của newtaskdata => update task cũ ở đây
      //debugger;
      console.log("zzzzz là : " + id);
      //console.log(newTaskData.realtime);
      if (newTaskData.realtime) {
        newTaskData.realtime = false;
        return;
      }
      if (isMoving) {
        debugger;
        newTaskData.end_date = getEndDate(newTaskData.start_date);
        gantt.getTask(id).end_date = newTaskData.end_date;
        isMoving = false;
      }
      //debugger;
      const isDiffData = checkDiffData(id, newTaskData);
      if (!isDiffData) {
        return;
      }

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
          userActionId: user.id,
        })
        .then((res) => { })
        .catch((err) => { });
    });
  }

  useEffect(() => {
    if (!addNewTask)
      return;
    const list = kanbanLists.find(kl => kl.kanbanListId === addNewTask.kanbanListId);
    if (list) {
      ganttFunc();
    }
    dispatch(setNullSignalRData('addNewTask'));
  }, [addNewTask])

  useEffect(() => {
    if (!removeTask)
      return;
    const list = kanbanLists.find(kl => kl.kanbanListId === removeTask.kanbanListId);
    if (list) {
      ganttFunc();
    }
    dispatch(setNullSignalRData('removeTask'));
  }, [removeTask])

  useEffect(() => {
    if (!removeList)
      return;
    const list = kanbanLists.find(kl => kl.kanbanListId === removeList.kanbanListId);
    if (list) {
      ganttFunc();
    }
    dispatch(setNullSignalRData('removeList'));
  }, [removeList])

  useEffect(() => {
    if (!updateTask)
      return;
    const list = kanbanLists.find(kl => kl.kanbanListId === updateTask.kanbanListId);
    if (list) {
      ganttFunc();
    }
    dispatch(setNullSignalRData('updateTask'));
  }, [updateTask])

  useEffect(() => {
    if (!assignUser)
      return;
    const list = kanbanLists.find(kl => kl.kanbanListId === assignUser.kanbanListId);
    if (list) {
      ganttFunc();
    }
    dispatch(setNullSignalRData('reAssignUser'));
  }, [assignUser])

  const openEditPoup = async (taskId, task) => {
    history.push({
      pathname: history.location.pathname,
      search: history.location.search + `&t=${taskId}`,
    });
  };

  /*function updateGanttTask(task) {
    console.log("update gantt task", task);

    //changes task's data
    //debugger;
    gantt.getTask(task.taskId).text = task.taskName;
    gantt.getTask(task.taskId).start_date = new Date(task.taskStartDate);
    gantt.getTask(task.taskId).end_date = new Date(task.taskDeadline);
    gantt.getTask(task.taskId).progress = task.taskCompletedPercent / 100;
    gantt.getTask(task.taskId).realtime = true;
    if (task.taskThemeColor) {
      gantt.getTask(task.taskId).progressColor = task.taskThemeColor;
      gantt.getTask(task.taskId).color = task.taskThemeColor;
    }
    gantt.updateTask(task.taskId); //renders the updated task
  }

  useEffect(() => {
    console.log(assignUser);

    if (assignUser && tasks.find(t => t.taskId == assignUser.taskId)) {
      gantt.getTask(assignUser.taskId).userId = assignUser.userId;
      gantt.getTask(assignUser.taskId).userAvatar = assignUser.userAvatar;
      gantt.getTask(assignUser.taskId).userFullName = assignUser.userFullName;

      gantt.updateTask(assignUser.taskId); //renders the updated task
    }

  }, [assignUser]);


  useEffect(() => {
    console.log("realtime", updateTask);
    //const queryObj = queryString.parse(history.location.search);
    //if (!queryObj.t) return;

    if (updateTask) {
      const taskClone = { ...updateTask };
      taskClone.realtime = true;
      updateGanttTask(taskClone);
    }
  }, [updateTask]);*/

  return (
    <div className="gantt-container">
      {tasks.length > 0 && (
        <div ref={input} style={{ width: "100%", height: "100%" }}></div>
      )}

      {tasks.length === 0 && (
        <div className="nodata-image">
          <div className="icon-group">
            <BiTaskX className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">Chưa có công việc nào trong bảng này</div>
          {/*<div className="create-btn">Tạo công việc mới</div>*/}
        </div>
      )}
    </div>
  );
}

export default GanttChart;
