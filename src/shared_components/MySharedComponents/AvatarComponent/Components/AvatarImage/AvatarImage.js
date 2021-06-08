import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./AvatarImage.scss";
import UserInfoModal from "src/shared_components/MySharedComponents/UserInfoModal/UserInfoModal";
import userApi from "src/api/userApi";

AvatarImage.propTypes = {};

function AvatarImage(props) {
  const [showInfoModal, setShowInfoModal] = useState(false);

  function onCloseModal() {
    setShowInfoModal(false);
  }

  function getImageName() {
    const name = props.userName;
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
    <div className="avatar-image">
      {props.userImage ? (
        <img alt="" src={props.userImage} />
      ) : (
        <div className="image-name">{getImageName()}</div>
      )}
      <div className="avatar-mask" onClick={() => setShowInfoModal(true)}></div>
      <UserInfoModal userId={props.userId} show={showInfoModal} onClose={onCloseModal} />
    </div>
  );
}

export default AvatarImage;
