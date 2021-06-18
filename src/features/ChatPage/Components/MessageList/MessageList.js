import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { CTooltip } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import messageApi from "src/api/messageApi";
import {
  changeGroupPosition,
  setCurrentGroup,
  setIsSelected,
  setReceiveMes,
} from "../../chatSlice";
import chatApi from "src/api/chatApi";
import { useParams } from "react-router";
import "./MessageList.scss";
import CIcon from "@coreui/icons-react";
import Message from "./Message.js";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { VscSearchStop } from "react-icons/vsc";
import { AiOutlineMessage } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import Loading from "src/shared_components/MySharedComponents/Loading/Loading";
import "./MessageList.scss";
MessageList.propTypes = {};

function MessageList(props) {
  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => state.chat.currentGroup);
  const userId = useSelector((state) => state.auth.currentUser.id);
  const isSelected = useSelector((state) => state.chat.isSelected); //chuyeenr nhom chat
  const toolTipOptions = {};
  const [listMes, setListMes] = useState([]);
  const [test, setTest] = useState(0);
  const messagesEndRef = useRef(null);
  const latestChat = useRef(null);
  const newMessage = useSelector((state) => state.chat.newMessage);
  const { teamId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  latestChat.current = listMes;

  const scrollToBottom = () => {
    //messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (props.scrollToBottom) {
      props.scrollToBottom();
    }
  };

  //load tin nhan
  useEffect(() => {
    setIsLoading(true);
    async function getMessage() {
      let skipItems = 0;
      for (let i = 0; i < listMes.length; i++) {
        if (!listMes[i].isLabel) {
          skipItems++;
        }
      }
      //debugger;
      console.log("1st time: ", props.reachTop);

      if (isSelected) {
        dispatch(setIsSelected(false));
        setListMes([]);
        skipItems = 0;
      }
      const params = {
        GroupId: teamId ? teamId : currentGroup,
        SkipItems: skipItems,
        PageSize: 12,
      };
      const outPut = await messageApi.getPagination({ params });
      if (outPut.data?.items.length === 0) {
        setIsLoading(false);
        return;
      }

      const newArray = outPut.data?.items.map((mes) => {
        return {
          id: mes.messageId,
          message: mes.messageContent,
          class: "normal",
          isMine: mes.messageUserId === userId ? true : false,
          time: mes.messageCreatedAt,
          isLabel: false,
          messageType: mes.messageType,
          messengerUserAvatar: mes.messengerUserAvatar,
        };
      });
      const arrayWithLabels = [];
      if (newArray) {
        //Thêm label cách cho list mess

        for (let i = 0; i < newArray.length - 1; i++) {
          if (i === 0) {
            arrayWithLabels.push({
              id: 1 + Math.random() * (100000 - 1),
              message: moment(newArray[i].time).format("LLL"),
              class: "",
              isLabel: true,
            });
            arrayWithLabels.push(newArray[i]);
            continue;
          }
          arrayWithLabels.push(newArray[i]);
          const date1 = newArray[i].time;
          const date2 = newArray[i + 1].time;
          if ((new Date(date2) - new Date(date1)) / 60000 > 5) {
            arrayWithLabels.push({
              id: 1 + Math.random() * (10000 - 1),
              message: moment(date2).format("LLL"),
              class: "",
              isLabel: true,
            });
          }
        }
        if (newArray.length === 1) {
          arrayWithLabels.push({
            id: 1 + Math.random() * (100000 - 1),
            message: moment(newArray[0].time).format("LLL"),
            class: "",
            isLabel: true,
          });
          arrayWithLabels.push(newArray[0]);
        } else {
          arrayWithLabels.push(newArray[newArray.length - 1]);
        }
        //thêm class cho từng message
        for (let i = 0; i < arrayWithLabels.length; i++) {
          if (arrayWithLabels[i].isLabel) continue;

          if (arrayWithLabels[i].isMine) {
            if (i === arrayWithLabels.length - 1) {
              //phần tử cuối
              if (
                arrayWithLabels[i - 1].isLabel ||
                !arrayWithLabels[i - 1].isMine
              ) {
                arrayWithLabels[i].class = "normal";
              } else {
                if (arrayWithLabels[i - 1].class === "end") {
                  arrayWithLabels[i].class = "normal";
                } else {
                  arrayWithLabels[i].class = "end";
                }
              }

              continue;
            }

            //trường hợp bình thường
            if (
              arrayWithLabels[i - 1].isLabel ||
              !arrayWithLabels[i - 1].isMine
            ) {
              if (
                arrayWithLabels[i + 1].isLabel ||
                !arrayWithLabels[i + 1].isMine
              ) {
                arrayWithLabels[i].class = "normal";
              } else {
                arrayWithLabels[i].class = "start";
              }
            } else {
              if (
                arrayWithLabels[i + 1].isLabel ||
                !arrayWithLabels[i + 1].isMine
              ) {
                arrayWithLabels[i].class = "end";
              } else {
                arrayWithLabels[i].class = "middle";
              }
            }
          } else {
            if (i === arrayWithLabels.length - 1) {
              //phần tử cuối
              if (
                arrayWithLabels[i - 1].isLabel ||
                arrayWithLabels[i - 1].isMine
              ) {
                arrayWithLabels[i].class = "normal";
              } else {
                if (arrayWithLabels[i - 1].class === "end") {
                  arrayWithLabels[i].class = "normal";
                } else {
                  arrayWithLabels[i].class = "end";
                }
              }

              continue;
            }

            //trường hợp bình thường
            if (
              arrayWithLabels[i - 1].isLabel ||
              arrayWithLabels[i - 1].isMine
            ) {
              if (
                arrayWithLabels[i + 1].isLabel ||
                arrayWithLabels[i + 1].isMine
              ) {
                arrayWithLabels[i].class = "normal";
              } else {
                arrayWithLabels[i].class = "start";
              }
            } else {
              if (
                arrayWithLabels[i + 1].isLabel ||
                arrayWithLabels[i + 1].isMine
              ) {
                arrayWithLabels[i].class = "end";
              } else {
                arrayWithLabels[i].class = "middle";
              }
            }
          }
        }
      }
      if (skipItems === 0) {
        setListMes(arrayWithLabels);
        setTimeout(() => {
          scrollToBottom();
        }, 0);
      } else {
        const newArray1 = arrayWithLabels.concat([...latestChat.current]);
        setListMes(newArray1);

        props.scrollFix(calculateDistanceScroll(arrayWithLabels));
      }
      setIsLoading(false);
    }

    getMessage();

    console.log("currentgr");
  }, [props.reachTop, currentGroup]);

  useEffect(() => {
    console.log(teamId);
    setIsLoading(true);
    if (teamId) {
      setListMes([]);
      dispatch(setCurrentGroup(teamId));
    }
  }, [teamId]);

  function calculateDistanceScroll(newMessages) {
    var result = 0;

    for (let i = 0; i < newMessages.length; i++) {
      switch (newMessages[i].class) {
        case "normal":
          result += 52.8;
          break;
        case "":
          result += 20.8;
          break;
        case "middle":
          result += 40;
          break;
        default:
          result += 46.4;
      }
    }

    return result;
  }

  //receive mes
  useEffect(() => {
    if (newMessage === null) return;

    console.log(newMessage);

    const newMes = {
      message: newMessage.message,
      class: "normal",
      isMine: newMessage.userId === userId ? true : false,
      time: newMessage.timeSend,
      isLabel: false,
      messageType: newMessage.messageType,
    };

    const messageObj = { ...newMessage };
    if (newMessage.groupId !== currentGroup) {
      messageObj.newMessage = true;
      dispatch(setReceiveMes(messageObj));
      return;
    }

    const cloneList = [...latestChat.current];
    setListMes(cloneList.concat(newMes));
    if (cloneList.length > 0 && !cloneList[cloneList.length - 1].isMine) {
      const date1 = cloneList[cloneList.length - 1].time;
      const date2 = newMes.time;
      if ((new Date(date2) - new Date(date1)) / 60000 > 5) {
        cloneList.push({
          id: 1 + Math.random() * (10000 - 1),
          message: moment(date2).format("LLL"),
          class: "",
          isLabel: true,
        });
        newMes.class = "normal";
      } else {
        if (cloneList[cloneList.length - 1].class === "end") {
          cloneList[cloneList.length - 1].class = "middle";
        } else {
          cloneList[cloneList.length - 1].class = "start";
        }

        newMes.class = "end";
      }
    }
    cloneList.push(newMes);
    setListMes(cloneList);

    // const timeOut = setTimeout(() => {
    //   if (props.reachBot) scrollToBottom();
    // }, 1);
    const timeOut = setTimeout(() => {
      if (props.reachBot) scrollToBottom();
    }, 0);

    return () => {
      clearTimeout(timeOut);
    };
  }, [newMessage]);

  //send mes
  useEffect(() => {
    console.log(props.sendMes);
    if (props.sendMes === null) return;

    chatApi
      .sendMes(props.sendMes.mesObj)
      .then((res) => {})
      .catch((err) => {});
  }, [props.sendMes]);

  const render = () => {
    return (
      <div>
        {listMes.map((item, index) => {
          return <Message item={item} key={item.messageId} index={index} />;
        })}
        <div ref={messagesEndRef} />
      </div>
    );
  };
  return (
    <div className="message-list">
      {listMes.length === 0 && !isLoading && (
        <div className="nodata-image">
          <div className="icon-group">
            <BiMessageDetail className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">Chưa có tin nhắn nào trong đoạn chat</div>
        </div>
      )}
      {isLoading && <Loading />}
      {listMes.length > 0 && render()}
    </div>
  );
}

export default MessageList;
