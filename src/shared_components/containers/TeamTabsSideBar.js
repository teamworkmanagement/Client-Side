import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarNav,
  CSidebarNavItem,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import "./TeamTabsSideBar.scss";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import { changeStateTeamTabsSidebar } from "src/appSlice";
import { setActiveTab } from "src/features/ListTeamPage/teamSlice";

const TeamTabsSideBar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.teamTabsSidebarShow);

  const onChange = (val) => {
    const param = { type: "teamtabssidebar", teamTabsSidebarShow: val };
    const action = changeStateTeamTabsSidebar(param);
    dispatch(action);
  };

  const onClick = (index) => {
    dispatch(setActiveTab(index));
    dispatch(changeStateTeamTabsSidebar(
      { type: "teamtabssidebar", teamTabsSidebarShow: false }
    ));
  }
  return (
    <CSidebar
      className="d-sm-down-block d-md-none sidebar-team-tabs"
      show={show}
      onShowChange={onChange}
    >
      <CSidebarNav>
        <CNavItem onClick={() => onClick(0)} className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-newspaper" />
            <div className="tab-name">Bản tin nhóm</div>
          </CNavLink>
        </CNavItem>
        <CNavItem onClick={() => onClick(1)} className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-storage" />
            <div className="tab-name">Công việc</div>
          </CNavLink>
        </CNavItem>
        <CNavItem onClick={() => onClick(2)} className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-send" />
            <div className="tab-name">Tin nhắn nhóm</div>
          </CNavLink>
        </CNavItem>
        <CNavItem onClick={() => onClick(3)} className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-description" />
            <div className="tab-name">Tài liệu</div>
          </CNavLink>
        </CNavItem>
        <CNavItem onClick={() => onClick(4)} className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-user" />
            <div className="tab-name">Thành viên nhóm</div>
          </CNavLink>
        </CNavItem>
        <CNavItem onClick={() => onClick(5)} className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-chart-line" />
            <div className="tab-name">Thống kê</div>
          </CNavLink>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(TeamTabsSideBar);
