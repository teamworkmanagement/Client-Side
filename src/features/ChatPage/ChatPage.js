import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./ChatPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupChatForUser, setLoadDone } from "./chatSlice";
import { CButton, CInput, CInputGroup, CInputGroupAppend } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import NewChatList from "./Components/ChatList/ChatList";
import NewMessageList from "./Components/MessageList/MessageList";

ChatPage.propTypes = {};


function ChatPage(props) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.currentUser.id);
  const loadDone = useSelector(state => state.chat.loadDone);
  const [reachTop, setReachTop] = useState(0);

  useEffect(() => {
    dispatch(getAllGroupChatForUser(userId));
    return function release() {
      dispatch(setLoadDone(false));
    }
  }, []);

  const onScroll = (e) => {
    let i = 0;
    let element = e.target;
    if (element.scrollTop === 0) {
      console.log('reach top: ', i++);
      setReachTop(reachTop + 1);
    }
  };

  const scrollRef = useRef(null);
  const scrollFixed = () => {
    scrollRef.current.scrollTo(0, 50);
  }
  return (
    <div className="chat-page-container">
      {
        loadDone ? <div className="chat-main-content">
          <div className="chat-list">
            <div className="chat-list-header">
              <CInputGroup className="chat-list-search">
                <CInput id="appendedInputButton" type="text" />
                <CInputGroupAppend>
                  <CButton color="secondary">
                    <CIcon name="cil-search" />
                  </CButton>
                </CInputGroupAppend>
              </CInputGroup>
            </div>
            <NewChatList />
          </div>
          <div className="chat-content">
            <div className="chat-content-header">
              <div className="chat-group-title">Nico Robin</div>
              <div className="chat-group-actions">
                <CIcon name="cil-options" />
              </div>
            </div>
            <div ref={scrollRef} onScroll={onScroll} className="chat-content-message-list">
              <NewMessageList scrollF={scrollFixed} reachTop={reachTop} />
            </div>
            <div className="chat-content-footer">
              <div className="input-container">
                <CInput class="input-field" type="text" />
                <div className="input-actions-group">
                  <CIcon name="cil-paperclip" />
                  <CIcon name="cil-image-plus" />
                  <div className="send-button">
                    <CIcon name="cil-send" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> : null
      }

    </div>
  );
}

export default ChatPage;
