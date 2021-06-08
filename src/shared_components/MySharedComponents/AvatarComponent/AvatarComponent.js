import React from "react";
import PropTypes from "prop-types";
import "./AvatarComponent.scss";
import AvatarImage from "./Components/AvatarImage/AvatarImage";
import AvatarName from "./Components/AvatarName/AvatarName";

AvatarComponent.propTypes = {};

function AvatarComponent(props) {
  return (
    <div className="avatar-full-component">
      <AvatarImage
        userName={props.userName}
        userImage={props.userImage}
        userId={props.userId}
      />
      <AvatarName userName={props.userName} userId={props.userId} />
    </div>
  );
}

export default AvatarComponent;