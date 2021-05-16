import React from "react";
import PropTypes from "prop-types";
import "./ChatListItem.scss";
import { CBadge } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentGroup,
  setIsSelected,
} from "src/features/ChatPage/chatSlice";

import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import vi from "timeago.js/lib/lang/vi";

// register it.
timeago.register("vi", vi);

ChatListItem.propTypes = {};

function ChatListItem(props) {
  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => state.chat.currentGroup);
  const handelSelect = () => {
    if (props.data.groupChatId !== currentGroup) {
      dispatch(setCurrentGroup(props.data.groupChatId));
      dispatch(setIsSelected(true));
    }
  };

  const chatImages = [
    "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/95384801_3541411182540556_323501399205740544_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=PNRMG3JZivEAX8fDiPY&_nc_ht=scontent.fsgn5-3.fna&oh=f9d490f5d7f7a1b81999da2845b80923&oe=609FA0C7",
    "https://i.ytimg.com/vi/u2ypkUBGEHI/maxresdefault.jpg",
    "https://scontent-sin6-3.xx.fbcdn.net/v/t1.6435-9/70944423_1289407744573535_1300646982062178304_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=825194&_nc_ohc=30N8un2vPewAX8QcAkk&_nc_ht=scontent-sin6-3.xx&oh=5ece776d1f0b830ca2f8e106d6452719&oe=609EBA21",
    "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
    "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
  ];

  return (
    <div
      onClick={() => handelSelect()}
      className={`chat-item-container ${
        props.data.newMessage ? "message" : ""
      } ${props.data.groupChatId === currentGroup ? "selected" : ""}`}
      style={{ animationDelay: `${props.animationDelay / 10}s` }}
    >
      <div className="item-avatar">
        <img
          alt=""
          src={
            props.data.groupAvatar
              ? props.data.groupAvatar
              : chatImages[props.index]
          }
        />
      </div>

      <div className="item-content">
        <div className="item-content-header">
          <div className="chat-name">{props.data.groupChatName}</div>
          <div className="chat-last-time">
            <TimeAgo locale="vi" datetime={props.data.groupChatUpdatedAt} />
          </div>
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
