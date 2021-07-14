import React, { useEffect, useState } from "react";
import "./BoardsPage.scss";
import { CCol, CInput, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import kanbanApi from "src/api/kanbanApi";
import CreateBoardModal from "./CreateBoardModal/CreateBoardModal";
import { BsClipboardData, BsSearch } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";
import { useHistory, useParams } from "react-router";
import Loading from "src/shared_components/MySharedComponents/Loading/Loading";
import { useSelector } from "react-redux";

function BoardsPage(props) {
  const history = useHistory();
  function openBoard(boardId) {
    if (props.openBoard) {
      props.openBoard(boardId);

      history.push({
        pathname: history.location.pathname,
        search: history.location.search + `&b=${boardId}`,
      });
    }
  }

  const [boardLists, setBoardLists] = useState([]);
  const [showAddBoard, setShowAddBoard] = useState(false);
  const { teamId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    setIsLoading(true);
    kanbanApi
      .getAllKanbanForTeam(teamId)
      .then((res) => {
        setBoardLists(res.data);
      })
      .catch((err) => { })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const showModalAddBoard = () => {
    console.log('clicked');
    console.log(showAddBoard);
    setShowAddBoard(true);
  };

  const onCloseBoard = (e) => {
    setShowAddBoard(false);
    if (!e) {
      return;
    }
    setBoardLists([...boardLists, e.data]);
  };

  const searchBoards = (e) => {
    const params = {
      isOfTeam: true,
      teamId: teamId,
      keyWord: e.target.value,
    };

    kanbanApi
      .searchKanbanBoards({ params })
      .then((res) => {
        setBoardLists(res.data);
      })
      .catch((err) => { });
  };

  return (
    <div className="list-boards-in-teampage-container">
      <div className="list-boards-header">
        <div className="lookup-input">
          <CInput
            type="text"
            name="teamName"
            placeholder="Tìm bảng công việc..."
            onChange={searchBoards}
          />
          <BsSearch className="icon-search" />
        </div>
        {props.team.teamLeaderId === user.id && <div className="other-actions">
          <div className="add-btn add-task-btn" onClick={showModalAddBoard}>
            <CIcon name="cil-plus" />
            Tạo bảng công việc mới
          </div>
        </div>}
      </div>
      {isLoading && boardLists.length === 0 && <Loading />}
      {boardLists.length > 0 && (
        <div className="list-boards">
          <CRow>
            {boardLists.map((item, index) => {
              return (
                <CCol
                  xs="12"
                  sm="6"
                  md="4"
                  xl="3"
                  key={index}
                  style={{ animationDelay: `${index / 20}s` }}
                  className="board-item-container"
                >
                  <div
                    className="board-item"
                    onClick={() => openBoard(item.kanbanBoardId)}
                  >
                    <div className="board-title">{item.kanbanBoardName}</div>
                    <div className="tasks-count">
                      <CIcon name="cil-storage" />
                      {item.tasksCount}
                    </div>
                  </div>
                </CCol>
              );
            })}
          </CRow>

          <CreateBoardModal
            showAddBoard={showAddBoard}
            onClose={onCloseBoard}
          />
        </div>
      )}

      {boardLists.length === 0 && !isLoading && (
        <div className="nodata-image">
          <div className="icon-group">
            <BsClipboardData className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">
            Chưa có bảng công việc nào trong nhóm này
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardsPage;
