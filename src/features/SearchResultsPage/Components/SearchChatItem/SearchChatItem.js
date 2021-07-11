import { CTooltip } from "@coreui/react";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { HiOutlineChat } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import AvatarListChat from "./Components/AvatarListChat/AvatarListChat.js";
import "./SearchChatItem.scss";

function SearchChatItem({ chat }) {
  const history = useHistory();
  const onNavigate = () => {
    history.push(chat.link);
  }
  return (
    <div className="search-chat-item">
      <div className="overview-info">
        <HiOutlineChat className="icon-chat" />
        <div className="info-group">
          <div className="name">
            Nhóm nhắn tin: <span>{chat.chatName}</span>
          </div>
          <div className="list-ava">
            <AvatarListChat memberList={chat.chatListMembers} />
          </div>
        </div>
      </div>
      <div className="detail-info">
        <AvatarListChat memberList={chat.chatListMembers} />
        <CTooltip content="Đi đến Nhóm tin nhắn" placement="top-end">
          <div className="goto-btn" onClick={onNavigate}>
            <FaChevronRight className="arrow-icon" />
          </div>
        </CTooltip>
      </div>
    </div>
  );
}

export default SearchChatItem;
