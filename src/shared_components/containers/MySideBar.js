import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import "./MySideBar.scss";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";
import { changeStateSideBar } from "src/appSlice";

const MySideBar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.mySidebarShow);

  const onChange = (val) => {
    const param = { type: "sidebar", mySidebarShow: val };
    const action = changeStateSideBar(param);
    dispatch(action);
  };
  return (
    <CSidebar
      className="d-sm-down-block d-md-none sidebar-team-tabs"
      show={show}
      onShowChange={onChange}
    >
      <CSidebarNav>
        <CNavItem className="nav-tab-item">
          <CNavLink href="/newsfeed" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-newspaper" />
            <div className="tab-name">Bản tin nhóm</div>
          </CNavLink>
        </CNavItem>
        <CSidebarNavItem className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-storage" />
            <div className="tab-name">Công việc</div>
          </CNavLink>
        </CSidebarNavItem>
        <CSidebarNavItem className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-send" />
            <div className="tab-name">Tin nhắn nhóm</div>
          </CNavLink>
        </CSidebarNavItem>
        <CSidebarNavItem className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-description" />
            <div className="tab-name">Tài liệu</div>
          </CNavLink>
        </CSidebarNavItem>
        <CSidebarNavItem className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-user" />
            <div className="tab-name">Thành viên nhóm</div>
          </CNavLink>
        </CSidebarNavItem>
        <CSidebarNavItem className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-chart-line" />
            <div className="tab-name">Thống kê</div>
          </CNavLink>
        </CSidebarNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(MySideBar);
