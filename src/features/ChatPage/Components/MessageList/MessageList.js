import React from "react";
import PropTypes from "prop-types";
import "./MessageList.scss";
import { CTooltip } from "@coreui/react";

MessageList.propTypes = {};

function MessageList(props) {
  const messageList = [
    {
      id: "",
      message:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
      class: "normal",
      isMine: false,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
    {
      id: "",
      message: "02/03/2021 3:45pm",
      class: "",
      isMine: false,
      time: "",
      isLabel: true,
    },
    {
      id: "",
      message:
        "Various versions have evolved over the years, sometimes by accident",
      class: "start",
      isMine: false,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
    {
      id: "",
      message: "OK?",
      class: "middle",
      isMine: false,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
    {
      id: "",
      message:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
      class: "end",
      isMine: false,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },

    {
      id: "",
      message:
        " This book is a treatise on the theory of ethics, very popular during the Renaissance.",
      class: "normal",
      isMine: true,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
    {
      id: "",
      message: "02/03/2021 3:45pm",
      class: "",
      isMine: false,
      time: "",
      isLabel: true,
    },
    {
      id: "",
      message: "words, consectetur, from a Lorem",
      class: "start",
      isMine: true,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
    {
      id: "",
      message: "you need to be sure there isn't anything embarrassing",
      class: "middle",
      isMine: true,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },

    {
      id: "",
      message:
        "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words",
      class: "end",
      isMine: true,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
    {
      id: "",
      message: "02/03/2021 3:45pm",
      class: "",
      isMine: false,
      time: "",
      isLabel: true,
    },
    {
      id: "",
      message: "OK?",
      class: "normal",
      isMine: false,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
    {
      id: "",
      message: "start",
      class: "start",
      isMine: true,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
    {
      id: "",
      message: "end",
      class: "end",
      isMine: true,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
    {
      id: "",
      message: "OK?",
      class: "normal",
      isMine: false,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
    {
      id: "",
      message: "02/03/2021 3:45pm",
      class: "",
      isMine: false,
      time: "",
      isLabel: true,
    },
    {
      id: "",
      message: "My Normal",
      class: "normal",
      isMine: true,
      time: "02/03/2021 3:45pm",
      isLabel: false,
    },
  ];
  return (
    <div>
      {messageList.map((item, index) => {
        return item.isLabel ? (
          <div className="message-label">{item.message}</div>
        ) : (
          <div
            key={index}
            animationDelay={index + 2}
            className={`message-item-container ${
              item.class ? item.class : ""
            } ${item.isMine ? "mine" : ""} `}
          >
            <img
              className="avatar"
              alt=""
              src="http://emilus.themenate.net/img/avatars/thumb-2.jpg"
            />

            <div className="message-content">
              <CTooltip
                className="my-tooltip"
                content={item.time}
                placement={item.isMine ? "left" : "right"}
              >
                <div className="message-text">{item.message}</div>
              </CTooltip>
              <div className="message-time">{item.time}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
