import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AvatarName.scss";
import UserInfoModal from "src/shared_components/MySharedComponents/UserInfoModal/UserInfoModal";

AvatarName.propTypes = {};

function AvatarName(props) {
  const [showInfoModal, setShowInfoModal] = useState(false);

  function onCloseModal() {
    setShowInfoModal(false);
  }
  return (
    <div className="avatar-name">
      <div
        className="user-name"
        onClick={() => {
          setShowInfoModal(true);
        }}
      >
        Dũng Nguyễn
      </div>
      <UserInfoModal show={showInfoModal} onClose={onCloseModal} />
    </div>
  );
}

export default AvatarName;
