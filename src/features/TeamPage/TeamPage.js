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
  CToggler,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ListFileTable from "../../shared_components/MySharedComponents/ListFileTable/ListFileTable";
import NewsFeedPage from "../NewsFeedPage/NewsFeedPage";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import TeamTasks from "./Components/TeamTasks/TeamTasks";
import { useDispatch, useSelector } from "react-redux";
import TeamLoading from "./TeamLoading/TeamLoading";
import TeamMembersList from "./Components/TeamMembersList/TeamMembersList";
import BoardsPage from "./Components/BoardsPage/BoardsPage";
import TeamStatistics from "./Components/TeamStatistics/TeamStatistics";
import { useHistory, useLocation, useParams } from "react-router";
import queryString from "query-string";
import { changeStateTeamTabsSidebar } from "src/appSlice";

import NotFoundPage from "src/shared_components/MySharedComponents/NotFoundPage/NotFoundPage";
import teamApi from "src/api/teamApi";

import { GrGroup } from "react-icons/gr";

TeamPage.propTypes = {};

function TeamPage(props) {
  const dispatch = useDispatch();
  const [isOpeningBoard, setIsOpeningBoard] = useState(false);
  const teamLoading = useSelector((state) => state.app.teamLoading);
  const activeTab = useSelector((state) => state.team.activeTab);
  const [boardId, setBoardId] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const teamTabsSidebarShow = useSelector(
    (state) => state.app.teamTabsSidebarShow
  );
  const [active, setActive] = useState(() => {
    if (queryParams != null) {
      switch (queryParams.tab) {
        case "members":
          return 0;
        case "feed":
          return 1;
        case "task":
          return 2;
        case "message":
          return 3;
        case "files":
          return 4;

        case "statistics":
          return 5;
        default:
          return 0;
      }
    }
    return 0;
  });

  function openBoard(boardId) {
    setBoardId(boardId);
    setIsOpeningBoard(true);
  }
  function goBackListBoards() {
    setIsOpeningBoard(false);

    history.push({
      pathname: history.location.pathname,
      search: history.location.search.split("&")[0],
    });
  }

  const onActiveTabChange = (index) => {
    setActive(index);
  };

  useEffect(() => {
    if (activeTab !== null && activeTab !== undefined) setActive(activeTab);
  }, [activeTab]);

  useEffect(() => {
    let tab = "teaminfo";
    switch (active) {
      case 0:
        tab = "teaminfo";
        break;
      case 1:
        tab = "feed";
        break;
      case 2:
        tab = "task";
        break;
      case 3:
        tab = "message";
        break;
      case 4:
        tab = "files";
        break;

      case 5:
        tab = "statistics";
        break;
      default:
        tab = "teaminfo";
        break;
    }

    const queryParams = queryString.parse(history.location.search);

    if (queryParams.b && tab === "task") {
    } else {
      history.push({
        pathname: history.location.pathname,
        search: `tab=${tab}`,
      });
    }
  }, [active]);

  useEffect(() => {
    const queryObj = queryString.parse(history.location.search);
    if (queryObj.tab && !queryObj.b && !queryObj.t) setIsOpeningBoard(false);
    else {
      //setIsOpeningBoard(true);
      openBoard(queryObj.b);
    }
  }, [history.location.search]);

  const boardRender = () => {
    const pathname = history.location.pathname.split("/");
    return (
      <div>
        {isOpeningBoard ? (
          <TeamTasks
            isOfTeam={true}
            ownerId={pathname[2]}
            boardId={boardId}
            goBackListBoards={goBackListBoards}
          />
        ) : (
          <BoardsPage openBoard={openBoard} />
        )}
        {false && <BoardsPage openBoard={openBoard} />}
      </div>
    );
  };
  const toggleTeamTabsSidebar = () => {
    dispatch(
      changeStateTeamTabsSidebar({
        type: "teamtabssidebar",
        teamTabsSidebarShow: true,
      })
    );
  };

  const [notfound, setNotfound] = useState(false);
  const { teamId } = useParams();

  useEffect(() => {
    if (teamId) {
      teamApi
        .getAdmin(teamId)
        .then((res) => { })
        .catch((err) => {
          if (err.ErrorCode === "404") setNotfound(true);
        });
    }
  }, [teamId]);

  const renderNormal = () => {
    return (
      <>
        <CTabs activeTab={active} onActiveTabChange={onActiveTabChange}>
          <CNav className="d-sm-down-none" variant="tabs">
            <CNavItem>
              <CTooltip content="Thông tin nhóm" placement="right">
                <CNavLink>
                  <GrGroup className="icon-group" />
                  <div className="tab-name">Thành viên nhóm</div>
                </CNavLink>
              </CTooltip>
            </CNavItem>
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
              <CTooltip content="Thống kê" placement="right">
                <CNavLink>
                  <CIcon name="cil-chart-line" />
                  <div className="tab-name">Thống kê</div>
                </CNavLink>
              </CTooltip>
            </CNavItem>
          </CNav>
          <div className="tab-content-container">
            <div className="toggle-team-tabs-sidebar-btn">
              <CIcon
                className="ml-md-3 d-md-none toggle-icon"
                onClick={toggleTeamTabsSidebar}
                name="cil-menu"
              />
            </div>
            <CTabContent>
              <CTabPane>{active === 0 ? <TeamMembersList /> : null}</CTabPane>
              <CTabPane>
                {active === 1 ? <NewsFeedPage isInTeam={true} /> : null}
              </CTabPane>
              <CTabPane>{active === 2 ? boardRender() : null}</CTabPane>
              <CTabPane>
                {active === 3 ? (
                  <ChatPage isInTeam={true} tabActiveTeam={active} />
                ) : null}
              </CTabPane>
              <CTabPane>{active === 4 ? <ListFileTable /> : null}</CTabPane>

              <CTabPane>{active === 5 ? <TeamStatistics /> : null}</CTabPane>
            </CTabContent>
          </div>
        </CTabs>
      </>
    );
  };
  return (
    <div className="team-container">
      {notfound ? <NotFoundPage /> : renderNormal()}
      <TeamLoading isLoading={teamLoading} />
    </div>
  );
}

export default TeamPage;
