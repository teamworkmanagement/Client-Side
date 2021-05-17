import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./ChatPage.scss";
import { CButton, CInput, CInputGroup, CInputGroupAppend } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChatList from "./Components/ChatList/ChatList";
import MessageList from "./Components/MessageList/MessageList";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupChatForUser, setLoadDone } from "./chatSlice";
import { v4 as uuidv4 } from "uuid";
import { myBucket } from "src/utils/aws/config";
import firebaseConfig from "src/utils/firebase/firebaseConfig";

ChatPage.propTypes = {};

function ChatPage(props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.currentUser.id);
  const loadDone = useSelector((state) => state.chat.loadDone);
  const [reachTop, setReachTop] = useState(0);
  const grChats = useSelector((state) => state.chat.groupChat);
  const currentGroup = useSelector((state) => state.chat.currentGroup);
  const group = grChats.find((x) => x.groupChatId === currentGroup);
  const user = useSelector((state) => state.auth.currentUser);
  const [msg, setMsg] = useState("");
  const [send, setSend] = useState(null);
  const [reachBot, setReachBot] = useState(true);
  const scrollRef = useRef(null);
  const messagesEndRef = useRef(null);
  const imgPickerRef = useRef(null);
  const filePickerRef = useRef(null);

  useEffect(() => {
    dispatch(getAllGroupChatForUser(userId));
    return function release() {
      dispatch(setLoadDone(false));
    };
  }, []);

  const onScroll = (e) => {
    const element = e.target;
    if (element.scrollTop === 0) {
      setReachTop(reachTop + 1);
    }
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 2) {
      setReachBot(true);
    } else setReachBot(false);
  };

  const scrollFixed = (scrollDistance) => {
    scrollRef.current.scrollTo(0, scrollDistance);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (msg === "") return;

      const chatMessage = {
        userName: user.fullName,
        message: msg,
        userId: user.id,
        groupId: currentGroup,
        timeSend: Date.now(),
      };
      setSend({
        mesObj: chatMessage,
      });
      setMsg("");
    }
  };

  const sendMessage = () => {
    if (msg === "") return;

    const chatMessage = {
      userName: user.fullName,
      message: msg,
      userId: user.id,
      groupId: currentGroup,
      timeSend: Date.now(),
    };
    setSend({
      mesObj: chatMessage,
    });
    setMsg("");
  };

  const scrollToBottom = () => {
    //messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollRef.current?.scrollTo(0, 10000);
    //objDiv.scrollTop = objDiv.scrollHeight;
  };

  //load tin nhan
  useEffect(() => {
    // if (scrollRef.current) {
    //   scrollRef.current.scrollTop =
    //     scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    // }
  }, [props.tabActiveTeam]);

  const onPickFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size / 1024 / 1024 >= 30) {
        return;
      }

      const folder = uuidv4();
      const params = {
        Body: file,
        Bucket: "teamappstorage",
        Key: `${folder}/${file.name}`,
      };

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          let pro = Math.round((evt.loaded / evt.total) * 100);
          if (pro >= 100) {
            const chatMessage = {
              userName: user.fullName,
              message: `https://teamappstorage.s3-ap-southeast-1.amazonaws.com/${folder}/${file.name}`,
              userId: user.id,
              groupId: currentGroup,
              timeSend: Date.now(),
              messageType: "file",
            };

            setSend({
              mesObj: chatMessage,
            });
          }
        })
        .send((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  };

  const onPickImage = (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseConfig.storage().ref();
    const fileRef = storageRef.child(`${uuidv4()}/${file.name}`);
    fileRef.put(file).then((data) => {
      console.log("Uploaded a file");
      data.ref.getDownloadURL().then((url) => {
        console.log(url);
        const chatMessage = {
          userName: user.fullName,
          message: url,
          userId: user.id,
          groupId: currentGroup,
          timeSend: Date.now(),
          messageType: "image",
        };

        setSend({
          mesObj: chatMessage,
        });
      });
    });
  };

  return (
    <div className="chat-page-container">
      {loadDone ? (
        <div className="chat-main-content">
          {!props.isInTeam && (
            <div className="chat-list">
              <div className="chat-list-header">
                <CInputGroup className="chat-list-search">
                  <CInput
                    placeholder="...tìm kiếm đoạn chat"
                    id="appendedInputButton"
                    type="text"
                  />
                  <CInputGroupAppend>
                    <CButton color="secondary">
                      <CIcon name="cil-search" />
                    </CButton>
                  </CInputGroupAppend>
                </CInputGroup>
              </div>
              <ChatList />
            </div>
          )}
          <div className="chat-content">
            {!props.isInTeam && (
              <div className="chat-content-header">
                <div className="chat-group-title">{group?.groupChatName}</div>
                <div className="chat-group-actions">
                  <CIcon name="cil-options" />
                </div>
              </div>
            )}

            <div
              ref={scrollRef}
              onScroll={onScroll}
              className="chat-content-message-list"
            >
              <MessageList
                reachBot={reachBot}
                reachTop={reachTop}
                sendMes={send}
                scrollFix={scrollFixed}
                scrollToBottom={scrollToBottom}
              />
              <div className="message-list-bottom-view" ref={messagesEndRef} />
            </div>
            <div className="chat-content-footer">
              <div className="input-container">
                <CInput
                  value={msg}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setMsg(e.target.value)}
                  class="input-field"
                  type="text"
                />
                <div className="input-actions-group">
                  <CIcon
                    name="cil-paperclip"
                    onClick={() => {
                      filePickerRef.current.click();
                    }}
                  />
                  <input
                    onChange={onPickFile}
                    ref={filePickerRef}
                    type="file"
                    style={{ display: "none" }}
                  />
                  <CIcon
                    name="cil-image-plus"
                    onClick={() => {
                      imgPickerRef.current.click();
                    }}
                  />
                  <input
                    accept="image/*"
                    onChange={onPickImage}
                    ref={imgPickerRef}
                    type="file"
                    style={{ display: "none" }}
                  />
                  <div className="send-button">
                    <CIcon name="cil-send" onClick={sendMessage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ChatPage;
