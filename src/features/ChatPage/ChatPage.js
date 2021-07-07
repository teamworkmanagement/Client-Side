import React, { useEffect, useRef, useState } from "react";
import "./ChatPage.scss";
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CInputGroup,
  CInputGroupAppend,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChatList from "./Components/ChatList/ChatList";
import MessageList from "./Components/MessageList/MessageList";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupChatForUser,
  searchGroupChatForUser,
  setCurrentGroup,
  setLoadDone,
} from "./chatSlice";
import { myBucket } from "src/utils/aws/config";
import firebaseConfig from "src/utils/firebase/firebaseConfig";
import { useLocation } from "react-router";
import queryString from "query-string";
import AddMembers from "./Components/AddMembers/CreateNewConversation/AddMembers";
import { BsSearch } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CreateChatInChatPage from "./Components/CreateNewConversation/CreateChatInChatPage";
import { changeStateChatListSidebar } from "src/appSlice";
import Loading from "src/shared_components/MySharedComponents/Loading/Loading";
import chatApi from "src/api/chatApi";
import uuid from "src/utils/file/uuid";
import { useParams } from "react-router-dom";

function ChatPage(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const userId = useSelector((state) => state.auth.currentUser.id);
  const loadDone = useSelector((state) => state.chat.loadDone);
  const [reachTop, setReachTop] = useState(0);
  const grChats = useSelector((state) => state.chat.groupChat);
  const currentGroup = useSelector((state) => state.chat.currentGroup);

  const user = useSelector((state) => state.auth.currentUser);
  const [msg, setMsg] = useState("");
  const [send, setSend] = useState(null);
  const [reachBot, setReachBot] = useState(true);
  const [showAddMembers, setShowAddMembers] = useState(false);

  const [showAddConversation, setShowAddConversation] = useState(false);

  const scrollRef = useRef(null);
  const messagesEndRef = useRef(null);
  const imgPickerRef = useRef(null);
  const filePickerRef = useRef(null);

  const group = useSelector((state) =>
    state.chat.groupChat.find((x) => x.groupChatId === currentGroup)
  );

  useEffect(() => {
    if (loadDone) {
      if (queryParams) {
        if (queryParams.g) {
          if (queryParams.g !== currentGroup)
            dispatch(setCurrentGroup(queryParams.g));
        }
      }
    }
  }, [loadDone]);

  useEffect(() => {}, [currentGroup]);

  const { teamId } = useParams();
  useEffect(() => {
    const params = {
      userId: userId,
      currentGroup: queryParams?.g ? queryParams.g : teamId ? teamId : null,
    };
    dispatch(getGroupChatForUser({ params }));
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

      const folder = uuid();
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
    const fileRef = storageRef.child(`${uuid()}/${file.name}`);
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

  const onSearchChange = (e) => {
    console.log(e.target.value);
    const params = {
      userId: user.id,
      isSearch: true,
      keyWord: e.target.value,
    };
    dispatch(searchGroupChatForUser({ params }));
  };

  const onClose = () => {
    setShowAddConversation(false);
  };
  const toggleChatListSidebar = () => {
    dispatch(
      changeStateChatListSidebar({
        type: "chatlistsidebar",
        chatListSidebarShow: true,
      })
    );
  };

  const triggerAddConversation = useSelector(
    (state) => state.chat.triggerAddConversation
  );
  useEffect(() => {
    if (triggerAddConversation !== 0) setShowAddConversation(true);
  }, [triggerAddConversation]);

  const imgAvatarPickerRef = useRef(null);
  const onPickAvatarImage = (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseConfig.storage().ref();
    const fileRef = storageRef.child(`${uuid()}/${file.name}`);
    fileRef.put(file).then((data) => {
      console.log("Uploaded a file");
      data.ref.getDownloadURL().then((url) => {
        console.log(url);
        const payload = {
          groupChatId: group.groupChatId,
          imageUrl: url,
        };

        chatApi
          .changeGroupChatImageUrl(payload)
          .then((res) => {
            //dispatch(updateGroupChatImage(payload));
          })
          .catch((err) => {});
      });
    });
  };

  const onOpenPickAvatarImage = () => {
    console.log("update");
    imgAvatarPickerRef.current.click();
  };

  const onAddMembers = () => {
    setShowAddMembers(true);
  };

  return (
    <div className="chat-page-container">
      <div className="chat-page-content">
        {!props.isInTeam && (
          <div className="toggle-chat-list-sidebar-btn">
            <CIcon
              //className="ml-md-3 d-md-none toggle-chat-list-sidebar-icon"
              className="ml-md-3 d-sm-down-block  d-md-none toggle-chat-list-sidebar-icon"
              onClick={toggleChatListSidebar}
              name="cil-menu"
            />
          </div>
        )}

        <div className="chat-main-content">
          {!props.isInTeam && (
            <div className="chat-list d-sm-down-none">
              <div className="chat-list-header">
                <CInputGroup className="chat-list-search">
                  <CInput
                    placeholder="Tìm đoạn chat..."
                    id="appendedInputButton"
                    type="text"
                    onChange={onSearchChange}
                  />
                  <CInputGroupAppend>
                    <CButton color="secondary">
                      <BsSearch className="icon-search" />
                    </CButton>
                  </CInputGroupAppend>
                </CInputGroup>
              </div>
              {/* <Loading /> */}
              {loadDone ? <ChatList /> : <Loading />}
              <div
                onClick={() => setShowAddConversation(true)}
                className="btn-add-chat"
              >
                <CIcon name="cil-plus" />
                Tạo nhóm Chat mới
              </div>
            </div>
          )}
          <div className="chat-content">
            {!props.isInTeam && group && (
              <div className="chat-content-header">
                <div className="chat-group-title">
                  <img alt="" src={group?.groupAvatar} />
                  {group?.groupChatName}
                </div>
                <div className="chat-group-actions">
                  <input
                    accept="image/*"
                    onChange={onPickAvatarImage}
                    ref={imgAvatarPickerRef}
                    type="file"
                    style={{ display: "none" }}
                  />
                  <div className="chat-header-actions-dropdown">
                    <CDropdown>
                      <CDropdownToggle id="dropdownMenuButton" caret>
                        <div className="options">
                          <CIcon name="cil-options" />
                        </div>
                      </CDropdownToggle>
                      <CDropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        placement="bottom-end"
                      >
                        <CDropdownItem
                          className="first"
                          onClick={() => onOpenPickAvatarImage()}
                        >
                          <div className="info-icon-group">
                            <AiOutlineInfoCircle className="icon-info-chat" />
                          </div>
                          Đổi avatar
                        </CDropdownItem>
                        {!group.isOfTeam && (
                          <CDropdownItem
                            onClick={onAddMembers}
                            className="last"
                          >
                            <CIcon
                              name="cil-user-follow"
                              className="icon-delete"
                            />
                            Thêm thành viên
                          </CDropdownItem>
                        )}
                      </CDropdownMenu>
                    </CDropdown>
                  </div>
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
              <CInput
                value={msg}
                onKeyDown={handleKeyDown}
                onChange={(e) => setMsg(e.target.value)}
                className="message-input-field"
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

      <CreateChatInChatPage
        onCLoseModal={onClose}
        showAddConversation={showAddConversation}
      />
      <AddMembers
        onCLoseModal={() => setShowAddMembers(false)}
        showAddMembers={showAddMembers}
      />
    </div>
  );
}

export default ChatPage;
