import React from "react";
import "./AvatarComponent.scss";
import AvatarImage from "./Components/AvatarImage/AvatarImage";
import AvatarName from "./Components/AvatarName/AvatarName";

function AvatarComponent(props) {
  return (
    <div className="avatar-full-component">
      <AvatarImage
        userName={props.userName}
        userImage={props.userImage}
        userId={props.userId}
        disable={props.disable}
      />
      <AvatarName
        userName={props.userName}
        userId={props.userId}
        disable={props.disable}
      />
    </div>
  );
}

export default AvatarComponent;
