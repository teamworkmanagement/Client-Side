import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./BoardsPage.scss";
import { CButton, CCol, CInput, CRow, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import kanbanApi from "src/api/kanbanApi";
import CreateBoardModal from "./CreateBoardModal/CreateBoardModal";
import { BsClipboardData, BsSearch } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";
import { useHistory, useParams } from "react-router";
import queryString from "query-string";
import Loading from "src/shared_components/MySharedComponents/Loading/Loading";

BoardsPage.propTypes = {};

function BoardsPage(props) {
  const listBoards = [
    {
      boardId: 1,
      name: "Tasks Khóa luận",
      tasksCount: 21,
    },
    { boardId: 2, name: "Reactjs Road map", tasksCount: 54 },
    { boardId: 3, name: "Anh văn đề thi", tasksCount: 5 },
    { boardId: 4, name: "Trello redesign", tasksCount: 12 },
    { boardId: 5, name: "Hoạt động team building", tasksCount: 19 },
    { boardId: 6, name: "Ngữ pháp Korean", tasksCount: 16 },
    { boardId: 7, name: "Báo cáo luật", tasksCount: 28 },
    { boardId: 8, name: "Chuyển môn học", tasksCount: 6 },
    { boardId: 9, name: "Relax planing", tasksCount: 7 },
    { boardId: 10, name: "Tasks Khóa luận", tasksCount: 21 },
  ];

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

  useEffect(() => {
    setIsLoading(true);
    kanbanApi
      .getAllKanbanForTeam(teamId)
      .then((res) => {
        setBoardLists(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const showModalAddBoard = () => {
    setShowAddBoard(true);
  };

  const onCloseBoard = (e) => {
    setShowAddBoard(false);
    if (!e) {
      return;
    }
    setBoardLists([...boardLists, e.data]);
  };
  return (
    <div className="list-boards-in-teampage-container">
      <div className="list-boards-header">
        <div className="lookup-input">
          <CInput
            type="text"
            name="teamName"
            placeholder="Tìm bảng công việc..."
          />
          <BsSearch className="icon-search" />
        </div>
        <div className="other-actions">
          <div className="add-btn add-task-btn" onClick={showModalAddBoard}>
            <CIcon name="cil-plus" />
            Tạo bảng công việc mới
          </div>
        </div>
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
          {/*<div className="create-btn">Tạo bảng công việc mới</div>*/}
        </div>
      )}
    </div>
  );
}

export default BoardsPage;
