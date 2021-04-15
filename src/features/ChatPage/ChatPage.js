import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ChatPage.scss";
import { CRow, CCol, CCard } from "@coreui/react";
import PostList from "../NewsPage/components/PostList/PostList";
import MyChatList from "./Components/ChatList/ChatList";
import MyChatContent from "./Components/ChatContent/ChatContent";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupChatForUser, setLoadDone } from "./chatSlice";

MyChatPage.propTypes = {};

function MyChatPage(props) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.currentUser.id);
  const loadDone = useSelector(state => state.chat.loadDone);
  useEffect(() => {
    dispatch(getAllGroupChatForUser(userId));

    return function release() {
      dispatch(setLoadDone(false));
    }
  }, [])
  return (
    <CRow className="chat-page-container">
      {
        loadDone ? <CRow className="">
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
        </CRow> : null
      }
    </CRow>
  );
}

export default MyChatPage;
