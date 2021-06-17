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
import CreateKBListModal from "src/features/TeamPage/Components/TeamTasks/Components/CreateKBListModal/CreateKBListModal";

TeamTasks.propTypes = {};

function TeamTasks(props) {
  const [showMode, setShowMode] = useState(1); //1:kanban, 2:list, 3:gantt
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

  const [notfound, setNotFound] = useState(false);
  const user = useSelector(state => state.auth.currentUser);
  const [showAddKBList, setShowAddKBList] = useState(false);
  const currentBoard = useSelector(state => state.kanban.kanbanBoard.currentBoard);

  const dispatch = useDispatch();

  const history = useHistory();
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
  }, [])

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
          <div className="lookup-input">
            <CInput
              type="text"
              name="teamName"
              placeholder="Tìm công việc..."
            />
            <BsSearch className="icon-search" />
          </div>
          {showMode === 1 && (
            <div className="add-btn add-list-btn" onClick={onCreateKanbanList}>
              <CIcon name="cil-plus" />
              Tạo danh sách
            </div>
          )}
          {(showMode === 2 || showMode === 3) && (
            <div className="add-btn add-task-btn">
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
    </>
  }

  const renderNormal = () => {
    const queryO = queryString.parse(history.location.search);
    return <>
      {renderHeader()}

      {showMode === 1 && <KanbanBoard ownerId={queryO.gr} isOfTeam={true} boardId={props.boardId} />}
      {showMode === 2 && <TaskList ownerId={queryO.gr} boardId={props.boardId} isOfTeam={true} />}
      {showMode === 3 && <GanttChart ownerId={queryO.gr} boardId={props.boardId} isOfTeam={true} />}
    </>
  }
  return (
    <div className="team-tasks-container">
      {notfound ? <NotFoundPage /> : renderNormal()}

      <CreateKBListModal
        boardId={props.boardId}
        showAddKBList={showAddKBList}
        onClose={onClose}
      />
    </div>
  );
}

export default TeamTasks;
