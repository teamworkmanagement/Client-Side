import { CTooltip } from "@coreui/react";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import "./SearchBoardItem.scss";

function SearchBoardItem({ board }) {
  return (
    <div className="search-board-item">
      <div className="overview-info">
        <RiDashboardLine className="icon-board" />

        <div className="info-group">
          <div className="name">
            Bảng công việc: <span>{board.boardName}</span>
          </div>
          <div className="description">
            {board.boardUserId && board.boardUserId !== "" && (
              <div className="description-detail">
                Thuộc: <span>Của tôi</span>
              </div>
            )}
            {(!board.boardUserId || board.boardUserId === "") && (
              <div className="description-detail is-team">
                Thuộc nhóm:
                <div className="board-team-info">
                  {board.boardTeamImage && board.boardTeamImage !== "" && (
                    <img
                      className="board-team-image"
                      alt=""
                      src={board.boardTeamImage}
                    />
                  )}
                  <div className="board-team-name">{board.boardTeamName}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="detail-info">
        <CTooltip content="Đi đến Bảng công việc" placement="top-end">
          <div className="goto-btn">
            <FaChevronRight className="arrow-icon" />
          </div>
        </CTooltip>
      </div>
    </div>
  );
}

export default SearchBoardItem;
