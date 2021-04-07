import React from "react";
import "./ChatList.scss";
import ChatListItems from "./ChatListItems";
import PropTypes from "prop-types";
import { CInputGroup, CInput, CInputGroupAppend, CButton } from "@coreui/react";

ChatList.propTypes = {};

ChatList.defaultProps = {};

function ChatList(props) {
  const groupsChat = [
    {
      name: "khoa",
      active: false,
      isOnline: true,
      image:
        "https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg",
      groupId: "1",
      status: "ok",
    },
    {
      name: "dũng",
      active: true,
      isOnline: false,
      image: "https://lamsaodecao.yolasite.com/resources/189921.png",
      groupId: "2",
      status: "ok",
    },
    {
      name: "dũng",
      active: true,
      isOnline: false,
      image: "https://lamsaodecao.yolasite.com/resources/189921.png",
      groupId: "2",
      status: "ok",
    },
    {
      name: "dũng",
      active: true,
      isOnline: false,
      image: "https://lamsaodecao.yolasite.com/resources/189921.png",
      groupId: "2",
      status: "ok",
    },
    {
      name: "dũng",
      active: true,
      isOnline: false,
      image: "https://lamsaodecao.yolasite.com/resources/189921.png",
      groupId: "2",
      status: "ok",
    },
    {
      name: "dũng",
      active: true,
      isOnline: false,
      image: "https://lamsaodecao.yolasite.com/resources/189921.png",
      groupId: "2",
      status: "ok",
    },
    {
      name: "dũng",
      active: true,
      isOnline: false,
      image: "https://lamsaodecao.yolasite.com/resources/189921.png",
      groupId: "2",
      status: "ok",
    },
  ];

  return (
    <div className="main__chatlist">
      <div className="chatlist__heading"></div>
      <CInputGroup>
        <CInput id="appendedInputButton" size="16" type="text" />
        <CInputGroupAppend>
          <CButton color="secondary">Go!</CButton>
        </CInputGroupAppend>
      </CInputGroup>
      <div className="chatlist__items">
        {groupsChat.map((item, index) => {
          return (
            <ChatListItems
              name={item.name}
              key={index}
              animationDelay={index + 1}
              active={item.active ? "active" : ""}
              isOnline={item.isOnline ? "active" : ""}
              image={item.image}
              groupId={item.groupId}
              status={item.status}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChatList;
