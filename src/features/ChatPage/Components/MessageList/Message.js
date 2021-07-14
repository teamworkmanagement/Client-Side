import React from "react";
import "./Message.scss";
import { CTooltip } from "@coreui/react";
import moment from "moment";
import { saveAs } from 'file-saver';

function Message({ item, index }) {
  const downLoad = () => {
    saveAs(item.message, item.message.split("/").pop());
  }
  const renderMes = () => {
    switch (item.messageType) {
      case "file":
        return <strong onClick={downLoad} className="message-file">{item.message.split("/").pop()}</strong>;
      case "image":
        return (
          <img
            alt=""
            style={{ width: "30%", height: "30%" }}
            src={item.message}
          ></img>
        );
      default:
        return <div className="message-text">{item.message}</div>;
    }
  };
  return (
    <div className="message">
      {item.isLabel ? (
        <div className="message-label">{item.message}</div>
      ) : (
        <div
          key={item.messageId}
          animationDelay={index + 2}
          className={`message-item-container ${item.class ? item.class : ""} ${item.isMine ? "mine" : ""
            } `}
        >
          <img className="avatar" alt="" src={item.messengerUserAvatar} />

          <div className="message-content">
            <CTooltip
              className="my-tooltip"
              content={moment(item.time).format("DD/MM/YYYY hh:mma")}
              placement={item.isMine ? "left" : "right"}
            >
              {renderMes()}
            </CTooltip>
            <div className="message-time">
              {moment(item.time).format("DD/MM/YYYY hh:mma")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
