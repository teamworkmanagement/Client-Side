import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./KanbanBoard.scss";
import { useDispatch, useSelector } from "react-redux";
import KanbanList from "./Components/KanbanList/KanbanList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { setKanbanBoardData, setKanbanLists } from "src/appSlice";
import { CButton, CButtonGroup } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getBoardDataForUI, handleDragEnd } from "./kanbanSlice";
import taskApi from "src/api/taskApi";
import kanbanApi from "src/api/kanbanApi";
import CardLoading from "./Components/KanbanList/Components/KanbanCard/Components/CardLoading/CardLoading";

KanbanBoard.propTypes = {};

function KanbanBoard(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  /*const kanbanBoardData = useSelector((state) => state.app.kanbanBoardData);
  const kanbanLists = useSelector((state) => state.app.kanbanLists);
  const tasks = useSelector((state) => state.app.tasks);
  const boardId = "board_1";

  function onDragEnd(result) {
    dispatch(handleDragEnd(result));
    return;
  }

  /*function getKanbanListsData() {
    const boardId = "board_1";
    const lists = [];
    for (var i = 0; i < kanbanLists.length; i++) {
      if (kanbanLists[i].kanbanListBoardBelongedId === boardId) {
        lists.push({ ...kanbanLists[i] });
      }
    }
    if (lists.length === 0) return lists;
    //sort
    let clonedLists = [...lists];
    for (var i = 0; i < clonedLists.length; i++) {
      for (var j = i + 1; j < clonedLists.length; j++) {
        if (
          clonedLists[i].kanbanListOrderInBoard >
          clonedLists[j].kanbanListOrderInBoard
        ) {
          //debugger;
          let temp = clonedLists[i];
          clonedLists[i] = clonedLists[j];
          clonedLists[j] = temp;
        }
      }
    }
    return [...clonedLists];
  }

  let kanbanListsData = getKanbanListsData();*/

  const kanbanLists = useSelector(
    (state) => state.kanban.kanbanBoard.kanbanLists
  );

  const boardId = "board1";

  function onDragEnd(result) {
    //call api update pos (task/list) here

    // console.log(result);
    dispatch(handleDragEnd(result));

    const { destination, source, type } = result;
    if (!destination) return;
    if (type === "task") {
      if (
        destination.index === source.index &&
        destination.droppableId === source.droppableId
      )
        return;
      taskApi.dragTask({
        sourceDroppableId: source.droppableId,
        sourceIndex: source.index,
        destinationDroppableId: destination.droppableId,
        destinationIndex: destination.index,
      });
    } else {
      if (
        destination.index === source.index &&
        destination.droppableId === source.droppableId
      )
        return;
      kanbanApi.swapList({
        kanbanBoardId: boardId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    }
  }

  useEffect(() => {
    try {
      setIsLoading(true);
      dispatch(getBoardDataForUI("board1"));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);
  console.log(isLoading);
  return (
    <div className="kanban-board-container">
      <CardLoading isLoading={isLoading} />
      <DragDropContext
        style={{ display: isLoading ? "none" : "flex" }}
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId={boardId} direction="horizontal" type="list">
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
    </div>
  );
}

export default KanbanBoard;
