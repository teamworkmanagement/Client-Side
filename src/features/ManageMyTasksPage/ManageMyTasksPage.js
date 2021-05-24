import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ManageMyTasksPage.scss";
import MyBoards from "./Components/MyBoards/MyBoards";
import MyTasks from "./Components/MyTasks/MyTasks";

ManageMyTasksPage.propTypes = {};

function ManageMyTasksPage(props) {
  const [isInBoard, setIsInBoard] = useState(false);
  function goToBoard(boardId) {
    setIsInBoard(true);
  }
  function goBackBoards() {
    setIsInBoard(false);
  }
  return (
    <div className="mytasks-page-container">
      {!isInBoard && <MyBoards goToBoard={goToBoard} />}
      {isInBoard && <MyTasks goBackBoards={goBackBoards} />}
    </div>
  );
}

export default ManageMyTasksPage;
