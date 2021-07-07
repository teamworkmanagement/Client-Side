import React, { useEffect } from "react";
import "./AvatarList.scss";
import { CTooltip } from "@coreui/react";
import { useSelector } from "react-redux";

function AvatarList(props) {
  const team = useSelector((state) =>
    state.team.teams.find((x) => x.teamId === props.teamId)
  );

  useEffect(() => {
    console.log(team);
  }, [team]);

  return (
    <div className="avatar-list-container">
      {team &&
        team.teamUsers.map((user) => {
          return (
            <CTooltip placement="top" content={user.userFullName}>
              <div className="avatar-list-item">
                <img alt="" src={user.userImageUrl} />
              </div>
            </CTooltip>
          );
        })}

      {team && team.teamMemberCount - team.teamUsers.length > 0 && (
        <div className="count-more-container">
          <div className="count-more">
            +{team.teamMemberCount - team.teamUsers.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarList;
