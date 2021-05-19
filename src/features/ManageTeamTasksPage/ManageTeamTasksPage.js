import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ManageTeamTasksPage.scss";
import MyBoards from "./Components/TeamBoards/TeamBoards";
import MyTasks from "./Components/TeamTasks/TeamTasks";

ManageTeamTasksPage.propTypes = {};

function ManageTeamTasksPage(props) {
  const [isInBoard, setIsInBoard] = useState(false);
  function goToBoard(boardId) {
    setIsInBoard(true);
  }
  function goBackBoards() {
    setIsInBoard(false);
  }
  return (
    <div className="teamtasks-page-container">
      {!isInBoard && <MyBoards goToBoard={goToBoard} />}
      {isInBoard && <MyTasks goBackBoards={goBackBoards} />}
    </div>
  );
}

export default ManageTeamTasksPage;
