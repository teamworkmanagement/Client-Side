import React from "react";
import PropTypes from "prop-types";
import "./MyChatPage.scss";
import { CRow, CCol, CCard } from "@coreui/react";
import PostList from "../NewsPage/components/PostList/PostList";
import MyChatList from "./Components/MyChatList/MyChatList";
import MyChatContent from "./Components/MyChatContent/MyChatContent";

MyChatPage.propTypes = {};

function MyChatPage(props) {
  return (
    <CRow className="chat-page-container">
      <CRow className="">
        <CCol className="chat-content-panel col-8">
          <CCard>
            <MyChatContent />
          </CCard>
        </CCol>
        <CCol className="chat-tool-panel col-4">
          <CCard>
            <MyChatList />
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  );
}

export default MyChatPage;
