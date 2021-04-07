import React from "react";
import "./ChatBody.scss";
import ChatList from "../ChatList/ChatList";
import ChatContent from "../ChatContent/ChatContent";

function ChatBody(props) {
  return (
    <div className="main__chatbody">
      <ChatContent />
    </div>
  );
}

export default ChatBody;
