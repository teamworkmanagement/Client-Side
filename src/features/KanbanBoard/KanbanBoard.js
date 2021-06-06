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
import { getBoardDataForUI, handleDragEnd, setTaskSelected } from "./kanbanSlice";
import taskApi from "src/api/taskApi";
import kanbanApi from "src/api/kanbanApi";
import CardLoading from "./Components/KanbanList/Components/KanbanCard/Components/CardLoading/CardLoading";
import { RiTableLine } from "react-icons/ri";
import { VscSearchStop } from "react-icons/vsc";
import { useHistory } from "react-router";
import queryString from 'query-string';
import { unwrapResult } from "@reduxjs/toolkit";

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

  console.log(fixedList);
  //const fixedList = kanbanLists.find(x => x.kanbanListOrderInBoard === -999999);
  //kanbanLists = kanbanLists.filter(x => x.kanbanListOrderInBoard !== -999999)

  const currentBoard = useSelector(
    (state) => state.kanban.kanbanBoard.currentBoard
  );

  function onDragEnd(result) {
    //call api update pos (task/list) here

    const { destination, source, type, draggableId } = result;

    console.log(result);
    return;
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
          pos = listTasksSource[0].orderInList / 2;
        } else {
          if (destination.index === listTasksSource.length - 1) {
            pos =
              listTasksSource[listTasksSource.length - 1].orderInList + 65536;
          } else {
            if (source.index < destination.index)
              pos =
                (listTasksSource[destination.index].orderInList +
                  listTasksSource[destination.index + 1].orderInList) /
                2;
            else
              pos =
                (listTasksSource[destination.index].orderInList +
                  listTasksSource[destination.index - 1].orderInList) /
                2;
          }
        }
      }
      //khacs list
      else {
        if (destination.index === 0) {
          if (
            listTasksSource[source.index].orderInList <
            listTaskDestination[0]?.orderInList ||
            listTaskDestination.length === 0
          ) {
            pos = listTasksSource[source.index].orderInList;
          } else {
            pos = listTaskDestination[destination.index].orderInList / 2;
          }
        } else {
          if (destination.index === listTaskDestination.length) {
            pos =
              listTaskDestination[listTaskDestination.length - 1].orderInList +
              65536;
          } else {
            pos =
              (listTaskDestination[destination.index].orderInList +
                listTaskDestination[destination.index + 1].orderInList) /
              2;
          }
        }
      }

      taskApi
        .dragTask({
          taskId: listTasksSource[source.index].taskId,
          position: pos,
          oldList: source.droppableId,
          newList: destination.droppableId,
        })
        .then((res) => { })
        .catch((err) => { });
    } else {
      if (destination.index === 0) {
        pos = cloneKbLists[0].kanbanListOrderInBoard / 2;
      } else {
        if (destination.index === cloneKbLists.length - 1) {
          pos =
            cloneKbLists[cloneKbLists.length - 1].kanbanListOrderInBoard +
            65536;
        } else {
          if (source.index < destination.index)
            pos =
              (cloneKbLists[destination.index].kanbanListOrderInBoard +
                cloneKbLists[destination.index + 1].kanbanListOrderInBoard) /
              2;
          else
            pos =
              (cloneKbLists[destination.index].kanbanListOrderInBoard +
                cloneKbLists[destination.index - 1].kanbanListOrderInBoard) /
              2;
        }
      }

      kanbanApi
        .swapList({
          kanbanBoardId: currentBoard,
          position: pos,
          kanbanListId: draggableId,
        })
        .then((res) => { })
        .catch((err) => { });
    }
  }

  const history = useHistory();
  const [notask, setNoTask] = useState(false);

  const [boardId, setBoardId] = useState(null);

  useEffect(() => {
    /*console.log(history.location.search);
    const queryParams = queryString.parse(history.location.search);
    if (queryParams.b) {
      setBoardId(queryParams.b)
    }
    else {
      setBoardId(null);
    }

    if (queryParams.t) {
      taskApi.getTaskById(queryParams.t).then(res => {
        dispatch(setTaskSelected(queryParams.t));
      }).catch(err => {
        setNoTask(true);
      })
    }*/

  }, [history.location.search])



  const user = useSelector(state => state.auth.currentUser);

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
  return (
    <div>
      {isLoading ? <div>
        <CardLoading isLoading={isLoading} />
      </div> : renderNormal()}
    </div>
  );
}

export default KanbanBoard;
