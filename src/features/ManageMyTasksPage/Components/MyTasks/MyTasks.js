import React, { useEffect, useState } from "react";
import "./MyTasks.scss";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
import { CButton, CButtonGroup, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
//import TaskList from "./Components/TaskList/TaskList";
import GanttChart from "src/shared_components/MySharedComponents/GanttChart/GanttChart";
import CreateKBListModal from "src/features/TeamPage/Components/TeamTasks/Components/CreateKBListModal/CreateKBListModal";
import { useHistory } from "react-router";
import TaskList from "src/features/TeamPage/Components/TeamTasks/Components/TaskList/TaskList";
import { AiOutlineLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getBoardDataForUI } from "src/features/KanbanBoard/kanbanSlice";
import { setTaskEditModal, setTeamLoading } from "src/appSlice";
import FilterTaskModal from "src/shared_components/MySharedComponents/FilterTaskModal/FilterTaskModal";
import queryString from "query-string";
import { BiFilterAlt } from "react-icons/bi";
import FilteredTasks from "src/features/TeamPage/Components/TeamTasks/Components/FilteredTasks/FilteredTasks";
import CreateCardModal from "src/features/KanbanBoard/Components/KanbanList/Components/CreateCardModal/CreateCardModal";

function MyTasks(props) {
  const [showMode, setShowMode] = useState(1); //1:kanban, 2:list, 3:gantt
  const [showAddKBList, setShowAddKBList] = useState(false);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [applyingFilter, setApplyingFilter] = useState(false);
  const [filter, setFilter] = useState(null);
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);

  const [showAddCard, setShowAddCard] = useState(false);

  const user = useSelector((state) => state.auth.currentUser);
  const adminAction = useSelector((state) => state.kanban.adminAction);

  const [notfound, setNotFound] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  function switchShowMode(index) {
    //debugger;
    console.log(index);
    if (index === showMode) return;
    setShowMode(index);
  }
  function goBackBoards() {
    if (props.goBackBoards) {
      props.goBackBoards();
    }
  }

  function openFilterModal() {
    setShowFilterModal(true);
  }

  const onClose = () => {
    setShowAddKBList(false);
  };

  const onCreateKBList = () => {
    setShowAddKBList(true);
  };

  useEffect(() => {
    const params = {
      isOfTeam: false,
      ownerId: user.id,
      boardId: props.boardId,
    };
    dispatch(setTeamLoading(true));
    dispatch(getBoardDataForUI({ params }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        console.log("done call api");
        dispatch(setTeamLoading(false));
      })
      .catch((err) => {
        console.log(err);

        if (err.ErrorCode === "404") {
          setNotFound(true);
        }
        dispatch(setTeamLoading(false));
      });
  }, [showMode]);

  /*useEffect(() => {
    console.log("realtime", updateTask);
    const queryObj = queryString.parse(history.location.search);
    if (!queryObj.t) return;

    if (updateTask && updateTask.taskId === queryObj.t) {
      console.log("realtime");

      const params = {
        isOfTeam: false,
        ownerId: user.id,
        boardId: queryObj.b,
        taskId: updateTask.taskId,
        userRequest: user.id,
      };

      taskApi
        .getTaskByBoard({ params })
        .then((res) => {
          setModaTaskObj(res.data);
        })
        .catch((err) => { });
    }
  }, [updateTask]);

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
    setIsShowEditPopup(true);
    const queryObj = queryString.parse(history.location.search);
    let params = {};
    if (props.isOfTeam) {
      params = {
        isOfTeam: true,
        ownerId: props.ownerId,
        boardId: queryObj.b,
        taskId: taskId,
        userRequest: user.id,
      };
    } else {
      params = {
        isOfTeam: false,
        ownerId: user.id,
        boardId: queryObj.b,
        taskId: taskId,
        userRequest: user.id,
      };
    }

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
        setIsShowEditPopup(false);

        if (err.Message && err.Message.includes("Not found permission")) {
          dispatch(setCurrentBoard(null));
        }
      });
  };*/

  useEffect(() => {
    const queryObj = queryString.parse(history.location.search);
    if (!queryObj.t && isShowEditPopup) {
      setIsShowEditPopup(false);
    }

    if (queryObj.t && queryObj.b && !isShowEditPopup) {
      /*console.log(history.location.search);
      console.log(isShowEditPopup);
      openEditPopup(queryObj.t);
      console.log("call api");
      return;*/

      dispatch(
        setTaskEditModal({
          show: true,
          ownerId: user.id,
          isOfTeam: false,
        })
      );
    }
  }, [history.location.search]);

  function applyFilter(obj) {
    setFilter(obj);
    setApplyingFilter(true);
  }

  function closeFilterModal() {
    setShowFilterModal(false);
  }

  function removeFilter() {
    setApplyingFilter(false);
  }

  /*function onEditModalClose() {
    setIsShowEditPopup(false);
    console.log("ok");

    history.push({
      pathname: history.location.pathname,
      search: history.location.search.substring(
        0,
        history.location.search.lastIndexOf("&")
      ),
    });
  }*/

  const onCreateCard = () => {
    console.log("default list");
    setShowAddCard(true);
  };

  return (
    <div className="my-tasks-container">
      <div className="tasks-header">
        <div className="goback-label" onClick={goBackBoards}>
          <AiOutlineLeft className="icon-goback" />
          <div className="label-text">Trở lại danh sách bảng công việc</div>
        </div>
        {!notfound && (
          <div className="other-actions">
            <div
              className={`filter-btn ${applyingFilter ? "" : "no-filtering"}`}
            >
              <div className="filter-content" onClick={openFilterModal}>
                <BiFilterAlt className="icon-filter" />
                Lọc công việc
              </div>
              <CTooltip content="Xóa bộ lọc" placement="top">
                <div
                  className="remove-filter-btn"
                  onClick={() => setApplyingFilter(false)}
                >
                  <CIcon name="cil-x" />
                </div>
              </CTooltip>
            </div>
            {showMode === 1 && adminAction && (
              <div onClick={onCreateKBList} className="add-btn add-list-btn">
                <CIcon name="cil-plus" />
                Tạo danh sách
              </div>
            )}
            {(showMode === 2 || showMode === 3) && adminAction && (
              <div className="add-btn add-task-btn" onClick={onCreateCard}>
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
        )}
      </div>

      {applyingFilter && <FilteredTasks filter={filter} />}
      <FilterTaskModal
        show={showFilterModal}
        applyFilter={applyFilter}
        onClose={closeFilterModal}
        removeFilter={removeFilter}
        applyingFilter={applyingFilter}
      />

      <CreateKBListModal
        boardId={props.boardId}
        showAddKBList={showAddKBList}
        onClose={onClose}
      />

      {/*<TaskEditModal
        isOfTeam={false}
        closePopup={onEditModalClose}
        isShowEditPopup={isShowEditPopup}
        data={modalTaskObj}
          />*/}

      <CreateCardModal
        showAddCard={showAddCard}
        setShowAddCard={setShowAddCard}
        defaultList={true}
      />

      {showMode === 1 && !applyingFilter && (
        <KanbanBoard isOfTeam={false} boardId={props.boardId} />
      )}
      {showMode === 2 && !applyingFilter && (
        <TaskList isOfTeam={false} boardId={props.boardId} />
      )}
      {showMode === 3 && !applyingFilter && (
        <GanttChart isOfTeam={false} boardId={props.boardId} />
      )}
    </div>
  );
}

export default MyTasks;
