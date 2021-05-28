import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ChatList.scss";
import ChatListItem from "./Components/ChatListItem/ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroup } from "../../chatSlice";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string';

ChatList.propTypes = {};

function ChatList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const groupChatList = useSelector((state) => state.chat.groupChat);
  const currentGroup = useSelector((state) => state.chat.currentGroup);
  const hanelSelectItem = (selectedId) => {
    dispatch(setCurrentGroup(selectedId));
  };

  useEffect(() => {
    if (currentGroup) {
      history.push({
        pathname: history.location.pathname,
        search: `g=${currentGroup}`,
      });
    };
  }, [currentGroup])
  return (
    <div className="chat-list-container">
      {groupChatList.map(function (item, index) {
        return (
          <ChatListItem
            image={props.chatImages[index]}
            key={index}
            data={item}
            index={index}
            animationDelay={index + 1}
            hanelSelectItem={hanelSelectItem}
          ></ChatListItem>
        );
      })}
    </div>
  );
}

export default ChatList;
