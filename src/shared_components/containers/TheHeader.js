import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CSwitch,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// routes config
import routes from "../../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";
import { changeState, setDarkMode } from "src/appSlice";
import CreateTeamModal from "src/features/TeamPage/Components/CreateTeam/CreateTeamModal";
import JoinTeamModal from "src/features/TeamPage/Components/JoinTeam/JoinTeamModal";

const TheHeader = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.app.darkMode);
  const sidebarShow = useSelector((state) => state.app.sidebarShow);

  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    console.log("val toggleSidebar: ", val);
    dispatch(changeState({ type: "set", sidebarShow: val }));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    console.log("val toggleSidebarMobile: ", val);
    dispatch(changeState({ type: "set", sidebarShow: val }));
  };

  const changeDarkMode = () => {
    dispatch(setDarkMode());
    console.log("switch");
  };


  const onCloseAddTeam = () => {
    setShowAddTeam(false);
  }

  const onShowAddTeam = () => {
    setShowAddTeam(true);
  }

  const onCloseJoinTeam = () => {
    setShowJoinTeam(false);
  }

  const onShowJoinTeam = () => {
    setShowJoinTeam(true);
  }

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
      {/*<CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
  </CHeaderBrand>*/}

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif />
        <TheHeaderDropdownTasks />
        <TheHeaderDropdownMssg />
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        {
          window.location.href.includes('/team') ? <div>
            <CButton onClick={onShowAddTeam}>Tạo Nhóm</CButton>
            <CButton onClick={onShowJoinTeam}>Tham gia nhóm</CButton>
            <CreateTeamModal showAddTeam={showAddTeam} onClose={onCloseAddTeam} />
            <JoinTeamModal showJoinTeam={showJoinTeam} onClose={onCloseJoinTeam} />
          </div> : null
        }
        <div className="dark-theme-container">
          <div>Dark Theme</div>
          <CSwitch
            className={"mx-1"}
            shape={"pill"}
            color={"secondary"}
            variant={"opposite"}
            labelOn={"on"}
            labelOff={"off"}
            onClick={changeDarkMode}
            defaultChecked={darkMode}
          />
        </div>

        <div className="d-md-down-none mfe-2 c-subheader-nav nodisplay">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />
            &nbsp;Dashboard
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />
            &nbsp;Settings
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
