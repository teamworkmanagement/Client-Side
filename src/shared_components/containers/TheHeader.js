import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CTooltip,
  CInput,
} from "@coreui/react";

import { TheHeaderDropdown, TheHeaderDropdownMssg } from "./index";
import {
  changeState,
  changeStateTeamTabsSidebar,
  changeStateChatListSidebar,
  changeStateSettingOptionsSidebar,
  setCollapseHeader,
  changeStateHelpSidebar,
} from "src/appSlice";
import "./TheHeader.scss";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../MySharedComponents/Breadcrumbs/Breadcrumbs";
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
} from "react-icons/hi";
import teamApi from "src/api/teamApi";
import { BsSearch } from "react-icons/bs";
import { setUpdateTeamInfo } from "src/utils/signalr/signalrSlice";

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.app.sidebarShow);
  const collapseHeader = useSelector((state) => state.app.collapseHeader);
  const history = useHistory();
  const [searchStr, setSearchStr] = useState("");

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch(changeState({ type: "set", sidebarShow: val }));
    dispatch(
      changeStateTeamTabsSidebar({
        type: "teamtabssidebar",
        teamTabsSidebarShow: val,
      })
    );
    dispatch(
      changeStateChatListSidebar({
        type: "chatlistsidebar",
        chatListSidebarShow: val,
      })
    );
    dispatch(
      changeStateSettingOptionsSidebar({
        type: "settingoptionssidebar",
        settingOptionsSidebarShow: val,
      })
    );
    dispatch(
      changeStateHelpSidebar({
        type: "helpsidebar",
        helpSidebarShow: val,
      })
    );
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";

    dispatch(changeState({ type: "set", sidebarShow: val }));
  };

  const [team, setTeam] = useState({});
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (history.location.pathname.includes("/team/")) {
      const arr = history.location.pathname.split("/");
      const teamId = arr[2];

      teamApi
        .getTeam(teamId)
        .then((res) => {
          if (res.data) {
            setTeam(res.data);
            setShowBadge(true);
          } else {
            setTeam({});
            setShowBadge(false);
          }
        })
        .catch((err) => {
          setTeam({});
          setShowBadge(false);
        });
    } else {
      setTeam({});
      setShowBadge(false);
    }
  }, [history.location.pathname]);

  const updateTeamInfSignalR = useSelector(
    (state) => state.signalr.updateTeamInfo
  );
  useEffect(() => {
    if (updateTeamInfSignalR) {
      if (history.location.pathname.includes("/team/")) {
        const arr = history.location.pathname.split("/");
        const teamId = arr[2];

        if (teamId === updateTeamInfSignalR.teamId) {
          teamApi
            .getTeam(teamId)
            .then((res) => {
              if (res.data) {
                setTeam(res.data);
                setShowBadge(true);
              } else {
                setTeam({});
                setShowBadge(false);
              }
            })
            .catch((err) => {
              setTeam({});
              setShowBadge(false);
            });
        } else {
          setTeam({});
          setShowBadge(false);
        }
      }

      dispatch(setUpdateTeamInfo(null));
    }
  }, [updateTeamInfSignalR]);

  function setCollapse(isCollapse) {
    dispatch(setCollapseHeader(isCollapse));
    console.log(collapseHeader ? "true" : "false");
  }

  function handleSearchGlobal() {
    if (!searchStr || searchStr === "") {
      return;
    }

    //dispatch(setSearchGlobalStr(searchStr));
    history.push(`/search?query=${searchStr}&type=all`);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchGlobal();
    }
  };

  useEffect(() => {
    if (!history.location.pathname.includes("/search") && searchStr)
      setSearchStr("");
  }, [history.location.pathname]);

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/dashboard">
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
        <img alt="logo" src="../images/app/logoteam.png" />
      </CHeaderBrand>
      <CHeaderNav style={{ paddingRight: "0.5rem" }} className="">
        <div className="lookup-input-header">
          <CInput
            id="header-input"
            className=""
            placeholder="Tìm kiếm..."
            // type="text"
            onKeyDown={handleKeyDown}
            value={searchStr}
            onChange={(e) => {
              //debugger;
              setSearchStr(e.target.value);
            }}
          />
          <BsSearch className="icon-search" onClick={handleSearchGlobal} />
        </div>

        <TheHeaderDropdownMssg />
        <TheHeaderDropdown />
        {collapseHeader && (
          <CTooltip content="Mở rộng thanh tiêu đề">
            <div
              className="expand-header-btn"
              onClick={() => setCollapse(false)}
            >
              <HiOutlineChevronDoubleDown className="icon-collapse-header" />
            </div>
          </CTooltip>
        )}
      </CHeaderNav>

      <CSubheader
        className={`px-3 justify-content-between ${
          collapseHeader ? "collapsed" : "expand"
        }`}
      >
        <div className="sub-header-content">
          <Breadcrumbs className="c-subheader-nav m-0 px-0 px-md-3" />
        </div>
        <div className="sub-info-header">
          {showBadge && (
            <div className="team-info-header">
              <img alt="" src={team.teamImageUrl} />

              <div className="team-name">{team.teamName}</div>
            </div>
          )}

          <CTooltip content="Thu gọn thanh tiêu đề">
            <div
              className="collapse-header-btn"
              onClick={() => setCollapse(true)}
            >
              <HiOutlineChevronDoubleUp className="icon-collapse-header" />
            </div>
          </CTooltip>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
