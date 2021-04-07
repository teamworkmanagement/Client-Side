import React from "react";
import Avatar from "./Avatar";

function ChatListItems(props) {
  return (
    <div
      style={{ animationDelay: `0.5s` }}
      className={`chatlist__item ${props.active ? "active" : ""} `}
    >
      <Avatar
        image={props.image ? props.image : "http://placehold.it/80x80"}
        isOnline={props.isOnline}
      />

      <div className="userMeta">
        <p>{props.name}</p>
        <span className="activeTime">69 mins ago</span>
        <p>
          <b>new</b>
        </p>
      </div>
    </div>
  );
}

export default ChatListItems;
