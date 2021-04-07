import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MyChatListItem.scss";
import { CBadge } from "@coreui/react";
MyChatListItem.propTypes = {};

function MyChatListItem(props) {
  const hanelSelect = () => {
    if (props.hanelSelectItem) {
      props.hanelSelectItem(props.data.id);
    }
  };

  return (
    <div
      onClick={() => hanelSelect()}
      className={`item-container ${props.data.isNew ? "new-message" : ""} ${
        props.data.isSelected ? "selected" : ""
      }
      `}
    >
      <div className="chat-item-avatar">
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

export default MyChatListItem;
