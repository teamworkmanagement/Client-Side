import React from "react";
import PropTypes from "prop-types";
import "./BoardsPage.scss";
import { CButton, CCol, CInput, CRow, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";

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

  function openBoard(boardId) {
    if (props.openBoard) {
      props.openBoard(boardId);
    }
  }

  return (
    <div className="list-boards-container">
      <div className="list-boards-header">
        <div className="search-bar-container">
          <div className="input-container">
            <CInput
              class="input-field"
              placeholder="...tìm danh sách"
              type="text"
            />
            <div className="input-actions-group">
              <CIcon name="cil-search" />
            </div>
          </div>
        </div>
        <div className="other-actions">
          <div className="add-btn add-task-btn">
            <CIcon name="cil-plus" />
            Tạo danh sách mới
          </div>
        </div>
      </div>
      <div className="list-boards">
        <CRow xl={{ cols: 5, gutter: 3 }}>
          {listBoards.map((item, index) => {
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
                  onClick={() => openBoard(item.boardId)}
                >
                  <div className="board-title">{item.name}</div>
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
    </div>
  );
}

export default BoardsPage;