import React, { useEffect } from "react";
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
  CInput,
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
import {
  changeState,
  setDarkMode,
  changeStateTeamTabsSidebar,
  changeStateChatListSidebar,
  changeStateSettingOptionsSidebar,
} from "src/appSlice";
import "./TheHeader.scss";
import { BsSearch } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../MySharedComponents/Breadcrumbs/Breadcrumbs";

const TheHeader = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.app.darkMode);
  const sidebarShow = useSelector((state) => state.app.sidebarShow);
  const history = useHistory();

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
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";

    dispatch(changeState({ type: "set", sidebarShow: val }));
  };

  const changeDarkMode = () => {
    dispatch(setDarkMode());
  };

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
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
        <img alt="logo" src="../images/app/logoteam.png" />
      </CHeaderBrand>
      <CHeaderNav className="px-3">
        <div className="lookup-input-header">
          <CInput
            className="input-field"
            placeholder="Tìm kiếm..."
            type="text"
          />
          <BsSearch className="icon-search" />
        </div>

        <TheHeaderDropdownMssg />
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <Breadcrumbs className="c-subheader-nav m-0 px-0 px-md-3" />
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
