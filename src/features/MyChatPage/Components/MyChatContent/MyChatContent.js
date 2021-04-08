import React from "react";
import PropTypes from "prop-types";
import "./MyChatContent.scss";
import CIcon from "@coreui/icons-react";
import { CInput } from "@coreui/react";
import MessageList from "./Components/MessageList/MessageList";

MyChatContent.propTypes = {};

function MyChatContent(props) {
  return (
    <div className="chat-content-container">
      <div className="chat-content-header">
        <div className="user-infor">
          <img
            alt=""
            className="avatar"
            src="https://i.pinimg.com/originals/8a/56/c8/8a56c8fb5f78bd6cff84cbb999809e05.jpg"
          />
          <div classname="chat-name">Nico Robin</div>
        </div>
        <div className="chat-infor">
          <CIcon name="cil-group" />
          <div className="member-count">2</div>
          <div className="vertical-divider"></div>
          <div className="last-message-time">6 giờ</div>
        </div>
      </div>
      <div className="message-list">
        <MessageList />
      </div>
      <div className="chat-content-footer">
        <div className="attach-file-btn">
          <CIcon name="cil-paperclip" />
        </div>
        <div className="attach-image-btn">
          <CIcon name="cil-image-plus" />
        </div>

        <CInput
          autoComplete="off"
          id="name"
          placeholder="Enter your name"
          required
        />
        <div className="send-btn">
          <CIcon name="cil-send" />
        </div>
      </div>
    </div>
  );
}

export default MyChatContent;
