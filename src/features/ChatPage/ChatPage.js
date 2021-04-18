import React from "react";
import PropTypes from "prop-types";
import "./ChatPage.scss";
import { CButton, CInput, CInputGroup, CInputGroupAppend } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import NewChatList from "./Components/ChatList/ChatList";
import NewMessageList from "./Components/MessageList/MessageList";

ChatPage.propTypes = {};

function ChatPage(props) {
  return (
    <div className="chat-page-container">
      <div className="chat-main-content">
        {!props.isInTeam && (
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
        )}
        <div className="chat-content">
          {!props.isInTeam && (
            <div className="chat-content-header">
              <div className="chat-group-title">Nico Robin</div>
              <div className="chat-group-actions">
                <CIcon name="cil-options" />
              </div>
            </div>
          )}

          <div className="chat-content-message-list">
            <NewMessageList />
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
      </div>
    </div>
  );
}

export default ChatPage;
