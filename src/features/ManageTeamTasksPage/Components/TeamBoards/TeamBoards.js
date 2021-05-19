import React from "react";
import PropTypes from "prop-types";
import "./TeamBoards.scss";
import { CButton, CCol, CInput, CRow, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";

TeamBoards.propTypes = {};

function TeamBoards(props) {
  const listBoards = [
    {
      boardId: 1,
      name: "Tasks Khóa luận",
      tasksCount: 21,
      teamName: "Anh văn TOEIC",
      teamImage:
        "https://chengming.co.th/wp-content/uploads/2020/08/pwqsf11b8adbA3KaVQ7B-o.png",
    },
    {
      boardId: 2,
      name: "Reactjs Road map",
      tasksCount: 54,
      teamName: "Hóa học 12A1",
      teamImage:
        "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/95384801_3541411182540556_323501399205740544_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=PNRMG3JZivEAX8fDiPY&_nc_ht=scontent.fsgn5-3.fna&oh=f9d490f5d7f7a1b81999da2845b80923&oe=609FA0C7",
    },
    {
      boardId: 3,
      name: "Anh văn đề thi",
      tasksCount: 5,
      teamName: "Anh văn TOEIC",
      teamImage:
        "https://chengming.co.th/wp-content/uploads/2020/08/pwqsf11b8adbA3KaVQ7B-o.png",
    },
    {
      boardId: 4,
      name: "Trello redesign",
      tasksCount: 12,
      teamName: "Hóa học 12A1",
      teamImage:
        "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/95384801_3541411182540556_323501399205740544_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=PNRMG3JZivEAX8fDiPY&_nc_ht=scontent.fsgn5-3.fna&oh=f9d490f5d7f7a1b81999da2845b80923&oe=609FA0C7",
    },
    {
      boardId: 5,
      name: "Hoạt động team building",
      tasksCount: 19,
      teamName: "J2Team Community",
      teamImage: "https://i.ytimg.com/vi/u2ypkUBGEHI/maxresdefault.jpg",
    },
    {
      boardId: 6,
      name: "Ngữ pháp Korean",
      tasksCount: 16,
      teamName: "J2Team Community",
      teamImage: "https://i.ytimg.com/vi/u2ypkUBGEHI/maxresdefault.jpg",
    },
    {
      boardId: 7,
      name: "Báo cáo luật",
      tasksCount: 28,
      teamName: "J2Team Community",
      teamImage: "https://i.ytimg.com/vi/u2ypkUBGEHI/maxresdefault.jpg",
    },
    {
      boardId: 8,
      name: "Chuyển môn học",
      tasksCount: 6,
      teamName: "Anh văn TOEIC",
      teamImage:
        "https://chengming.co.th/wp-content/uploads/2020/08/pwqsf11b8adbA3KaVQ7B-o.png",
    },
    {
      boardId: 9,
      name: "Relax planing",
      tasksCount: 7,
      teamName: "Hóa học 12A1",
      teamImage:
        "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/95384801_3541411182540556_323501399205740544_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=PNRMG3JZivEAX8fDiPY&_nc_ht=scontent.fsgn5-3.fna&oh=f9d490f5d7f7a1b81999da2845b80923&oe=609FA0C7",
    },
    {
      boardId: 10,
      name: "Tasks Khóa luận",
      tasksCount: 21,
      teamName: "Anh văn TOEIC",
      teamImage:
        "https://chengming.co.th/wp-content/uploads/2020/08/pwqsf11b8adbA3KaVQ7B-o.png",
    },
  ];

  function goToBoard(boardId) {
    if (props.goToBoard) {
      props.goToBoard(boardId);
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
                  onClick={() => goToBoard(item.boardId)}
                >
                  <div className="board-title">{item.name}</div>
                  <div className="board-team-infor">
                    Nhóm:
                    <img alt="" src={item.teamImage} />
                    <div className="team-name">{item.teamName}</div>
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
    </div>
  );
}

export default TeamBoards;
