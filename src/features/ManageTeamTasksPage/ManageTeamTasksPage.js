import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ManageTeamTasksPage.scss";
import TeamBoards from "./Components/TeamBoards/TeamBoards";
import TeamTasks from "./Components/TeamTasks/TeamTasks";

ManageTeamTasksPage.propTypes = {};

function ManageTeamTasksPage(props) {
  const [isInBoard, setIsInBoard] = useState(false);
  const [boardId, setBoardId] = useState(null);
  function goToBoard(boardId) {
    setBoardId(boardId);
    setIsInBoard(true);
  }
  function goBackBoards() {
    setIsInBoard(false);
  }
  return (
    <div className="teamtasks-page-container">
      {!isInBoard && <TeamBoards goToBoard={goToBoard} />}
      {isInBoard && <TeamTasks boardId={boardId} goBackBoards={goBackBoards} />}
    </div>
  );
}

export default ManageTeamTasksPage;
