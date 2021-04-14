import React from "react";
import PropTypes from "prop-types";
import "./ChatPage.scss";
import { CRow, CCol, CCard } from "@coreui/react";
import ChatList from "./Components/ChatList/ChatList";
import ChatContent from "./Components/ChatContent/ChatContent";

ChatPage.propTypes = {};

function ChatPage(props) {
  return (
    <CRow className="chat-page-container">
      <CRow className="">
        <CCol className="chat-content-panel col-8">
          <CCard>
            <ChatContent />
          </CCard>
        </CCol>
        <CCol className="chat-tool-panel col-4">
          <CCard>
            <ChatList />
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  );
}

export default ChatPage;
