import React, { useEffect, useState } from "react";
import "./TeamBoards.scss";
import { CCol, CInput, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
import kanbanApi from "src/api/kanbanApi";
import { BsClipboardData, BsSearch } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";

function TeamBoards(props) {
  const user = useSelector((state) => state.auth.currentUser);

  function goToBoard(item) {
    if (props.goToBoard) {
      props.goToBoard(item);
    }
  }

  const [boards, setBoards] = useState([]);
  const [loadone, setLoadDone] = useState(false);
  useEffect(() => {
    kanbanApi
      .getBoardsForUserTeams(user.id)
      .then((res) => {
        console.log(res);
        setBoards(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoadDone(true);
      });
  }, []);

  const searchBoards = (e) => {
    const params = {
      isOfTeam: true,
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
    <div className="list-team-boards-container">
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
        {/*<div className="other-actions">
          <div className="add-btn add-task-btn">
            <CIcon name="cil-plus" />
            Tạo bảng công việc mới
          </div>
  </div>*/}
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
                <div className="board-item" onClick={() => goToBoard(item)}>
                  <div className="board-title">{item.kanbanBoardName}</div>
                  <div className="board-team-infor">
                    Nhóm:
                    <img alt="" src={item.groupImageUrl} />
                    <div className="team-name">{item.kanbanBoardGroupName}</div>
                  </div>
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

export default TeamBoards;
