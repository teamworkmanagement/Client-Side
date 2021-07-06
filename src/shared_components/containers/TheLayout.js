import React, { useEffect, useState } from "react";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
import ForgotPassword from "../views/pages/forgotpassword/ForgotPassword";
import MyLogin from "../views/pages/login/MyLogin/MyLogin";
import ChatListSideBar from "./ChatListSideBar";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import TeamTabsSideBar from "./TeamTabsSideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingOptionsSidebar from "./SettingOptionsSidebar";

import CustomToast from "../MySharedComponents/CustomToast/CustomToast";
import { useDispatch, useSelector } from "react-redux";
import UserInfoModal from "../MySharedComponents/UserInfoModal/UserInfoModal";
import TaskEditModal from "src/features/KanbanBoard/Components/KanbanList/Components/KanbanCard/Components/TaskEditModal/TaskEditModal";
import { useHistory } from "react-router-dom";

import queryString from 'query-string';
import taskApi from "src/api/taskApi";
import { setCurrentBoard } from "src/features/KanbanBoard/kanbanSlice";
import { setTaskEditModal, setViewHistory } from "src/appSlice";
import TaskHistoryModal from "../MySharedComponents/TaskHistoryModal/TaskHistoryModal";

const TheLayout = () => {
  const newNoti = useSelector((state) => state.app.newNotfication);
  const moveTask = useSelector((state) => state.kanban.signalrData.moveTask);
  useEffect(() => {
    if (!newNoti) return;

    toast(
      <CustomToast
        type="success"
        title="Thông báo"
        message="Bạn có thông báo mới"
      />
    );
    //alert(`${newNoti.notificationGroup} --------- ${newNoti.notificationContent}`);
  }, [newNoti]);


  const [modalTaskObj, setModaTaskObj] = useState(null);
  const [details, setDetails] = useState([]);

  const userModal = useSelector(state => state.app.userModal);
  const taskEditModal = useSelector(state => state.app.taskEditModal);
  const viewHistory = useSelector(state => state.app.viewHistory);
  const user = useSelector(state => state.auth.currentUser);
  const updateTask = useSelector(state => state.kanban.signalrData.updateTask);
  const assignUser = useSelector((state) => state.kanban.signalrData.reAssignUser);


  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("realtime", updateTask);
    const queryObj = queryString.parse(history.location.search);
    if (!queryObj.t) return;

    if ((updateTask && updateTask.taskId === queryObj.t) || (moveTask && moveTask.taskId === queryObj.t)) {
      console.log("realtime");

      const params = {
        isOfTeam: taskEditModal.isOfTeam,
        ownerId: taskEditModal.ownerId,
        boardId: queryObj.b,
        taskId: updateTask?.taskId ? updateTask?.taskId : moveTask.taskId,
        userRequest: user.id,
      };

      taskApi
        .getTaskByBoard({ params })
        .then((res) => {
          setModaTaskObj(res.data);
        })
        .catch((err) => { });
    }
  }, [updateTask, moveTask]);

  useEffect(() => {
    console.log(assignUser);
    const queryObj = queryString.parse(history.location.search);

    if (!queryObj.t) return;

    if (!modalTaskObj) return;

    if (assignUser && assignUser.taskId === queryObj.t) {
      if (assignUser.userId === modalTaskObj.userId) return;
      else {
        setModaTaskObj({
          ...modalTaskObj,
          userId: assignUser.userId === "" ? null : assignUser.userId,
          userAvatar:
            assignUser.userAvatar === "" ? null : assignUser.userAvatar,
          userName:
            assignUser.userFullName === "" ? null : assignUser.userFullName,
        });
      }
    }
  }, [assignUser]);

  const openEditPopup = (taskId) => {
    const queryObj = queryString.parse(history.location.search);
    const params = {
      isOfTeam: taskEditModal.isOfTeam,
      ownerId: taskEditModal.ownerId,
      boardId: queryObj.b,
      taskId: queryObj.t,
      userRequest: user.id,
    };

    taskApi
      .getTaskByBoard({ params })
      .then((res) => {
        setModaTaskObj(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        history.push({
          pathname: history.location.pathname,
          search: history.location.search.substring(
            0,
            history.location.search.lastIndexOf("&")
          ),
        });

        if (err.Message && err.Message.includes("Not found permission")) {
          dispatch(setCurrentBoard(null));
        }

        dispatch(setTaskEditModal(null));
      });
  };

  useEffect(() => {
    if (!taskEditModal)
      return;
    const queryObj = queryString.parse(history.location.search);
    if (!queryObj.t && taskEditModal.show) {
      dispatch(setTaskEditModal(null));
    }

    if (queryObj.t && queryObj.b) {
      console.log(history.location.search);

      openEditPopup(queryObj.t);
      console.log("call api");
      return;
    }
  }, [taskEditModal]);


  const onEditModalClose = () => {
    console.log('on close');
    setModaTaskObj(null);
    dispatch(setTaskEditModal(null));
    history.push({
      pathname: history.location.pathname,
      search: history.location.search.substring(
        0,
        history.location.search.lastIndexOf("&")
      ),
    });
  }


  useEffect(() => {
    if (viewHistory) {
      taskApi
        .getVersion(viewHistory.taskId)
        .then((res) => {
          console.log(res.data);
          setDetails(res.data);
        })
        .catch((err) => { });
    }
  }, [viewHistory])

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <TeamTabsSideBar />
      <ChatListSideBar />
      <SettingOptionsSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        progressClassName="toastProgress"
      />

      {/* <ForgotPassword /> */}

      <TaskEditModal
        isOfTeam={taskEditModal?.isOfTeam}
        closePopup={onEditModalClose}
        isShowEditPopup={taskEditModal?.show}
        data={modalTaskObj}
      />

      <UserInfoModal
        userId={userModal.userId}
        show={userModal?.show} />

      <TaskHistoryModal
        details={details}
        show={viewHistory?.show}
        onClose={() => dispatch(setViewHistory(null))}
      />
    </div>
  );
};

export default TheLayout;
