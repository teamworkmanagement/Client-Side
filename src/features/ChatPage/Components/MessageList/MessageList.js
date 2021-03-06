import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import messageApi from "src/api/messageApi";
import {
  setCurrentGroup,
  setIsSelected,
  setNewMessage,
  setReceiveMes,
} from "../../chatSlice";
import chatApi from "src/api/chatApi";
import { useParams } from "react-router";
import "./MessageList.scss";
import Message from "./Message.js";
import { VscSearchStop } from "react-icons/vsc";
import { BiMessageDetail } from "react-icons/bi";
import Loading from "src/shared_components/MySharedComponents/Loading/Loading";
import "./MessageList.scss";
import { toast } from "react-toastify";
import CustomToast from "src/shared_components/MySharedComponents/CustomToast/CustomToast";

function MessageList(props) {
  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => state.chat.currentGroup);
  const userId = useSelector((state) => state.auth.currentUser.id);
  const isSelected = useSelector((state) => state.chat.isSelected); //chuyeenr nhom chat

  const [listMes, setListMes] = useState([]);
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
          mesUserId: mes.messageUserId,
        };
      });
      const arrayWithLabels = [];
      if (newArray) {
        //Th??m label c??ch cho list mess

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
        //th??m class cho t???ng message
        for (let i = 0; i < arrayWithLabels.length; i++) {
          if (arrayWithLabels[i].isLabel) continue;

          if (arrayWithLabels[i].isMine) {
            if (i === arrayWithLabels.length - 1) {
              //ph???n t??? cu???i
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

            //tr?????ng h???p b??nh th?????ng
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
              //ph???n t??? cu???i
              if (
                arrayWithLabels[i - 1].isLabel ||
                arrayWithLabels[i - 1].isMine
              ) {
                arrayWithLabels[i].class = "normal";
              } else {
                if (
                  arrayWithLabels[i].mesUserId !==
                  arrayWithLabels[i - 1].mesUserId
                ) {
                  //th???ng ??? tr??n l?? c???a user kh??c g???i
                  arrayWithLabels[i].class = "normal";
                } else {
                  if (arrayWithLabels[i - 1].class === "end") {
                    arrayWithLabels[i].class = "normal";
                  } else {
                    arrayWithLabels[i].class = "end";
                  }
                }
              }

              continue;
            }

            //tr?????ng h???p b??nh th?????ng
            if (
              arrayWithLabels[i - 1].isLabel ||
              arrayWithLabels[i - 1].isMine
            ) {
              // l?? c???a t??i
              if (
                arrayWithLabels[i + 1].isLabel ||
                arrayWithLabels[i + 1].isMine
              ) {
                arrayWithLabels[i].class = "normal";
              } else {
                arrayWithLabels[i].class = "start";
              }
            } else {
              //kh??ng l?? c???a t??i
              if (
                arrayWithLabels[i].mesUserId !==
                arrayWithLabels[i - 1].mesUserId
              ) {
                //th???ng ??? tr??n l?? c???a user kh??c g???i
                arrayWithLabels[i].class = "normal";
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
      messengerUserAvatar: newMessage.userAvatar,
      mesUserId: newMessage.userId,
    };
    const messageObj = { ...newMessage };
    dispatch(setReceiveMes(messageObj));
    dispatch(setNewMessage(null));

    if (newMessage.groupId !== currentGroup) {
      return;
    }
    const cloneList = [...latestChat.current];

    //add label n???u c??ch th???i gian h??n 5 ph??t
    if (cloneList.length > 0) {
      const date1 = cloneList[cloneList.length - 1].time;
      const date2 = newMes.time;
      var newLabel = null;
      if ((new Date(date2) - new Date(date1)) / 60000 > 5) {
        newLabel = {
          id: 1 + Math.random() * (10000 - 1),
          message: moment(date2).format("LLL"),
          class: "",
          isLabel: true,
        };
      } else {
        //ch??a qu?? 5 ph??t, new mes ph???i ???????c check class

        if (cloneList[cloneList.length - 1].isMine === newMes.isMine) {
          if (cloneList[cloneList.length - 1].mesUserId !== newMes.mesUserId) {
            //kh??c user g???i

            newMes.class = "normal";
          } else {
            if (cloneList[cloneList.length - 1].class === "end") {
              //mes cu???i lu??n ch??? c?? 2 class: end/normal
              cloneList[cloneList.length - 1].class = "middle";
            } else {
              cloneList[cloneList.length - 1].class = "start";
            }

            newMes.class = "end";
          }
        }
      }

      if (newLabel) {
        cloneList.push(newLabel);
      }
    }

    cloneList.push(newMes);
    setListMes(cloneList);

    console.log(props.reachBot);
    const timeOut = setTimeout(() => {
      console.log(props.reachBot);
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
      .then((res) => { })
      .catch((err) => {
        toast(
          <CustomToast
            type="error"
            title="L???i"
            message="???? c?? l???i x???y ra"
          />
        );
      });
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

          <div className="noti-infor">Ch??a c?? tin nh???n n??o trong ??o???n chat</div>
        </div>
      )}
      {isLoading && <Loading />}
      {listMes.length > 0 && render()}
    </div>
  );
}

export default MessageList;
