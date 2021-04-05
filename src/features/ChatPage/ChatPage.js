import React from "react";
import PropTypes from "prop-types";
import "./ChatPage.scss";
import { CRow, CCol, CCard } from "@coreui/react";
import PostList from "../NewsPage/components/PostList/PostList";

ChatPage.propTypes = {};

function ChatPage(props) {
  return (
    <CRow className="chat-page-container">
      <div className="main-row">
        <CCard className="col1"></CCard>
        <CCard className="col2">2</CCard>
      </div>
    </CRow>
  );
}

export default ChatPage;
