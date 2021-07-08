import React, { useState } from "react";
import "./AvatarName.scss";

function AvatarName(props) {
  //eslint-disable-next-line
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="avatar-name">
      <div
        className="user-name"
        onClick={() => {
          if (props.disable) return;
          setShowInfoModal(true);
        }}
      >
        {props.userName}
      </div>
      {/*<UserInfoModal
        userId={props.userId}
        show={showInfoModal}
        onClose={onCloseModal}
      />*/}
    </div>
  );
}

export default AvatarName;
