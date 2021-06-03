import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarNav,
  CSidebarNavItem,
  CNavItem,
  CNavLink,
  CInputGroup,
  CInput,
  CInputGroupAppend,
  CButton,
} from "@coreui/react";
import "./ChatListSideBar.scss";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import { changeStateChatListSidebar } from "src/appSlice";
import { BsSearch } from "react-icons/bs";
import ChatList from "src/features/ChatPage/Components/ChatList/ChatList";
import { searchGroupChatForUser } from "src/features/ChatPage/chatSlice";

const ChatListSideBar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.chatListSidebarShow);
  const user = useSelector((state) => state.auth.currentUser);
  const [showAddConversation, setShowAddConversation] = useState(false);
  const onChange = (val) => {
    const param = { type: "chatlistsidebar", chatListSidebarShow: val };
    const action = changeStateChatListSidebar(param);
    dispatch(action);
  };
  const chatImages = [
    "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/95384801_3541411182540556_323501399205740544_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=PNRMG3JZivEAX8fDiPY&_nc_ht=scontent.fsgn5-3.fna&oh=f9d490f5d7f7a1b81999da2845b80923&oe=609FA0C7",
    "https://i.ytimg.com/vi/u2ypkUBGEHI/maxresdefault.jpg",
    "https://scontent-sin6-3.xx.fbcdn.net/v/t1.6435-9/70944423_1289407744573535_1300646982062178304_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=825194&_nc_ohc=30N8un2vPewAX8QcAkk&_nc_ht=scontent-sin6-3.xx&oh=5ece776d1f0b830ca2f8e106d6452719&oe=609EBA21",
    "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
    "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
    "https://tse4.mm.bing.net/th?id=OIP.8InIv1pjxNACiiPqRmnDWQHaE8&pid=Api&P=0&w=264&h=177",
  ];
  const onSearchChange = (e) => {
    console.log(e.target.value);
    const params = {
      userId: user.id,
      isSearch: true,
      keyWord: e.target.value,
    };
    dispatch(searchGroupChatForUser({ params }));
  };
  return (
    <CSidebar
      className="d-sm-down-block d-md-none sidebar-chat-list"
      show={show}
      onShowChange={onChange}
    >
      <div className="chat-list">
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
        <ChatList chatImages={chatImages} />
        <div
          //onClick={() => setShowAddConversation(true)}
          className="btn-add-chat"
        >
          <CIcon name="cil-plus" />
          Tạo nhóm Chat mới
        </div>
      </div>
    </CSidebar>
  );
};

export default React.memo(ChatListSideBar);
