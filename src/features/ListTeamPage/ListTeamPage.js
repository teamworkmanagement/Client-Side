import React, { useEffect, useState } from "react";
import "./ListTeamPage.scss";
import {
  CButton,
  CButtonGroup,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CTooltip,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import AvatarList from "src/shared_components/MySharedComponents/AvatarList/AvatarList";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router";
import { getTeamByUserId } from "./teamSlice";
import CreateTeamModal from "./CreateTeam/CreateTeamModal";
import JoinTeamModal from "./JoinTeam/JoinTeamModal";
import { CgLogIn } from "react-icons/cg";
import { AiOutlineTeam } from "react-icons/ai";
import { unwrapResult } from "@reduxjs/toolkit";
import { BsClipboardData } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";
import Loading from "src/shared_components/MySharedComponents/Loading/Loading";
import teamApi from "src/api/teamApi";
import { setJoinTeam, setLeaveTeam, setUpdateTeamInfo } from "src/utils/signalr/signalrSlice";

function ListTeamPage(props) {
  const [showMode, setShowMode] = useState(1); //1:grid, 2:list
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onCloseAddTeam = () => {
    setShowAddTeam(false);
  };

  const onShowAddTeam = () => {
    setShowAddTeam(true);
  };

  const onCloseJoinTeam = () => {
    setShowJoinTeam(false);
  };

  const onShowJoinTeam = () => {
    setShowJoinTeam(true);
  };

  function switchShowMode(index) {
    //debugger;
    console.log(index);
    if (index === showMode) return;
    setShowMode(index);
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.team.teams);
  const user = useSelector((state) => state.auth.currentUser);
  const teamUpdateInfo = useSelector(state => state.signalr.updateTeamInfo);
  const leftTeam = useSelector(state => state.signalr.leaveTeam);
  const joinTeam = useSelector(state => state.signalr.joinTeam);

  useEffect(() => {
    console.log("loading teams");
    function loadData() {
      setIsLoading(true);
      dispatch(getTeamByUserId(user.id))
        .then(unwrapResult)
        .then((res) => {
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }

    loadData();
  }, [showMode]);

  useEffect(() => {
    if (teamUpdateInfo) {
      const teamFind = teams.find(t => t.teamId === teamUpdateInfo.teamId);
      if (teamFind) {
        dispatch(getTeamByUserId(user.id));
      }
      dispatch(setUpdateTeamInfo(null));
    }
  }, [teamUpdateInfo])

  useEffect(() => {
    if (leftTeam) {
      if (user.id === leftTeam.userId) {
        dispatch(getTeamByUserId(user.id));
      }
      dispatch(setLeaveTeam(null));
    }
  }, [leftTeam])

  useEffect(() => {
    if (joinTeam) {
      if (user.id === joinTeam.userId) {
        dispatch(getTeamByUserId(user.id));
      }
      dispatch(setJoinTeam(null));
    }
  }, [joinTeam])

  const navigateToTeam = (teamId) => {
    history.push(`/team/${teamId}?tab=teaminfo`);
  };

  const leaveTeam = (teamId) => {
    console.log(teamId);
    const params = {
      teamId: teamId,
      userId: user.id,
    };

    teamApi
      .leaveTeam({ params })
      .then((res) => {
        dispatch(getTeamByUserId(user.id));
      })
      .catch((err) => { });
  };

  const renderNormal = () => {
    return (
      <>
        {showMode === 1 && (
          <div className="grid-view-container">
            <CRow className="grid-view">
              {teams.map((team, index) => {
                return (
                  <CCol
                    sm="6"
                    lg="3"
                    key={index}
                    style={{ animationDelay: `${index / 20}s` }}
                    className="grid-item-container"
                  >
                    <div className="item-content">
                      <div className="team-header">
                        <div className="header-actions-dropdown">
                          <CDropdown>
                            <CDropdownToggle id="dropdownMenuButton" caret>
                              <div className="lane-actions">
                                <CIcon name="cil-options" />
                              </div>
                            </CDropdownToggle>
                            <CDropdownMenu
                              aria-labelledby="dropdownMenuButton"
                              placement="bottom-end"
                            >
                              <CDropdownItem
                                className="first"
                                onClick={() => navigateToTeam(team.teamId)}
                              >
                                <CIcon name="cil-arrow-circle-right" />
                                Vào nhóm
                              </CDropdownItem>
                              <CDropdownItem
                                className="last"
                                onClick={() => leaveTeam(team.teamId)}
                              >
                                <CIcon name="cil-account-logout" />
                                Rời nhóm
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </div>
                      </div>
                      <div className="team-infor">
                        <img
                          className="team-avatar"
                          alt=""
                          src={team.teamImageUrl}
                        />
                        <div className="team-name">{team.teamName}</div>
                        <div className="team-description">
                          {team.teamDescription}
                        </div>
                      </div>
                      <div className="team-detail-infor">
                        <div className="member-infor">
                          <CIcon name="cil-group" />
                          <div className="member-count">
                            {team.teamMemberCount}
                          </div>
                        </div>
                        <div className="divider"></div>
                        <div className="leader-infor">
                          <div className="icon-group">
                            <CIcon name="cil-flag-alt" />
                          </div>
                          <CTooltip
                            placement="top"
                            content={team.teamLeaderName}
                          >
                            <div className="leader-name">
                              <img
                                className="leader-avatar"
                                alt=""
                                src={team.teamLeaderImageUrl}
                              />
                              {team.teamLeaderName}
                            </div>
                          </CTooltip>
                        </div>
                      </div>
                      <div
                        className="team-action"
                        onClick={() => navigateToTeam(team.teamId)}
                      >
                        Vào nhóm
                      </div>
                    </div>
                  </CCol>
                );
              })}
            </CRow>
          </div>
        )}
        {showMode === 2 && (
          <div className="table-view-container">
            <div className="table-content table-responsive">
              <table className="table table-hover  mb-0 ">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">
                      <CIcon name="cil-people" />
                    </th>
                    <th>Tên nhóm</th>
                    <th>Trưởng nhóm</th>
                    <th className="text-center">Thành viên</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => {
                    return (
                      <tr
                        onClick={() => navigateToTeam(team.teamId)}
                        style={{ animationDelay: `${index / 20}s` }}
                      >
                        <td className="text-center">
                          <div className="c-avatar">
                            <img
                              src={team.teamImageUrl}
                              className="c-avatar-img"
                              alt="avatar"
                            />
                          </div>
                        </td>
                        <td>
                          <div>{team.teamName}</div>
                          <div className="small text-muted">
                            {team.teamDescription}
                          </div>
                        </td>
                        <td>
                          <div className="leader-cell">
                            <img
                              className="team-leader-avatar"
                              alt=""
                              src={team.teamLeaderImageUrl}
                            />
                            <div className="">{team.teamLeaderName}</div>
                          </div>
                        </td>

                        <td className="text-center">
                          <AvatarList teams={teams} teamId={team.teamId} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderEmpty = () => {
    return (
      <>
        {teams.length === 0 && !isLoading && (
          <div className="nodata-image">
            <div className="icon-group">
              <BsClipboardData className="icon-task" />
              <VscSearchStop className="icon-search" />
            </div>

            <div className="noti-infor">Bạn chưa tham gia nhóm nào</div>
          </div>
        )}
      </>
    );
  };
  return (
    <div className="list-team-container">
      <div className="header-tool-bar">
        <div onClick={onShowJoinTeam} className="join-team-btn normal-btn">
          <CgLogIn className="icon-goin" />
          <AiOutlineTeam className="icon-group" />
          Tham gia nhóm
        </div>
        <div onClick={onShowAddTeam} className="create-team-btn normal-btn">
          <CIcon name="cil-plus" />
          Tạo nhóm mới
        </div>
        <CButtonGroup className="show-mode">
          <CTooltip placement="top" content="Lưới">
            <CButton
              className={`first mode-btn ${showMode === 1 && "active"}`}
              color="secondary"
              onClick={() => switchShowMode(1)}
              type="button"
            >
              <CIcon name="cil-grid" />
            </CButton>
          </CTooltip>
          <CTooltip placement="top" content="Danh sách">
            <CButton
              className={`last mode-btn ${showMode === 2 && "active"}`}
              color="secondary"
              onClick={() => switchShowMode(2)}
            >
              <CIcon name="cil-list" />
            </CButton>
          </CTooltip>
        </CButtonGroup>
      </div>
      {/* <Loading /> */}
      {isLoading && teams.length === 0 && <Loading />}
      {renderNormal()}
      {renderEmpty()}
      <CreateTeamModal showAddTeam={showAddTeam} onClose={onCloseAddTeam} />
      <JoinTeamModal showJoinTeam={showJoinTeam} onClose={onCloseJoinTeam} />
    </div>
  );
}

export default ListTeamPage;
