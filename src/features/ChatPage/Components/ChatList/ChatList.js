import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ChatList.scss";
import ChatListItem from "./Components/ChatListItem/ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroup } from "../../chatSlice";

ChatList.propTypes = {};

function ChatList(props) {
  const initChatList = [
    {
      id: "1",
      avatar: "http://emilus.themenate.net/img/avatars/thumb-2.jpg",
      chatName: "Khoa",
      lastestMessage: "Hello tao là khoa nè thằng quỷ",
      lastestTime: "42 phút",
      isNew: false,
      isSelected: true,
    },
    {
      id: "2",
      avatar: "http://emilus.themenate.net/img/avatars/thumb-1.jpg",
      chatName: "Dũng",
      lastestMessage: "Chờ chút",
      lastestTime: "22 phút",
      isNew: false,
      isSelected: false,
    },
    {
      id: "3",
      avatar: "http://emilus.themenate.net/img/avatars/thumb-3.jpg",
      chatName: "Khá Bảnh",
      lastestMessage: "Còn 8 năm nữa anh ra rồi",
      lastestTime: "3 ngày",
      isNew: false,
      isSelected: false,
    },
    {
      id: "4",
      avatar: "http://emilus.themenate.net/img/avatars/thumb-4.jpg",
      chatName: "Miu Miu",
      lastestMessage: "Anh Dũng book em trước rồi",
      lastestTime: "2 phút",
      isNew: false,
      isSelected: false,
    },
    {
      id: "5",
      avatar: "http://emilus.themenate.net/img/avatars/thumb-5.jpg",
      chatName: "Sugar Baby",
      lastestMessage: "Tối đi với Dũng rồi, sorry",
      lastestTime: "10 giây",
      isNew: true,
      isSelected: false,
    },
    {
      id: "6",
      avatar: "http://emilus.themenate.net/img/avatars/thumb-6.jpg",
      chatName: "Nico Robin",
      lastestMessage: "Làm xong deadline chưa bạn, tối qua chỉ",
      lastestTime: "8 phút",
      isNew: true,
      isSelected: false,
    },
    {
      id: "7",
      avatar: "http://emilus.themenate.net/img/avatars/thumb-7.jpg",
      chatName: "Khủng long",
      lastestMessage: "Làm xong deadline chưa bạn, tối qua chỉ",
      lastestTime: "10 giờ",
      isNew: true,
      isSelected: false,
    },
    {
      id: "8",
      avatar: "http://emilus.themenate.net/img/avatars/thumb-8.jpg",
      chatName: "Sugar Baby",
      lastestMessage: "Oke nha",
      lastestTime: "4 giờ",
      isNew: true,
      isSelected: false,
    },
    {
      id: "9",
      avatar: "http://emilus.themenate.net/img/avatars/thumb-9.jpg",
      chatName: "Sugar Baby",
      lastestMessage: "My name is Sugar, your...",
      lastestTime: "2 ngày",
      isNew: true,
      isSelected: false,
    },
    {
      id: "10",
      avatar: "http://emilus.themenate.net/img/avatars/thumb-10.jpg",
      chatName: "Sugar Baby",
      lastestMessage: "baby bay",
      lastestTime: "10 ngày",
      isNew: true,
      isSelected: false,
    },
  ];

  const [chatList, setChatList] = useState(initChatList);

  const dispatch = useDispatch();
  const groupChatList = useSelector(state => state.chat.groupChat);
  const hanelSelectItem = (selectedId) => {
    dispatch(setCurrentGroup(selectedId));
  };

  return (
    <div className="chat-list-conatainer">
      {groupChatList.map(function (item, index) {
        return (
          <ChatListItem
            key={index}
            data={item}
            animationDelay={index + 1}
            hanelSelectItem={hanelSelectItem}
          ></ChatListItem>
        );
      })}
    </div>
  );
}

export default ChatList;
