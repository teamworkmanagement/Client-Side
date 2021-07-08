import { CTooltip } from "@coreui/react";
import React from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";
import "./SearchTeamItem.scss";

function SearchTeamItem({ team }) {
  return (
    <div className="search-team-item">
      <div className="overview-info">
        <AiOutlineTeam className="icon-group" />
        {team.teamImage && team.teamImage !== "" && (
          <img alt="" className="team-image" src={team.teamImage} />
        )}

        <div className="info-group">
          <div className="name">
            Nhóm: <span>{team.teamName}</span>
          </div>
          <div className="description">{team.teamDescription}</div>
        </div>
      </div>
      <div className="detail-info">
        <div className="team-code">{team.teamCode}</div>

        <CTooltip content="Đi đến nhóm" placement="top-end">
          <div className="goto-btn">
            <FaChevronRight className="arrow-icon" />
          </div>
        </CTooltip>
      </div>
    </div>
  );
}

export default SearchTeamItem;
