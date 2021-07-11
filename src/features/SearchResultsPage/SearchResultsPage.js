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
import { useHistory } from "react-router-dom";
import SearchBoardItem from "./Components/SearchBoardItem/SearchBoardItem.js";
import SearchChatItem from "./Components/SearchChatItem/SearchChatItem.js";
import SearchTaskItem from "./Components/SearchTaskItem/SearchTaskItem.js";
import SearchTeamItem from "./Components/SearchTeamItem/SearchTeamItem.js";
import queryString from 'query-string';
import searchApi from 'src/api/searchApi';
import "./SearchResultsPage.scss";

function SearchResultsPage(props) {
  const history = useHistory();
  const queryParams = queryString.parse(history.location.search);

  const [mode, setMode] = useState(
    () => {
      if (queryParams != null) {
        if (queryParams.type) {
          switch (queryParams.type) {
            case "all":
              return 0;
            case "team":
              return 1;
            case "task":
              return 2;
            case "board":
              return 3;
            case "chat":
              return 4;
            default:
              return 0;
          }
        } else {
          return 0;
        }
      }
      return 0;
    }
  ); //0:all, 1:team, 2:task, 3: board, 4:groupchat

  const [currentSearchStr, setCurrentSearchStr] = useState(''); // chuỗi trên thanh search của trang search


  const [taskList, setTaskList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [searching, setSearching] = useState(false);

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
    const obj = queryString.parse(history.location.search);
    console.log(obj);

    if (obj.query) {
      setCurrentSearchStr(obj.query);
      if (mode === 0) {
        searchApi.searchBoards({
          params: {
            keyWord: obj.query,
            skipItems: 0,
            pageSize: 10000,
          }
        }).then(res => {
          setBoardList(res.data.items);
        }).catch(err => {

        })

        searchApi.searchTasks({
          params: {
            keyWord: obj.query,
            skipItems: 0,
            pageSize: 10000,
          }
        }).then(res => {
          setTaskList(res.data.items);
        }).catch(err => {

        })

        searchApi.searchTeams({
          params: {
            keyWord: obj.query,
            skipItems: 0,
            pageSize: 10000,
          }
        }).then(res => {
          setTeamList(res.data.items);
        }).catch(err => {

        })

        searchApi.searchChats({
          params: {
            keyWord: obj.query,
            skipItems: 0,
            pageSize: 10000,
          }
        }).then(res => {
          setChatList(res.data.items);
        }).catch(err => {

        })
      }
      else {
        if (mode === 1) {
          searchApi.searchTeams({
            params: {
              keyWord: obj.query,
              skipItems: 0,
              pageSize: 10000,
            }
          }).then(res => {
            setTeamList(res.data.items);
          }).catch(err => {

          })
        }
        else {
          if (mode === 2) {
            searchApi.searchTasks({
              params: {
                keyWord: obj.query,
                skipItems: 0,
                pageSize: 10000,
              }
            }).then(res => {
              setTaskList(res.data.items);
            }).catch(err => {

            })
          } else {
            if (mode === 3) {
              searchApi.searchBoards({
                params: {
                  keyWord: obj.query,
                  skipItems: 0,
                  pageSize: 10000,
                }
              }).then(res => {
                setBoardList(res.data.items);
              }).catch(err => {

              })
            } else {
              if (mode === 4) {
                searchApi.searchChats({
                  params: {
                    keyWord: obj.query,
                    skipItems: 0,
                    pageSize: 10000,
                  }
                }).then(res => {
                  setChatList(res.data.items);
                }).catch(err => {

                })
              }
            }
          }
        }
      }

    }
  }, [history.location.search])

  function handleSearch() {
    if (!currentSearchStr || currentSearchStr === "") {
      //hiển thị view vui lòng nhập nội dung tìm kiếm
      return;
    }

    const queryObj = queryString.parse(history.location.search);
    history.push((`/search?query=${currentSearchStr}&type=${queryObj.type}`));
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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

  const changeMode = (mode) => {
    setMode(mode);
  }

  useEffect(() => {
    if (mode >= 0) {
      console.log(mode);
      let type = '';
      switch (mode) {
        case 0:
          type = 'all';
          break;
        case 1:
          type = 'team';
          break;
        case 2:
          type = 'task';
          break;
        case 3:
          type = 'board';
          break;
        case 4:
          type = 'chat';
          break;
      }

      const queryObj = queryString.parse(history.location.search);
      let query = '';
      if (queryObj.query) {
        query = queryObj.query;
      }

      let check = false;
      if (queryObj.type) {
        if (queryObj.type != type) {
          check = true;
        }
      } else {
        check = true;
      }

      if (check) {
        history.push({
          pathname: history.location.pathname,
          search: `query=${query}&type=${type}`
        });
      }
    }
  }, [mode])


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
                onClick={() => changeMode(0)}
                className={`drop-item drop-item-all ${mode === 0 ? "active" : ""
                  }`}
              >
                Tất cả
              </CDropdownItem>
              <CDropdownItem
                onClick={() => changeMode(1)}
                className={`drop-item drop-item-team ${mode === 1 ? "active" : ""
                  }`}
              >
                Nhóm
              </CDropdownItem>
              <CDropdownItem
                onClick={() => changeMode(2)}
                className={`drop-item drop-item-task ${mode === 2 ? "active" : ""
                  }`}
              >
                Công việc
              </CDropdownItem>
              <CDropdownItem
                onClick={() => changeMode(3)}
                className={`drop-item drop-item-board ${mode === 3 ? "active" : ""
                  }`}
              >
                Bảng công việc
              </CDropdownItem>
              <CDropdownItem
                onClick={() => changeMode(4)}
                className={`drop-item drop-item-chat ${mode === 4 ? "active" : ""
                  }`}
              >
                Nhóm nhắn tin
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <div
            onClick={() => changeMode(0)}
            className={`mode-item mode-all ${mode === 0 ? "active" : ""}`}
          >
            Tất cả
          </div>
          <div
            onClick={() => changeMode(1)}
            className={`mode-item mode-team ${mode === 1 ? "active" : ""}`}
          >
            Nhóm
          </div>
          <div
            onClick={() => changeMode(2)}
            className={`mode-item mode-task ${mode === 2 ? "active" : ""}`}
          >
            Công việc
          </div>
          <div
            onClick={() => changeMode(3)}
            className={`mode-item mode-board ${mode === 3 ? "active" : ""}`}
          >
            Bảng công việc
          </div>
          <div
            onClick={() => changeMode(4)}
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
