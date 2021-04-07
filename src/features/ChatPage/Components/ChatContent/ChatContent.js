import React from "react";
import "./ChatContent.scss";
import Avatar from "../ChatList/Avatar";
import ChatItem from "./ChatItem";

function ChatContent(props) {
  const chatlist = [
    {
      image:
        "https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg",
      type: "other",
      msg: "oka la hahahahaha",
      timeSend: "30/03/2021",
    },
    {
      image:
        "https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg",
      type: "other",
      msg: "oka la hahahahaha",
      timeSend: "30/03/2021",
    },
    {
      image:
        "https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg",
      type: "other",
      msg: "oka la hahahahaha",
      timeSend: "30/03/2021",
    },
    {
      image: "https://lamsaodecao.yolasite.com/resources/189921.png",
      type: "me",
      msg: "oka la hahahahaha",
      timeSend: "30/03/2021",
    },
    {
      image: "https://lamsaodecao.yolasite.com/resources/189921.png",
      type: "me",
      msg: "oka la hahahahaha",
      timeSend: "30/03/2021",
    },
    {
      image:
        "https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg",
      type: "other",
      msg: "oka la hahahahaha",
      timeSend: "30/03/2021",
    },
  ];
  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image="https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg"
            />
            <p>Khoa</p>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {chatlist.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={index}
                user={itm.type ? itm.type : "me"}
                msg={itm.msg}
                image={itm.image}
                timeSend={itm.timeSend}
              />
            );
          })}
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">+</button>
          <input type="text" placeholder="Type a message here" />

          <button className="btnSendMsg" id="sendMsgBtn">
            send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatContent;
