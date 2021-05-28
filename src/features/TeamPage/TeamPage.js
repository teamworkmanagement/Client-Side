import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TeamPage.scss";
import ChatPage from "../ChatPage/ChatPage";
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ListFileTable from "../../shared_components/MySharedComponents/ListFileTable/ListFileTable";
import NewsFeedPage from "../NewsFeedPage/NewsFeedPage";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import TeamTasks from "./Components/TeamTasks/TeamTasks";
import { useSelector } from "react-redux";
import TeamLoading from "./TeamLoading/TeamLoading";
import TeamMembersList from "./Components/TeamMembersList/TeamMembersList";
import BoardsPage from "./Components/BoardsPage/BoardsPage";
import TeamStatistics from "./Components/TeamStatistics/TeamStatistics";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string';

TeamPage.propTypes = {};

function TeamPage(props) {
  const [isOpeningBoard, setIsOpeningBoard] = useState(false);
  const teamLoading = useSelector((state) => state.app.teamLoading);
  const [boardId, setBoardId] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [active, setActive] = useState(()=>{
    if (queryParams != null) {
      switch (queryParams.tab) {
        case "feed":
          return 0;
        case "task":
          return 1;
        case "message":
          return 2;
        case "files":
          return 3;
        case "members":
          return 4;
        case "statistics":
          return 5;
        default:
          return 0;
      }
    }
    else {
      return 0;
    }
  });
  
  console.log(queryParams);

  function openBoard(boardId) {
    setBoardId(boardId);
    setIsOpeningBoard(true);
  }
  function goBackListBoards() {
    setIsOpeningBoard(false);
  }

  const onActiveTabChange = (index) => {
    setActive(index);

  }

  useEffect(() => {
    let tab = "feed";
    switch (active) {
      case 0:
        tab = "feed";
        break;
      case 1:
        tab = "task";
        break;
      case 2:
        tab = "message";
        break;
      case 3:
        tab = "files";
        break;
      case 4:
        tab = "members";
        break;
      case 5:
        tab = "statistics"
        break;
      default:
        break;
    }

    history.push({
      pathname: history.location.pathname,
      search: `tab=${tab}`
    })
  }, [active])
  const boardRender = () => {
    return <div>
      {isOpeningBoard ? (
        <TeamTasks boardId={boardId} goBackListBoards={goBackListBoards} />
      ) : (
        <BoardsPage openBoard={openBoard} />
      )}
      {false && <BoardsPage openBoard={openBoard} />}
    </div>
  }
  return (
    <div className="team-container">
      <CTabs activeTab={active} onActiveTabChange={onActiveTabChange}>
        <CNav variant="tabs">
          <CNavItem>
            <CTooltip content="Bản tin nhóm" placement="right">
              <CNavLink>
                <CIcon name="cil-newspaper" />
                <div className="tab-name">Bản tin nhóm</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip content="Công việc" placement="right">
              <CNavLink>
                <CIcon name="cil-storage" />
                <div className="tab-name">Công việc</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip content="Tin nhắn nhóm" placement="right">
              <CNavLink>
                <CIcon name="cil-send" />
                <div className="tab-name">Tin nhắn nhóm</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip content="Tài liệu" placement="right">
              <CNavLink>
                <CIcon name="cil-description" />
                <div className="tab-name">Tài liệu</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip content="Thành viên nhóm" placement="right">
              <CNavLink>
                <CIcon name="cil-user" />
                <div className="tab-name">Thành viên nhóm</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip content="Thống kê" placement="right">
              <CNavLink>
                <CIcon name="cil-chart-line" />
                <div className="tab-name">Thống kê</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane>
            {active === 0 ? <NewsFeedPage isInTeam={true} /> : null}
          </CTabPane>
          <CTabPane>
            {active === 1 ? boardRender() : null}
          </CTabPane>
          <CTabPane>
            {active === 2 ? <ChatPage isInTeam={true} tabActiveTeam={active} /> : null}
          </CTabPane>
          <CTabPane>
            {active === 3 ? <ListFileTable /> : null}
          </CTabPane>
          <CTabPane>
            {active === 4 ? <TeamMembersList /> : null}
          </CTabPane>
          <CTabPane>
            {active === 5 ? <TeamStatistics /> : null}
          </CTabPane>
        </CTabContent>
      </CTabs>
      <TeamLoading isLoading={teamLoading} />
    </div>
  );
}

export default TeamPage;
