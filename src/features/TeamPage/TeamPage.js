import React, { useEffect, useState } from "react";
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
import TeamTasks from "./Components/TeamTasks/TeamTasks";
import { useDispatch, useSelector } from "react-redux";
import TeamMembersList from "./Components/TeamMembersList/TeamMembersList";
import BoardsPage from "./Components/BoardsPage/BoardsPage";
import TeamStatistics from "./Components/TeamStatistics/TeamStatistics";
import { useHistory, useLocation, useParams } from "react-router";
import queryString from "query-string";
import {
  changeStateTeamTabsSidebar,
  setTaskEditModal,
  setUserModal,
} from "src/appSlice";

import NotFoundPage from "src/shared_components/MySharedComponents/NotFoundPage/NotFoundPage";
import teamApi from "src/api/teamApi";

import { GrGroup } from "react-icons/gr";
import {
  setJoinTeam,
  setLeaveTeam,
  setUpdateTeamInfo,
} from "src/utils/signalr/signalrSlice";
import { setAdminAction } from "../KanbanBoard/kanbanSlice";
import VideoCall from "../VideoCall/ListMeetings";
import AppointmentPage from "src/shared_components/MySharedComponents/AppointmentPage/AppointmentPage";
import { VscDeviceCameraVideo } from "react-icons/vsc";

function TeamPage(props) {
  const dispatch = useDispatch();
  const [isOpeningBoard, setIsOpeningBoard] = useState(false);
  const activeTab = useSelector((state) => state.team.activeTab);
  const [boardId, setBoardId] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const teamUpdateInfo = useSelector((state) => state.signalr.updateTeamInfo);
  const leftTeam = useSelector((state) => state.signalr.leaveTeam);
  const joinTeam = useSelector((state) => state.signalr.joinTeam);

  const { teamId } = useParams();
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
        case "meeting":
          return 4;
        case "appointment":
          return 5;
        case "files":
          return 6;
        case "statistics":
          return 7;
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
        tab = "meeting";
        break;
      case 5:
        tab = "appointment";
        break;
      case 6:
        tab = "files";
        break;
      case 7:
        tab = "statistics";
        break;
      default:
        tab = "teaminfo";
        break;
    }

    const queryParams = queryString.parse(history.location.search);

    if (queryParams.b && tab === "task") {
    } else {
      let check = false;
      const queryObj = queryString.parse(history.location.search);
      if (queryObj.tab) {
        if (queryObj.tab !== tab) {
          check = true;
        }
      } else {
        check = true;
      }
      if (check) {
        history.push({
          pathname: history.location.pathname,
          search: `tab=${tab}`,
        });
      }
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

  useEffect(() => {
    if (teamId) {
      teamApi
        .getAdmin(teamId)
        .then((res) => {})
        .catch((err) => {
          if (err.ErrorCode === "404") setNotfound(true);
        });
    }
  }, [teamId]);

  useEffect(() => {
    if (!joinTeam) return;
    if (joinTeam) {
      if (teamId === joinTeam.teamId) {
        //load l???i ds th??nh vi??n
      }
    }
    dispatch(setJoinTeam(null));
  }, [joinTeam]);

  useEffect(() => {
    if (!leftTeam) return;
    if (leftTeam) {
      if (teamId === leftTeam.teamId) {
        //load l???i ds th??nh vi??n
        if (leftTeam.userId === user.id) {
          setNotfound(true);
          const queryObj = queryString.parse(history.location.search);
          if (queryObj.t) {
            dispatch(setUserModal(null));
            dispatch(setTaskEditModal(null));
          }
        }
      }
    }
    dispatch(setLeaveTeam(null));
  }, [leftTeam]);

  useEffect(() => {
    if (!teamUpdateInfo) return;
    if (
      teamId === teamUpdateInfo.teamId &&
      teamUpdateInfo.leaderId &&
      user.id === teamUpdateInfo.leaderId
    ) {
      dispatch(setAdminAction(true));
      setTeam({
        ...team,
        teamLeaderId: user.id,
      });
      console.log(1);
    } else {
      if (teamId === teamUpdateInfo.teamId) {
        dispatch(setAdminAction(false));
        setTeam({
          ...team,
          teamLeaderId: null,
        });
        console.log(2);
      }
    }
    dispatch(setUpdateTeamInfo(null));
  }, [teamUpdateInfo]);

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
          <BoardsPage team={team} openBoard={openBoard} />
        )}
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
  const [team, setTeam] = useState({});

  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (teamId) {
      teamApi
        .getAdmin(teamId)
        .then((res) => {
          teamApi
            .getTeam(teamId)
            .then((res) => {
              setTeam(res.data);
            })
            .catch((err) => {
              if (err.ErrorCode === "404") setNotfound(true);
              return;
            });
        })
        .catch((err) => {
          if (err.ErrorCode === "404") setNotfound(true);
        });
    }
  }, [teamId]);

  // eslint-disable-next-line
  const setNotFoundView = () => {
    setNotfound(true);
  };

  const renderNormal = () => {
    return (
      <>
        <CTabs activeTab={active} onActiveTabChange={onActiveTabChange}>
          <CNav className="d-sm-down-none" variant="tabs">
            <CNavItem>
              <CTooltip content="Th??ng tin nh??m" placement="right">
                <CNavLink>
                  <GrGroup className="icon-group" />
                  <div className="tab-name">Th??nh vi??n nh??m</div>
                </CNavLink>
              </CTooltip>
            </CNavItem>
            <CNavItem>
              <CTooltip content="B???n tin nh??m" placement="right">
                <CNavLink>
                  <CIcon name="cil-newspaper" />
                  <div className="tab-name">B???n tin nh??m</div>
                </CNavLink>
              </CTooltip>
            </CNavItem>
            <CNavItem>
              <CTooltip content="C??ng vi???c" placement="right">
                <CNavLink>
                  <CIcon name="cil-storage" />
                  <div className="tab-name">C??ng vi???c</div>
                </CNavLink>
              </CTooltip>
            </CNavItem>
            <CNavItem>
              <CTooltip content="Tin nh???n nh??m" placement="right">
                <CNavLink>
                  <CIcon name="cil-send" />
                  <div className="tab-name">Tin nh???n nh??m</div>
                </CNavLink>
              </CTooltip>
            </CNavItem>
            <CNavItem>
              <CTooltip content="Ph??ng h???p" placement="right">
                <CNavLink>
                  <VscDeviceCameraVideo className="icon-meeting" />
                  <div className="tab-name">Ph??ng h???p</div>
                </CNavLink>
              </CTooltip>
            </CNavItem>
            <CNavItem>
              <CTooltip content="L???ch h???n nh??m" placement="right">
                <CNavLink>
                  <CIcon name="cil-alarm" />
                  <div className="tab-name">L???ch h???n</div>
                </CNavLink>
              </CTooltip>
            </CNavItem>
            <CNavItem>
              <CTooltip content="T??i li???u" placement="right">
                <CNavLink>
                  <CIcon name="cil-description" />
                  <div className="tab-name">T??i li???u</div>
                </CNavLink>
              </CTooltip>
            </CNavItem>

            {team.teamLeaderId === user.id && (
              <CNavItem>
                <CTooltip content="Th???ng k??" placement="right">
                  <CNavLink>
                    <CIcon name="cil-chart-line" />
                    <div className="tab-name">Th???ng k??</div>
                  </CNavLink>
                </CTooltip>
              </CNavItem>
            )}
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
              <CTabPane>
                {active === 4 && <VideoCall teamId={teamId} />}
              </CTabPane>
              <CTabPane>
                {active === 5 && <AppointmentPage teamId={teamId} />}
              </CTabPane>
              <CTabPane>{active === 6 ? <ListFileTable /> : null}</CTabPane>

              <CTabPane>
                {active === 7 && team.teamLeaderId === user.id ? (
                  <TeamStatistics />
                ) : (
                  <NotFoundPage />
                )}
              </CTabPane>
            </CTabContent>
          </div>
        </CTabs>
      </>
    );
  };
  return (
    <div className="team-container">
      {notfound ? <NotFoundPage /> : renderNormal()}
    </div>
  );
}

export default TeamPage;
