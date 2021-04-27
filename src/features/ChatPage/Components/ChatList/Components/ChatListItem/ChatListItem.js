import React from "react";
import PropTypes from "prop-types";
import "./ChatListItem.scss";
import { CBadge } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroup, setIsSelected } from "src/features/ChatPage/chatSlice";

import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';

// register it.
timeago.register('vi', vi);

ChatListItem.propTypes = {};

function ChatListItem(props) {

  const dispatch = useDispatch();
  const currentGroup = useSelector(state => state.chat.currentGroup);
  const handelSelect = () => {
    if (props.data.groupChatId !== currentGroup) {
      dispatch(setCurrentGroup(props.data.groupChatId));
      dispatch(setIsSelected(true));
    }

  };

  return (
    <div
      onClick={() => handelSelect()}
      className={`chat-item-container ${props.data.isNew ? "message" : ""} ${props.data.groupChatId === currentGroup ? "selected" : ""
        }`}
      style={{ animationDelay: `${props.animationDelay / 10}s` }}
    >
      <div className="item-avatar">
        <img alt="" src={props.data.groupAvatar} />
      </div>
      <div className="item-content">
        <div className="item-content-header">
          <div className="chat-name">{props.data.groupChatName}</div>
          <div className="chat-last-time"><TimeAgo locale='vi'
            datetime={props.data.groupChatUpdatedAt} /></div>
        </div>
        <div className="item-content-body">
          <div className="chat-messagge">{props.data.lastestMes}</div>
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
