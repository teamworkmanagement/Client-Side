import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TeamTasks.scss";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
import { CButton, CButtonGroup, CInput, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import GanttChart from "src/shared_components/MySharedComponents/GanttChart/GanttChart";
import TaskList from "src/features/TeamPage/Components/TeamTasks/Components/TaskList/TaskList";
import { AiOutlineLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { getBoardDataForUI, setCurrentBoard } from "src/features/KanbanBoard/kanbanSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import NotFoundPage from "src/shared_components/MySharedComponents/NotFoundPage/NotFoundPage";
import queryString from 'query-string';
import { useHistory } from "react-router";
import { setTeamLoading } from "src/appSlice";
import { BiFilterAlt } from "react-icons/bi";
import CreateKBListModal from "src/features/TeamPage/Components/TeamTasks/Components/CreateKBListModal/CreateKBListModal";
import FilteredTasks from "src/features/TeamPage/Components/TeamTasks/Components/FilteredTasks/FilteredTasks";
import taskApi from "src/api/taskApi";
import TaskEditModal from "src/features/KanbanBoard/Components/KanbanList/Components/KanbanCard/Components/TaskEditModal/TaskEditModal";
import FilterTaskModal from "src/shared_components/MySharedComponents/FilterTaskModal/FilterTaskModal";
import CreateCardModal from "src/features/KanbanBoard/Components/KanbanList/Components/CreateCardModal/CreateCardModal";

TeamTasks.propTypes = {};

function TeamTasks(props) {
  const [showMode, setShowMode] = useState(1); //1:kanban, 2:list, 3:gantt
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [applyingFilter, setApplyingFilter] = useState(false);
  const [filter, setFilter] = useState(null);
  const [modalTaskObj, setModaTaskObj] = useState(null);
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  const user = useSelector(state => state.auth.currentUser);
  const updateTask = useSelector(state => state.kanban.signalrData.updateTask);
  const assignUser = useSelector((state) => state.kanban.signalrData.reAssignUser);

  const adminAction = useSelector(state => state.kanban.adminAction);

  const [notfound, setNotFound] = useState(false);
  const [showAddKBList, setShowAddKBList] = useState(false);
  const currentBoard = useSelector(state => state.kanban.kanbanBoard.currentBoard);

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

  function closeFilterModal() {
    setShowFilterModal(false);
  }

  function applyFilter(obj) {
    setFilter(obj);
    setApplyingFilter(true);
  }
  function removeFilter() {
    setApplyingFilter(false);
  }

  useEffect(() => {
    const queryOb = queryString.parse(history.location.search);
    const params = {
      isOfTeam: true,
      ownerId: queryOb.gr,
      boardId: props.boardId
    }

    dispatch(setTeamLoading(true));
    dispatch(getBoardDataForUI({ params }))
      .then(unwrapResult)
      .then(originalPromiseResult => {
        console.log('done call api');
        dispatch(setTeamLoading(false));
      })
      .catch(err => {
        console.log(err);

        if (err.data?.ErrorCode === "404") {
          setNotFound(true);
          dispatch(setTeamLoading(false));
          return;
        }

        dispatch(setTeamLoading(false));
        dispatch(setCurrentBoard(null));
        return;

      });
  }, [showMode])

  const onClose = () => {
    setShowAddKBList(false);
  };

  const onCreateKanbanList = () => {
    console.log('zzzz');
    setShowAddKBList(true);
  }

  const renderHeader = () => {
    return !currentBoard ? null : <>
      <div className="tasks-header">
        <div className="goback-label" onClick={goBackBoards}>
          <AiOutlineLeft className="icon-goback" />
          <div className="label-text">Trở lại danh sách bảng công việc</div>
        </div>
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
            <div className="add-btn add-list-btn" onClick={onCreateKanbanList}>
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
      </div>
      {applyingFilter && <FilteredTasks filter={filter} />}
    </>
  }

  const renderNormal = () => {
    const queryO = queryString.parse(history.location.search);
    return <>
      {renderHeader()}

      {showMode === 1 && !applyingFilter && <KanbanBoard ownerId={queryO.gr} isOfTeam={true} boardId={props.boardId} />}
      {showMode === 2 && !applyingFilter && <TaskList ownerId={queryO.gr} boardId={props.boardId} isOfTeam={true} />}
      {showMode === 3 && !applyingFilter && <GanttChart ownerId={queryO.gr} boardId={props.boardId} isOfTeam={true} />}

      <CreateCardModal
        showAddCard={showAddCard}
        setShowAddCard={setShowAddCard}
        defaultList={true} />
    </>
  }

  useEffect(() => {
    console.log("realtime", updateTask);
    const queryObj = queryString.parse(history.location.search);
    if (!queryObj.t) return;

    if (updateTask && updateTask.taskId === queryObj.t) {
      console.log("realtime");

      const params = {
        isOfTeam: true,
        ownerId: queryObj.gr,
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

    const params = {
      isOfTeam: true,
      ownerId: queryObj.gr,
      boardId: queryObj.b,
      taskId: taskId,
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
        setIsShowEditPopup(false);

        if (err.Message && err.Message.includes("Not found permission")) {
          dispatch(setCurrentBoard(null));
        }
      });
  };

  function onEditModalClose() {
    setIsShowEditPopup(false);
    console.log("ok");

    history.push({
      pathname: history.location.pathname,
      search: history.location.search.substring(
        0,
        history.location.search.lastIndexOf("&")
      ),
    });
  }

  const onCreateCard = () => {
    console.log('default list');
    setShowAddCard(true);
  }

  useEffect(() => {
    const queryObj = queryString.parse(history.location.search);
    if (!queryObj.t && isShowEditPopup) {
      setIsShowEditPopup(false);
    }

    if (queryObj.t && queryObj.b && !isShowEditPopup) {
      console.log(history.location.search);
      console.log(isShowEditPopup);
      openEditPopup(queryObj.t);
      console.log("call api");
      return;
    }
  }, [history.location.search]);

  return (
    <div className="team-tasks-container">
      {notfound ? <NotFoundPage /> : renderNormal()}

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

      <TaskEditModal
        isOfTeam={true}
        closePopup={onEditModalClose}
        isShowEditPopup={isShowEditPopup}
        data={modalTaskObj}
      />
    </div>
  );
}

export default TeamTasks;
