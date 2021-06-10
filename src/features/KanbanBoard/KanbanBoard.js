import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./KanbanBoard.scss";
import { useDispatch, useSelector } from "react-redux";
import KanbanList from "./Components/KanbanList/KanbanList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  setKanbanBoardData,
  setKanbanLists,
  setTeamLoading,
} from "src/appSlice";
import { CButton, CButtonGroup } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import taskApi from "src/api/taskApi";
import kanbanApi from "src/api/kanbanApi";
import CardLoading from "./Components/KanbanList/Components/KanbanCard/Components/CardLoading/CardLoading";
import { RiTableLine } from "react-icons/ri";
import { VscSearchStop } from "react-icons/vsc";
import { useHistory } from "react-router";
import queryString from 'query-string';
import { unwrapResult } from "@reduxjs/toolkit";
import TaskEditModal from "./Components/KanbanList/Components/KanbanCard/Components/TaskEditModal/TaskEditModal";
import { FindNextRank, FindPreRank, FindRankBetween, genNewRank } from "src/utils/lexorank/lexorank";
import { connection } from "src/utils/signalr/kanbanService";
import { dragListLocal, dragTaskLocal } from "./kanbanSlice";

KanbanBoard.propTypes = {};

function KanbanBoard(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.app.teamLoading);

  const kanbanLists = useSelector(
    (state) => state.kanban.kanbanBoard.kanbanLists
  );

  const fixedList = useSelector((state) =>
    state.kanban.kanbanBoard.kanbanLists.find(
      (x) => x.kanbanListOrderInBoard === -999999
    )
  );

  //const fixedList = kanbanLists.find(x => x.kanbanListOrderInBoard === -999999);
  //kanbanLists = kanbanLists.filter(x => x.kanbanListOrderInBoard !== -999999)

  const currentBoard = useSelector(
    (state) => state.kanban.kanbanBoard.currentBoard
  );

  function onDragEnd(result) {
    //call api update pos (task/list) here
    console.log(connection.connectionId);

    const { destination, source, type, draggableId } = result;

    console.log(result);
    //return;
    if (!destination) return;

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    let pos = -9999;
    const cloneKbLists = [...kanbanLists];
    if (type === "task") {
      const listTasksSource = cloneKbLists.find(
        (x) => x.kanbanListId === source.droppableId
      ).taskUIKanbans;
      const listTaskDestination = cloneKbLists.find(
        (x) => x.kanbanListId === destination.droppableId
      ).taskUIKanbans;
      //cungf list
      if (destination.droppableId === source.droppableId) {
        if (destination.index === 0) {
          pos = FindPreRank(listTasksSource[0].taskRankInList);
        } else {
          if (destination.index === listTasksSource.length - 1) {
            pos = FindNextRank(listTasksSource[listTasksSource.length - 1].taskRankInList);
          } else {
            if (source.index < destination.index)
              pos = FindRankBetween(listTasksSource[destination.index].taskRankInList, listTasksSource[destination.index + 1].taskRankInList);

            else
              pos = FindRankBetween(listTasksSource[destination.index - 1].taskRankInList, listTasksSource[destination.index].taskRankInList);
          }
        }
      }
      //khacs list
      else {
        if (destination.index === 0) {
          if (listTaskDestination.length === 0) {
            pos = genNewRank();
          }
          else {
            pos = FindPreRank(listTaskDestination[0].taskRankInList);
          }
        }
        else {
          if (destination.index === listTaskDestination.length) {
            pos = FindNextRank(listTaskDestination[listTaskDestination.length - 1].taskRankInList)

          } else {
            pos = FindRankBetween(listTaskDestination[destination.index - 1].taskRankInList,
              listTaskDestination[destination.index].taskRankInList);
          }
        }
      }

      dispatch(dragTaskLocal({
        taskId: listTasksSource[source.index].taskId,
        position: pos,
        oldList: source.droppableId,
        newList: destination.droppableId,
      }));

      taskApi
        .dragTask({
          taskId: listTasksSource[source.index].taskId,
          position: pos,
          oldList: source.droppableId,
          newList: destination.droppableId,
          boardId: currentBoard,
          connectionId: connection.connectionId,
        })
        .then((res) => { })
        .catch((err) => { });
    } else {
      if (destination.index === 0) {
        pos = FindPreRank(cloneKbLists[0].kanbanListRankInBoard);
      } else {
        if (destination.index === cloneKbLists.length - 1) {
          pos = FindNextRank(cloneKbLists[cloneKbLists.length - 1].kanbanListRankInBoard)
        } else {
          if (source.index < destination.index)
            pos = FindRankBetween(cloneKbLists[destination.index].kanbanListRankInBoard,
              cloneKbLists[destination.index + 1].kanbanListRankInBoard);
          else
            pos = FindRankBetween(cloneKbLists[destination.index - 1].kanbanListRankInBoard,
              cloneKbLists[destination.index].kanbanListRankInBoard);
        }
      }

      dispatch(dragListLocal(
        {
          position: pos,
          kanbanListId: draggableId,
        }
      ));

      kanbanApi
        .swapList({
          kanbanBoardId: currentBoard,
          position: pos,
          kanbanListId: draggableId,
          connectionId: connection.connectionId,
        })
        .then((res) => { })
        .catch((err) => { });
    }
  }

  const history = useHistory();
  const [notask, setNoTask] = useState(false);

  const [boardId, setBoardId] = useState(null);
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);
  const [modalTaskObj, setModaTaskObj] = useState(null);


  const tasks = [];
  kanbanLists.map((kl) => {
    kl.taskUIKanbans.map((task) => {
      tasks.push(task);
    });
  });

  const updateTask = useSelector(state => state.kanban.signalrData.updateTask);
  const user = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    console.log("realtime", updateTask);
    const queryObj = queryString.parse(history.location.search);
    if (!queryObj.t) return;

    if (updateTask && updateTask.taskId === queryObj.t) {

      console.log("realtime");

      let params = {};
      if (props.isOfTeam) {
        params = {
          isOfTeam: true,
          ownerId: props.ownerId,
          boardId: queryObj.b,
          taskId: updateTask.taskId
        }
      }
      else {
        params = {
          isOfTeam: false,
          ownerId: user.id,
          boardId: queryObj.b,
          taskId: updateTask.taskId
        }
      }
      taskApi.getTaskByBoard({ params }).then(res => {
        setModaTaskObj(res.data);
      }).catch(err => {

      })
    }
  }, [updateTask])

  const assignUser = useSelector(state => state.kanban.signalrData.reAssignUser);

  /*useEffect(() => {
    const queryObj = queryString.parse(history.location.search);

    if (!queryObj.t) return;

    if (assignUser && assignUser.taskId === queryObj.t) {

      let params = {};
      if (props.isOfTeam) {
        params = {
          isOfTeam: true,
          ownerId: props.ownerId,
          boardId: queryObj.b,
          taskId: assignUser.taskId
        }
      }
      else {
        params = {
          isOfTeam: false,
          ownerId: user.id,
          boardId: queryObj.b,
          taskId: assignUser.taskId
        }
      }

      taskApi.getTaskByBoard({ params }).then(res => {
        setModaTaskObj(res.data);
      }).catch(err => {

      })
    }
  }, [assignUser])*/

  useEffect(() => {
    console.log(assignUser);
    const queryObj = queryString.parse(history.location.search);

    if (!queryObj.t) return;

    if (assignUser && assignUser.taskId === queryObj.t) {
      if (assignUser.userId === modalTaskObj.userId)
        return;
      else {
        setModaTaskObj({
          ...modalTaskObj,
          userId: assignUser.userId === "" ? null : assignUser.userId,
          userAvatar: assignUser.userAvatar === "" ? null : assignUser.userAvatar,
        });
      }
    }
  }, [assignUser])

  useEffect(() => {
    const queryObj = queryString.parse(history.location.search);
    if (!queryObj.t && isShowEditPopup) {
      setIsShowEditPopup(false);
    }

    if (queryObj.t && queryObj.b && !isShowEditPopup) {
      console.log(history.location.search);
      console.log(isShowEditPopup)
      openEditPopup(queryObj.t);
      console.log('call api');
      return;
    }

  }, [history.location.search])



  const openEditPopup = (taskId) => {
    setIsShowEditPopup(true);
    const queryObj = queryString.parse(history.location.search);
    let params = {};
    if (props.isOfTeam) {
      params = {
        isOfTeam: true,
        ownerId: props.ownerId,
        boardId: queryObj.b,
        taskId: taskId
      }
    }
    else {
      params = {
        isOfTeam: false,
        ownerId: user.id,
        boardId: queryObj.b,
        taskId: taskId
      }
    }

    taskApi.getTaskByBoard({ params }).then(res => {
      setModaTaskObj(res.data);
      console.log(res.data);
    }).catch(err => {
      history.push({
        pathname: history.location.pathname,
        search: history.location.search.substring(0, history.location.search.lastIndexOf('&')),
      });
      setIsShowEditPopup(false);
    })
  }





  useEffect(() => {
    if (!boardId)
      return;
    try {
      dispatch(setTeamLoading(true));

      const pathname = history.location.pathname.split('/');
      let params = {};
      if (pathname.length === 3) {
        params = {
          isOfTeam: props.isOfTeam,
          ownerId: props.isOfTeam ? pathname[2] : user.id,
          boardId: boardId
        }
      }

      else {
        params = {
          isOfTeam: props.isOfTeam,
          ownerId: user.id,
          boardId: boardId
        }
      }
      /*dispatch(getBoardDataForUI({ params }))
        .then(unwrapResult)
        .then(originalPromiseResult => {
          console.log('call done');
          //props.notFound(false);
        })
        .catch(err => {
          console.log(err);
  
          if (err.data?.ErrorCode === "404") {
            //props.notFound(true);
          }
        });*/
    } catch (err) {
    } finally {
      dispatch(setTeamLoading(false));
    }
  }, [boardId]);

  const renderNormal = () => {
    return <>
      {kanbanLists.length > 0 && (
        <div className="kanban-board-container">
          {/* <CardLoading isLoading={isLoading} /> */}

          <DragDropContext
            style={{ display: isLoading ? "none" : "flex" }}
            onDragEnd={onDragEnd}
          >
            <Droppable
              droppableId={currentBoard}
              direction="horizontal"
              type="list"
            >
              {(provided) => (
                <div
                  className="board"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {kanbanLists.map((item, index) => {
                    return (
                      <KanbanList
                        ownerId={props.ownerId}
                        isOfTeam={props.isOfTeam}
                        key={item.kanbanListId}
                        data={item}
                        index={index}
                      />
                    );
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>


        </div>
      )}

      {kanbanLists.length === 0 && (
        <div className="nodata-image">
          <div className="icon-group">
            <RiTableLine className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">
            Chưa có danh sách công việc nào trong bảng này
        </div>
          <div className="create-btn">Tạo danh sách mới</div>
        </div>
      )}
    </>
  }

  function onEditModalClose() {
    setIsShowEditPopup(false);
    console.log("ok");

    history.push({
      pathname: history.location.pathname,
      search: history.location.search.substring(0, history.location.search.lastIndexOf('&')),
    });
  }

  return (
    <div>
      {isLoading ? <div>
        <CardLoading isLoading={isLoading} />
      </div> : renderNormal()}

      <TaskEditModal
        isOfTeam={props.isOfTeam}
        closePopup={onEditModalClose}
        isShowEditPopup={isShowEditPopup}
        data={modalTaskObj}
      />
    </div>
  );
}

export default KanbanBoard;
