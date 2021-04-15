import React from "react";
import PropTypes from "prop-types";
import "./ChatListItem.scss";
import { CBadge } from "@coreui/react";

ChatListItem.propTypes = {};

function ChatListItem(props) {
  const handelSelect = () => {
    if (props.hanelSelectItem) {
      props.hanelSelectItem(props.data.id);
    }
  };

  return (
    <div
      onClick={() => handelSelect()}
      className={`chat-item-container ${props.data.isNew ? "message" : ""} ${
        props.data.isSelected ? "selected" : ""
      }`}
      style={{ animationDelay: `${props.animationDelay / 10}s` }}
    >
      <div className="item-avatar">
        <img alt="" src={props.data.avatar} />
      </div>
      <div className="item-content">
        <div className="item-content-header">
          <div className="chat-name">{props.data.chatName}</div>
          <div className="chat-last-time">{props.data.lastestTime}</div>
        </div>
        <div className="item-content-body">
          <div className="chat-messagge">{props.data.lastestMessage}</div>
          <div className="chat-noti">
            <CBadge className="mr-1" color="danger">
              Mới
            </CBadge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
