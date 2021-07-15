import React, { useEffect, useState } from "react";
import "./KanbanBoard.scss";
import { useDispatch, useSelector } from "react-redux";
import KanbanList from "./Components/KanbanList/KanbanList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { setTeamLoading } from "src/appSlice";
import taskApi from "src/api/taskApi";
import kanbanApi from "src/api/kanbanApi";
import { RiTableLine } from "react-icons/ri";
import { VscSearchStop } from "react-icons/vsc";
import { useHistory } from "react-router";
import {
  CreateNewListRank,
  FindNextRank,
  FindPreRank,
  FindRankBetween,
  genNewRank,
} from "src/utils/lexorank/lexorank";
import { connection } from "src/utils/signalr/kanbanService";
import { dragListLocal, dragTaskLocal } from "./kanbanSlice";
import NotFoundPage from "src/shared_components/MySharedComponents/NotFoundPage/NotFoundPage";
import Loading from "src/shared_components/MySharedComponents/Loading/Loading";

function KanbanBoard(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.app.teamLoading);

  const kanbanLists = useSelector(
    (state) => state.kanban.kanbanBoard.kanbanLists
  );

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
            pos = FindNextRank(
              listTasksSource[listTasksSource.length - 1].taskRankInList
            );
          } else {
            if (source.index < destination.index) {
              const newRank = FindRankBetween(
                listTasksSource[destination.index].taskRankInList,
                listTasksSource[destination.index + 1].taskRankInList
              );
              pos = newRank.rank;
              if (!newRank.rank && newRank.isOutOfSlot) {
                //rebalance here
                kanbanApi.rebalanceTask({
                  kanbanListId: destination.droppableId,
                  ranks: CreateNewListRank(listTaskDestination.length)
                }).then(res => {

                }).catch(err => {

                })
              }
            } else {
              const newRank = FindRankBetween(
                listTasksSource[destination.index - 1].taskRankInList,
                listTasksSource[destination.index].taskRankInList
              );
              pos = newRank.rank;
              if (newRank.isOutOfSlot) {
                //rebalance here
                kanbanApi.rebalanceTask({
                  kanbanListId: destination.droppableId,
                  ranks: CreateNewListRank(listTaskDestination.length)
                }).then(res => {

                }).catch(err => {

                })
              }
            }
          }
        }
      }
      //khacs list
      else {
        if (destination.index === 0) {
          if (listTaskDestination.length === 0) {
            pos = genNewRank();
          } else {
            pos = FindPreRank(listTaskDestination[0].taskRankInList);
          }
        } else {
          if (destination.index === listTaskDestination.length) {
            pos = FindNextRank(
              listTaskDestination[listTaskDestination.length - 1].taskRankInList
            );
          } else {
            const newRank = FindRankBetween(
              listTaskDestination[destination.index - 1].taskRankInList,
              listTaskDestination[destination.index].taskRankInList
            );
            pos = newRank.rank;
            if (newRank.isOutOfSlot) {
              //rebalance here
              kanbanApi.rebalanceTask({
                kanbanListId: destination.droppableId,
                ranks: CreateNewListRank(listTaskDestination.length)
              }).then(res => {

              }).catch(err => {

              })
            }
          }
        }
      }

      dispatch(
        dragTaskLocal({
          taskId: listTasksSource[source.index].taskId,
          position: pos,
          oldList: source.droppableId,
          newList: destination.droppableId,
        })
      );

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
          pos = FindNextRank(
            cloneKbLists[cloneKbLists.length - 1].kanbanListRankInBoard
          );
        } else {
          if (source.index < destination.index) {
            const newRank = FindRankBetween(
              cloneKbLists[destination.index].kanbanListRankInBoard,
              cloneKbLists[destination.index + 1].kanbanListRankInBoard
            );
            pos = newRank.rank;
            if (newRank.isOutOfSlot) {
              //rebalance here
              kanbanApi.rebalanceList({
                kanbanBoardId: currentBoard,
                ranks: CreateNewListRank(kanbanLists.length)
              }).then(res => {

              }).catch(err => {

              })
            }
          } else {
            const newRank = FindRankBetween(
              cloneKbLists[destination.index - 1].kanbanListRankInBoard,
              cloneKbLists[destination.index].kanbanListRankInBoard
            );
            pos = newRank.rank;
            if (newRank.isOutOfSlot) {
              //rebalance here
              kanbanApi.rebalanceList({
                kanbanBoardId: currentBoard,
                ranks: CreateNewListRank(kanbanLists.length)
              }).then(res => {

              }).catch(err => {

              })
            }
          }
        }
      }

      dispatch(
        dragListLocal({
          position: pos,
          kanbanListId: draggableId,
        })
      );

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
  //eslint-disable-next-line
  const [boardId, setBoardId] = useState(null);

  const tasks = [];
  //eslint-disable-next-line
  kanbanLists.map((kl) => {
    //eslint-disable-next-line
    kl.taskUIKanbans.map((task) => {
      tasks.push(task);
    });
  });

  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (!boardId) return;
    try {
      dispatch(setTeamLoading(true));

      const pathname = history.location.pathname.split("/");
      let params = {};
      if (pathname.length === 3) {
        params = {
          isOfTeam: props.isOfTeam,
          ownerId: props.isOfTeam ? pathname[2] : user.id,
          boardId: boardId,
        };
      } else {
        //eslint-disable-next-line
        params = {
          isOfTeam: props.isOfTeam,
          ownerId: user.id,
          boardId: boardId,
        };
      }
    } catch (err) {
    } finally {
      dispatch(setTeamLoading(false));
    }
  }, [boardId]);

  const renderNormal = () => {
    return (
      <>
        {kanbanLists.length > 0 && currentBoard && (
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

        {kanbanLists.length === 0 && currentBoard && (
          <div className="nodata-image">
            <div className="icon-group">
              <RiTableLine className="icon-task" />
              <VscSearchStop className="icon-search" />
            </div>

            <div className="noti-infor">
              Chưa có danh sách công việc nào trong bảng này
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="kanban-board-page">
      {isLoading ? <Loading /> : renderNormal()}
      {!currentBoard && !isLoading && <NotFoundPage />}
    </div>
  );
}

export default KanbanBoard;
