import React, { useEffect } from "react";
import "./ChatList.scss";
import ChatListItem from "./Components/ChatListItem/ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroup } from "../../chatSlice";
import { useHistory } from "react-router";
import queryString from "query-string";

function ChatList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const groupChatList = useSelector((state) => state.chat.groupChat);
  const currentGroup = useSelector((state) => state.chat.currentGroup);
  const hanelSelectItem = (selectedId) => {
    dispatch(setCurrentGroup(selectedId));
  };

  useEffect(() => {
    if (currentGroup) {
      let check = false;

      const queryObj = queryString.parse(history.location.search);

      if (queryObj.g) {
        if (queryObj.g !== currentGroup) {
          check = true;
        }
      }
      else {
        check = true;
      }
      if (!history.location.pathname.startsWith("/team/") && history.location.pathname.startsWith("/chat") && check) {
        history.push({
          pathname: history.location.pathname,
          search: `g=${currentGroup}`,
        });
      }
    }
  }, [currentGroup]);
  return (
    <div className="chat-list-container">
      {groupChatList.map(function (item, index) {
        return (
          <ChatListItem
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
