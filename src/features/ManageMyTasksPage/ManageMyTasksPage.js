import React, { useEffect, useState } from "react";
import "./ManageMyTasksPage.scss";
import MyBoards from "./Components/MyBoards/MyBoards";
import MyTasks from "./Components/MyTasks/MyTasks";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";

function ManageMyTasksPage(props) {
  const [isInBoard, setIsInBoard] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [boardId, setBoardId] = useState(() => {
    if (queryParams === null) return null;
    if (queryParams.b) return queryParams.b;
  });

  function goToBoard(boardId) {
    history.push({
      pathname: history.location.pathname,
      search: `b=${boardId}`,
    });
    setBoardId(boardId);
  }
  function goBackBoards() {
    setIsInBoard(false);
    history.push({
      pathname: history.location.pathname,
      search: null,
    });
  }

  useEffect(() => {
    if (!history.location.search) setIsInBoard(false);

    const queryObjs = queryString.parse(history.location.search);
    if (queryObjs.b) {
      setIsInBoard(true);
    }
  }, [history.location.search]);

  useEffect(() => {}, [boardId]);

  return (
    <div className="mytasks-page-container">
      {!isInBoard && <MyBoards goToBoard={goToBoard} />}
      {isInBoard && <MyTasks boardId={boardId} goBackBoards={goBackBoards} />}
    </div>
  );
}

export default ManageMyTasksPage;
