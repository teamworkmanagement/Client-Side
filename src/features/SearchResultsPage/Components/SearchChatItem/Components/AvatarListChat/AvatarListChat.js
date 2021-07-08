import React from "react";
import "./AvatarListChat.scss";
import { CTooltip } from "@coreui/react";

function AvatarListChat({ memberList }) {
  function getImageName(name) {
    const words = name.split(" ");
    if (words.length > 1) {
      return words[0][0] + words[1][0];
    } else {
      if (words[0].length === 1) {
        return words[0];
      }
      return words[0].slice(0, 1);
    }
  }

  return (
    <div className="avatar-list-chat">
      <div className="title">Thành viên:</div>
      {memberList &&
        memberList.map((member, index) => {
          if (index > 3) return null;
          return (
            <CTooltip placement="top" content={member.memberName}>
              <div className="avatar-list-item">
                {member.memberAvatar && member.memberAvatar !== "" && (
                  <img alt="" src={member.memberAvatar} />
                )}
                {(!member.memberAvatar || member.memberAvatar === "") && (
                  <div className="image-name">
                    {getImageName(member.memberName)}
                  </div>
                )}
              </div>
            </CTooltip>
          );
        })}

      {memberList && memberList.length > 4 && (
        <div className="count-more-container">
          <div className="count-more">+{memberList.length - 4}</div>
        </div>
      )}
    </div>
  );
}

export default AvatarListChat;
