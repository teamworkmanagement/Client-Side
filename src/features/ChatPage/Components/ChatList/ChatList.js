import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ChatList.scss";
import { CInputGroup, CInput, CInputGroupAppend, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChatListItem from "./Components/ChatListItem/ChatListItem";
ChatList.propTypes = {};

function ChatList(props) {
  const initChatList = [
    {
      id: "1",
      avatar:
        "https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg",
      chatName: "Khoa",
      lastestMessage: "Hello tao là khoa nè thằng quỷ",
      lastestTime: "42 phút",
      isNew: false,
      isSelected: true,
    },
    {
      id: "2",
      avatar:
        "https://www.pngjoy.com/pngm/209/4095832_kakashi-avatar-gamer-hd-png-download.png",
      chatName: "Dũng",
      lastestMessage: "Chờ chút",
      lastestTime: "22 phút",
      isNew: false,
      isSelected: false,
    },
    {
      id: "3",
      avatar: "https://i1.sndcdn.com/avatars-000139328661-3yxi2u-t500x500.jpg",
      chatName: "Khá Bảnh",
      lastestMessage: "Còn 8 năm nữa anh ra rồi",
      lastestTime: "3 ngày",
      isNew: false,
      isSelected: false,
    },
    {
      id: "4",
      avatar:
        "https://dreambuilders.dk/wp-content/uploads/2015/03/Screen-Shot-2015-03-02-at-2.53.43-PM.png",
      chatName: "Miu Miu",
      lastestMessage: "Anh Dũng book em trước rồi",
      lastestTime: "2 phút",
      isNew: false,
      isSelected: false,
    },
    {
      id: "5",
      avatar:
        "https://lh3.googleusercontent.com/sfqL9ZXWinErcwThSaKWdBQRzQ4NjmAt-eveN0yTjr0RAlULbfFZ3BiYFCYZcm8omg",
      chatName: "Sugar Baby",
      lastestMessage: "Tối đi với Dũng rồi, sorry",
      lastestTime: "10 giây",
      isNew: true,
      isSelected: false,
    },
    {
      id: "6",
      avatar:
        "https://i.pinimg.com/originals/8a/56/c8/8a56c8fb5f78bd6cff84cbb999809e05.jpg",
      chatName: "Nico Robin",
      lastestMessage: "Làm xong deadline chưa bạn, tối qua chỉ",
      lastestTime: "8 phút",
      isNew: true,
      isSelected: false,
    },
    {
      id: "7",
      avatar: "https://scr.vn/wp-content/uploads/2020/07/avt-cute.jpg",
      chatName: "Khủng long",
      lastestMessage: "Mình bị tuyệt chủng rồi",
      lastestTime: "10 giờ",
      isNew: true,
      isSelected: false,
    },
    {
      id: "8",
      avatar:
        "https://store.playstation.com/store/api/chihiro/00_09_000/container/CA/en/99/UP1063-BLUS31423_00-UAFAIRYFEN000021/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720",
      chatName: "Sugar Baby",
      lastestMessage: "Oke nha",
      lastestTime: "4 giờ",
      isNew: true,
      isSelected: false,
    },
    {
      id: "9",
      avatar:
        "https://thuthuatnhanh.com/wp-content/uploads/2019/07/hinh-anh-avatar-chibi-cuc-cute-de-thuong-cho-facebook-9.jpg",
      chatName: "Sugar Baby",
      lastestMessage: "My name is Sugar, your...",
      lastestTime: "2 ngày",
      isNew: true,
      isSelected: false,
    },
    {
      id: "10",
      avatar:
        "https://i.pinimg.com/originals/e3/79/fb/e379fb4952ed180112b2bb56c3e28f7f.jpg",
      chatName: "Sugar Baby",
      lastestMessage: "baby bay",
      lastestTime: "10 ngày",
      isNew: true,
      isSelected: false,
    },
  ];

  const [chatList, setChatList] = useState(initChatList);

  const hanelSelectItem = (selectedId) => {
    // clone current array to the new one
    const newChatList = [...chatList];

    newChatList.map((item, index) => {
      const isSlelectedItem = item.id === selectedId ? true : false;
      const returnItem = item;
      returnItem.isSelected = isSlelectedItem ? true : false;

      if (isSlelectedItem) {
        returnItem.isNew = false;
      }
      return {
        returnItem,
      };
    });

    // update todo list
    setChatList(newChatList);
  };

  return (
    <div className="chat-list-container">
      <CInputGroup className="chat-search">
        <CInput id="appendedInputButton" type="text" />
        <CInputGroupAppend>
          <CButton color="secondary">
            <CIcon name="cil-search" />
          </CButton>
        </CInputGroupAppend>
      </CInputGroup>
      <div className="list-items">
        {chatList.map(function (item, index) {
          return (
            <ChatListItem
              key={index}
              data={item}
              animationDelay={index + 3}
              hanelSelectItem={hanelSelectItem}
            ></ChatListItem>
          );
        })}
      </div>
    </div>
  );
}

export default ChatList;
