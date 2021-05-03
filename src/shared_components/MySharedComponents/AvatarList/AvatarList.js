import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AvatarList.scss";
import { CTooltip } from "@coreui/react";

AvatarList.propTypes = {};

function AvatarList(props) {
  const [users, setUsers] = useState(props.users);
  const [usersRefactor, setUsersRefactor] = useState(getUsers);

  function getUsers() {
    const limitAvatar = 6;
    var cloneUsers = [];

    if (users.length <= limitAvatar) return users;
    for (let i = 0; i < limitAvatar - 1; i++) {
      cloneUsers.push(users[i]);
    }
    const more = users.length - limitAvatar + 1;
    cloneUsers.push({
      count: more,
    });
    return cloneUsers;
  }

  return (
    <div className="avatar-list-container">
      {usersRefactor.map((user) => {
        return user.count ? (
          <div className="count-more-container">
            <div className="count-more">+{user.count}</div>
          </div>
        ) : (
          <CTooltip placement="top" content={user.userFullName}>
            <div className="avatar-list-item">
              <img alt="" src={user.userImageUrl} />
            </div>
          </CTooltip>
        );
      })}
    </div>
  );
}

export default AvatarList;
