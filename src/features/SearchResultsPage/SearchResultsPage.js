import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";
import { useSelector } from "react-redux";
import SearchBoardItem from "./Components/SearchBoardItem/SearchBoardItem.js";
import SearchChatItem from "./Components/SearchChatItem/SearchChatItem.js";
import SearchTaskItem from "./Components/SearchTaskItem/SearchTaskItem.js";
import SearchTeamItem from "./Components/SearchTeamItem/SearchTeamItem.js";
import "./SearchResultsPage.scss";

function SearchResultsPage(props) {
  const [mode, setMode] = useState(0); //0:all, 1:team, 2:task, 3: board, 4:groupchat
  const searchGlobalStr = useSelector((state) => state.app.searchGlobalStr); //chuỗi search trên header
  const [currentSearchStr, setCurrentSearchStr] = useState(searchGlobalStr); // chuỗi trên thanh search của trang search

  const taskList = [
    {
      taskName: "Lorem ipsum dolor sit amet",
      taskStatus: "todo",
      taskDescription:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames",
      taskImage:
        "https://diginet.com.vn/wp-content/uploads/2020/10/tai-sao-task-management-lai-quan-trong-voi-doanh-nghiep-1.png",
    },
    {
      taskName: "Vestibulum felis justo",
      taskStatus: "doing",
      taskDescription:
        "Sed hendrerit convallis elit eu pellentesque. Morbi ultricies ante a mi ullamcorper, sit amet vestibulum tellus placerat.",
      taskImage: "",
    },
    {
      taskName: "Donec tempus, dui a posuere ornare",
      taskStatus: "doing",
      taskDescription: "",
      taskImage: "",
    },
    {
      taskName: "Morbi euismod iaculis dui sit amet luctus.",
      taskStatus: "done",
      taskDescription:
        "Phasellus laoreet porttitor mi, at ullamcorper nulla ornare vitae. Donec sit amet consectetur urna.",
      taskImage:
        "https://diginet.com.vn/wp-content/uploads/2020/09/phan-mem-giao-viec-task-management-hien-dai-linh-hoat-2.jpg",
    },
    {
      taskName: "Maecenas varius aliquet magna",
      taskStatus: "todo",
      taskDescription:
        "Donec posuere tortor eu ante lobortis consectetur. In hac habitasse platea dictumst.",
      taskImage:
        "https://isaac.vn/wp-content/uploads/2020/04/quan-ly-bang-excel-1024x769.jpg",
    },
  ];
  const teamList = [
    {
      teamName: "Ut eget orci non quam iaculis",
      teamDescription:
        "Curabitur aliquet neque et tincidunt condimentum. Sed sit amet mi vitae arcu pellentesque rutrum.",
      teamCode: "df87wejh",
      teamImage:
        "https://toggl.com/blog/wp-content/uploads/2018/09/project-task-list.jpg",
    },
    {
      teamName: "Vivamus accumsan aliquet",
      teamDescription:
        "Quisque nisi neque, molestie at urna sed, malesuada viverra eros.",
      teamCode: "23fe343f",
      teamImage: "",
    },
    {
      teamName: "Cras pharetra, nunc eget",
      teamDescription:
        "Maecenas varius aliquet magna, ac egestas dui facilisis eget. Sed eget tellus vitae nisi bibendum vestibulum sit amet id nisl.",
      teamCode: "kyu4f34",
      teamImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h5ifZNQp2l8WTFiiqTsJnFG4q_734HTn1g&usqp=CAU",
    },
  ];
  const boardList = [
    {
      boardName: "Fusce nec tempor nisi",
      boardUserId: "1",
      boardTeamImage: "",
      boardTeamName: "",
    },
    {
      boardName: "Praesent mi ipsum",
      boardUserId: "2",
      boardTeamImage: "",
      boardTeamName: "",
    },
    {
      boardName: "Nunc ac ante et metus",
      boardUserId: "",
      boardTeamImage:
        "https://toggl.com/blog/wp-content/uploads/2018/09/project-task-list.jpg",
      boardTeamName: "Mauris quis posuere leo",
    },
    {
      boardName: "Etiam viverra imperdiet tincidunt",
      boardUserId: "",
      boardTeamImage: "",
      boardTeamName: "Pellentesque semper sapien",
    },
  ];

  const chatList = [
    {
      chatName: "In ac ligula sapien",
      chatImage:
        "https://sandla.org/wp-content/uploads/2020/05/how-to-complete-task-1-ielts-writing-1.png",
      chatIsOfTeam: true,
      chatListMembers: [
        {
          memberName: "Khoa",
          memberAvatar: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
        },
        {
          memberName: "Huy Lê",
          memberAvatar: "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
        },
      ],
    },
    {
      chatName: "Nam leo diam",
      chatImage: "",
      chatIsOfTeam: false,
      chatListMembers: [
        {
          memberName: "Dưa leo",
          memberAvatar: "https://emilus.themenate.net/img/avatars/thumb-4.jpg",
        },
        {
          memberName: "Duy Nguyễn",
          memberAvatar: "",
        },
      ],
    },
    {
      chatName: "Proin dignissim",
      chatImage: "",
      chatIsOfTeam: true,
      chatListMembers: [
        {
          memberName: "Fame",
          memberAvatar: "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
        },
        {
          memberName: "BABE em",
          memberAvatar: "",
        },
        {
          memberName: "Lô CC",
          memberAvatar: "",
        },
      ],
    },
  ];

  function getDropdownText() {
    switch (mode) {
      case 0:
        return "Tất cả";
      case 1:
        return "Nhóm";
      case 2:
        return "Công việc";
      case 3:
        return "Bảng công việc";
      default:
        return "Nhóm nhắn tin";
    }
  }

  useEffect(() => {
    setCurrentSearchStr(searchGlobalStr);
  }, [searchGlobalStr]);

  function handleSearchGlobal() {
    if (!currentSearchStr || currentSearchStr === "") {
      //hiển thị view vui lòng nhập nội dung tìm kiếm
      return;
    }

    //call api search theo currentSearchStr ơ đây
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchGlobal();
    }
  };

  function checkNotFound() {
    if (
      mode === 0 &&
      taskList.length === 0 &&
      chatList.length === 0 &&
      teamList.length === 0 &&
      boardList.length === 0
    ) {
      return true;
    }

    if (mode === 1 && teamList.length === 0) {
      return true;
    }
    if (mode === 2 && taskList.length === 0) {
      return true;
    }
    if (mode === 3 && boardList.length === 0) {
      return true;
    }
    if (mode === 4 && chatList.length === 0) {
      return true;
    }
    return false;
  }

  return (
    <div className="search-results-page">
      <div className="search-page-header">
        <div className="search-input">
          <CInput
            className="input-field"
            placeholder="Tìm kiếm..."
            type="text"
            onKeyDown={handleKeyDown}
            value={currentSearchStr}
            onChange={(e) => setCurrentSearchStr(e.target.value)}
          />
          <BsSearch className="icon-search" />
        </div>

        <div className="mode-group">
          <div className="label">Tìm theo:</div>
          <CDropdown className="mode-dropdown">
            <CDropdownToggle>{getDropdownText()}</CDropdownToggle>
            <CDropdownMenu placement="bottom-end">
              <CDropdownItem
                onClick={() => setMode(0)}
                className={`drop-item drop-item-all ${
                  mode === 0 ? "active" : ""
                }`}
              >
                Tất cả
              </CDropdownItem>
              <CDropdownItem
                onClick={() => setMode(1)}
                className={`drop-item drop-item-team ${
                  mode === 1 ? "active" : ""
                }`}
              >
                Nhóm
              </CDropdownItem>
              <CDropdownItem
                onClick={() => setMode(2)}
                className={`drop-item drop-item-task ${
                  mode === 2 ? "active" : ""
                }`}
              >
                Công việc
              </CDropdownItem>
              <CDropdownItem
                onClick={() => setMode(3)}
                className={`drop-item drop-item-board ${
                  mode === 3 ? "active" : ""
                }`}
              >
                Bảng công việc
              </CDropdownItem>
              <CDropdownItem
                onClick={() => setMode(4)}
                className={`drop-item drop-item-chat ${
                  mode === 4 ? "active" : ""
                }`}
              >
                Nhóm nhắn tin
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <div
            onClick={() => setMode(0)}
            className={`mode-item mode-all ${mode === 0 ? "active" : ""}`}
          >
            Tất cả
          </div>
          <div
            onClick={() => setMode(1)}
            className={`mode-item mode-team ${mode === 1 ? "active" : ""}`}
          >
            Nhóm
          </div>
          <div
            onClick={() => setMode(2)}
            className={`mode-item mode-task ${mode === 2 ? "active" : ""}`}
          >
            Công việc
          </div>
          <div
            onClick={() => setMode(3)}
            className={`mode-item mode-board ${mode === 3 ? "active" : ""}`}
          >
            Bảng công việc
          </div>
          <div
            onClick={() => setMode(4)}
            className={`mode-item mode-chat ${mode === 4 ? "active" : ""}`}
          >
            Nhóm nhắn tin
          </div>
        </div>
      </div>
      {(mode === 0 || mode === 1) && (
        <div className="team-list">
          {teamList.map((team) => {
            return <SearchTeamItem team={team} />;
          })}
        </div>
      )}
      {(mode === 0 || mode === 2) && (
        <div className="task-list">
          {taskList.map((task) => {
            return <SearchTaskItem task={task} />;
          })}
        </div>
      )}
      {(mode === 0 || mode === 3) && (
        <div className="board-list">
          {boardList.map((board) => {
            return <SearchBoardItem board={board} />;
          })}
        </div>
      )}
      {(mode === 0 || mode === 4) && (
        <div className="chat-list">
          {chatList.map((chat) => {
            return <SearchChatItem chat={chat} />;
          })}
        </div>
      )}
      {checkNotFound() && (
        <div className="not-found-label">
          <VscSearchStop className="icon-notfound" />
          <div className="label">Không tìm thấy kết quả nào!</div>
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
