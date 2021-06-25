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
  CTooltip,
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
  setCollapseHeader,
} from "src/appSlice";
import "./TheHeader.scss";
import { BsSearch } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../MySharedComponents/Breadcrumbs/Breadcrumbs";
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
} from "react-icons/hi";

const TheHeader = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.app.darkMode);
  const sidebarShow = useSelector((state) => state.app.sidebarShow);
  const collapseHeader = useSelector((state) => state.app.collapseHeader);
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

  function setCollapse(isCollapse) {
    dispatch(setCollapseHeader(isCollapse));
    console.log(collapseHeader ? "true" : "false");
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
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
        <img alt="logo" src="../images/app/logoteam.png" />
      </CHeaderBrand>
      <CHeaderNav style={{ paddingRight: "0.5rem" }} className="">
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
          {/* <div className="team-info-header">
            <img
              alt=""
              src="https://chengming.co.th/wp-content/uploads/2020/08/pwqsf11b8adbA3KaVQ7B-o.png"
            />
            <div className="team-name">Anh văn toeic 2</div>
          </div> */}
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
