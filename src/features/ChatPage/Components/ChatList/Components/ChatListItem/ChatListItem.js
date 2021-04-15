import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ChatListItem.scss";
import { CBadge } from "@coreui/react";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroup, setIsSelected } from "src/features/ChatPage/chatSlice";
// register it.
timeago.register('vi', vi);
MyChatListItem.propTypes = {};

function MyChatListItem(props) {
  const dispatch = useDispatch();
  const currentGroup = useSelector(state => state.chat.currentGroup);
  const handelSelect = () => {
    //if (props.hanelSelectItem) {
    //props.hanelSelectItem(props.data.groupChatId);
    //}
    if (props.data.groupChatId !== currentGroup) {
      dispatch(setCurrentGroup(props.data.groupChatId));
      dispatch(setIsSelected(true));
    }

  };

  return (
    <div
      onClick={() => handelSelect()}
      className={`item-container ${props.data.newMessage ? "new-message" : ""} ${currentGroup === props.data.groupChatId ? "selected" : ""
        }
      `}
      style={{ animationDelay: `0.${props.animationDelay}s` }}
    >
      <div className="chat-item-avatar">
        <img alt="" src={props.data.groupAvatar} />
      </div>
      <div className="item-content">
        <div className="item-content-header">
          <div className="chat-name">{props.data.groupChatName}</div>
          <div className="chat-last-time">
            <TimeAgo datetime={props.data.groupChatUpdatedAt}
              locale='vi'>
            </TimeAgo>
          </div>
        </div>
        <div className="item-content-body">
          <div className="chat-messagge">props.data.lastestMessage</div>
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
