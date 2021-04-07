import React from "react";
import PropTypes from "prop-types";
import "./ChatPage.scss";
import { CRow, CCol, CCard } from "@coreui/react";
import PostList from "../NewsPage/components/PostList/PostList";
import ChatBody from "./Components/ChatBody/ChatBody";
import ChatList from "./Components/ChatList/ChatList";

ChatPage.propTypes = {};

function ChatPage(props) {
  return (
    <CRow className="chat-page-container">
      <div className="main-row">
        <CCard className="col1">
          <ChatBody />
        </CCard>
        {/* <CCard className="col2">{ <ChatList /> }</CCard> */}
      </div>
    </CRow>
  );
}

export default ChatPage;
