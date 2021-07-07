import React, { useEffect, useState } from "react";
import "./MyBoards.scss";
import { CCol, CInput, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import kanbanApi from "src/api/kanbanApi";
import { useSelector } from "react-redux";
import CreateMyBoardModal from "../CreateMyBoardModal/CreateMyBoardModal";
import { BsClipboardData, BsSearch } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";

function MyBoards(props) {
  function goToBoard(boardId) {
    if (props.goToBoard) {
      props.goToBoard(boardId);
    }
  }

  const user = useSelector((state) => state.auth.currentUser);
  const [boards, setBoards] = useState([]);
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [loadone, setLoadDone] = useState(false);

  useEffect(() => {
    kanbanApi
      .getBoardsForUser(user.id)
      .then((res) => {
        setBoards(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoadDone(true);
      });
  }, []);

  const onCloseModal = (boardRes) => {
    setShowAddBoard(false);
    if (!boardRes) return;
    console.log(boardRes);
    setBoards([...boards, boardRes.data]);
  };

  const searchBoards = (e) => {
    const params = {
      isOfTeam: false,
      userId: user.id,
      keyWord: e.target.value,
    };

    kanbanApi
      .searchKanbanBoards({ params })
      .then((res) => {
        setBoards(res.data);
      })
      .catch((err) => {});
  };

  return (
    <div className="my-list-boards-container">
      <div className="list-boards-header">
        <div className="lookup-input">
          <CInput
            type="text"
            name="boardName"
            placeholder="Tìm bảng công việc..."
            onChange={searchBoards}
          />
          <BsSearch className="icon-search" />
        </div>
        <div className="other-actions">
          <div
            onClick={() => setShowAddBoard(true)}
            className="add-btn add-task-btn"
          >
            <CIcon name="cil-plus" />
            Tạo bảng công việc mới
          </div>
        </div>
      </div>
      <div className="list-boards">
        <CRow xl={{ cols: 5, gutter: 3 }}>
          {boards.map((item, index) => {
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
                  onClick={() => goToBoard(item.kanbanBoardId)}
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
      </div>
      <CreateMyBoardModal showAddBoard={showAddBoard} onClose={onCloseModal} />

      {boards.length === 0 && loadone && (
        <div className="nodata-image">
          <div className="icon-group">
            <BsClipboardData className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">Chưa có bảng công việc nào</div>
        </div>
      )}
    </div>
  );
}

export default MyBoards;
