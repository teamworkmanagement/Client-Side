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
import { getBoardDataForUI, handleDragEnd } from "./kanbanSlice";
import taskApi from "src/api/taskApi";
import kanbanApi from "src/api/kanbanApi";
import CardLoading from "./Components/KanbanList/Components/KanbanCard/Components/CardLoading/CardLoading";
import { RiTableLine } from "react-icons/ri";
import { VscSearchStop } from "react-icons/vsc";

KanbanBoard.propTypes = {};

function KanbanBoard(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
        .then((res) => {})
        .catch((err) => {});
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
        .then((res) => {})
        .catch((err) => {});
    }
  }

  useEffect(() => {
    if (!props.boardId) return;
    try {
      dispatch(setTeamLoading(true));
      setIsLoading(true);
      dispatch(getBoardDataForUI(props.boardId));
    } catch (err) {
    } finally {
      setIsLoading(false);
      dispatch(setTeamLoading(false));
    }
  }, [props.boardId]);

  return (
    <div>
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

          <div>
            <CardLoading isLoading={isLoading} />
          </div>
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
    </div>
  );
}

export default KanbanBoard;
