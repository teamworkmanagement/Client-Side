import React, { useState } from "react";
import "./AvatarImage.scss";
import { useDispatch } from "react-redux";
import { setUserModal } from "src/appSlice";

function AvatarImage(props) {
  const [showInfoModal, setShowInfoModal] = useState(false);

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

  const dispatch = useDispatch();
  return (
    <div className="avatar-image">
      {props.userImage ? (
        <img alt="" src={props.userImage} />
      ) : (
        <div className="image-name">{getImageName()}</div>
      )}
      <div
        className="avatar-mask"
        onClick={() => {
          if (props.disable) return;
          setShowInfoModal(true);
          dispatch(
            setUserModal({
              show: true,
              userId: props.userId,
            })
          );
        }}
      ></div>
      {/*<UserInfoModal
        userId={props.userId}
        show={showInfoModal}
        onClose={onCloseModal}
      />*/}
    </div>
  );
}

export default AvatarImage;
