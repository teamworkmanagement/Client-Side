import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ManageTeamTasksPage.scss";
import TeamBoards from "./Components/TeamBoards/TeamBoards";
import TeamTasks from "./Components/TeamTasks/TeamTasks";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string';

ManageTeamTasksPage.propTypes = {};

function ManageTeamTasksPage(props) {
  const [isInBoard, setIsInBoard] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [boardId, setBoardId] = useState(() => {
    if (queryParams === null)
      return null;
    if (queryParams.b)
      return queryParams.b;
  });
  function goToBoard(boardId) {
    /*setBoardId(boardId);
    setIsInBoard(true);*/
    history.push({
      pathname: history.location.pathname,
      search: `b=${boardId}`,
    })
    setBoardId(boardId);
  }
  function goBackBoards() {
    setIsInBoard(false);
    history.push('/managetask/teamtasks');
  }

  useEffect(() => {
    if (!history.location.search)
      setIsInBoard(false);

    const queryObjs = queryString.parse(history.location.search);
    if (queryObjs.b) {
      setIsInBoard(true);
    }
  }, [history.location.search])

  useEffect(() => {
    
  }, [boardId])
  return (
    <div className="teamtasks-page-container">
      {!isInBoard && <TeamBoards goToBoard={goToBoard} />}
      {isInBoard && <TeamTasks boardId={boardId} goBackBoards={goBackBoards} />}
    </div>
  );
}

export default ManageTeamTasksPage;
