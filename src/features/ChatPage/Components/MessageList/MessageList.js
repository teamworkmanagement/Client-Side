import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./MessageList.scss";
import { useDispatch, useSelector } from "react-redux";
import messageApi from "src/api/messageApi";
import { sendMes, setGroupIt, setIsSelected, setReceiveMes } from "src/features/ChatPage/chatSlice";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useHistory } from "react-router";
import { refreshTokenFunc } from "src/utils/auth";
import axiosClient from "src/api/axiosClient";
import { CTooltip } from "@coreui/react";

MessageList.propTypes = {};

function MessageList(props) {
  const history = useHistory();
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

  const dispatch = useDispatch();
  const currentGroup = useSelector(state => state.chat.currentGroup);
  const userId = useSelector(state => state.auth.currentUser.id);
  const isSelected = useSelector(state => state.chat.isSelected);//chuyeenr nhom chat
  const toolTipOptions = {};
  const [listMes, setListMes] = useState([]);
  const [test, setTest] = useState(0);
  const [trigger, setTrigger] = useState(0);//refresh token signalr
  const messagesEndRef = useRef(null);
  const groupRef = useRef(null);
  const [connection, setConnection] = useState(new HubConnectionBuilder()
    .withUrl(`https://localhost:9001/hubchat`)
    .withAutomaticReconnect()
    .build());

  groupRef.current = currentGroup;


  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {

    //setConnection(connect);
    connection.start()
      .then(result => {
        console.log('Đã Connected signalR!');

        connection.on('NhanMessage', message => {
          console.log('nhan tin nhan');
          const newMes = {
            message: message.message,
            class: "normal",
            isMine: false,
            time: message.timeSend,
            isLabel: false,
          }

          console.log(message.groupId, ' ', groupRef.current, ' ', currentGroup);

          const messageObj = { ...message };
          if (message.groupId !== groupRef.current) {

            messageObj.newMessage = true;
            dispatch(setReceiveMes(messageObj));
            return;
          }

          dispatch(setReceiveMes(messageObj));
          const cloneList = [...listMes, newMes];
          setListMes(cloneList);
          scrollToBottom();
        });
      })
      .catch(e => {
        console.log('Connection failed: ', JSON.stringify(e), e.statusCode);
        if (e.statusCode === 401) {
          history.push('/login');
        }

        if (getCookie('TokenExpired') === "true") {
          refreshTokenFunc().then(data => {
            setTrigger(parseInt((trigger + 1).toString()));
          }).catch(err => {
            history.push('/login');
          }).finally(() => {
            document.cookie = 'TokenExpired=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          })
        }
      });

    return () => {
      connection.stop();
    }
  }, [trigger])


  useEffect(() => {
    async function getMessage() {
      let skipItems = listMes.length;
      if (isSelected) {
        dispatch(setIsSelected(false));
        skipItems = 0;
      }
      const params = {
        GroupId: currentGroup,
        SkipItems: skipItems,
        PageSize: 8,
      }
      const outPut = await messageApi.getPagination({ params });
      console.log(outPut.data?.items);
      if (outPut.data?.items.length === 0) {
        return;
      }


      const newArray = outPut.data?.items.map(mes => {
        return {
          id: mes.messageId,
          message: mes.messageContent,
          class: "normal",
          isMine: mes.messageUserId === userId ? true : false,
          time: mes.messageCreatedAt,
          isLabel: false,
        }
      });


      if (skipItems === 0) {
        setListMes(newArray);
        scrollToBottom();
      }

      else {
        const newArray1 = newArray.concat([...listMes]);
        setListMes(newArray1);
        props.scrollF();
      }
    }
    getMessage();
  }, [props.reachTop, currentGroup]);

  useEffect(() => {
    if (props.send === null)
      return;

    const newMes = {
      message: props.send.mesObj.message,
      class: "normal",
      isMine: true,
      time: props.send.mesObj.timeSend,
      isLabel: false,
    }

    dispatch(sendMes(props.send.mesObj));
    dispatch(setReceiveMes(props.send.mesObj));

    const cloneList = [...listMes, newMes];
    setListMes(cloneList);
    scrollToBottom();
  }, [props.send]);



  const scrollToBottom = () => {
    //console.log('scrollbot', messagesEndRef.current);
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onClick = () => {
    scrollToBottom();
  }
  return (
    <div>
      <button onClick={onClick}>{test}</button>
      <div>
        {listMes.map((item, index) => {
          return item.isLabel ? (
            <div className="message-label">{item.message}</div>
          ) : (
            <div
              key={index}
              animationdelay={index + 2}
              className={`message-item-container ${item.class ? item.class : ""
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
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
