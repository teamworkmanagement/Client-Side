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
} from "@coreui/react";
import "./TheSidebar.scss";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";
import { changeState } from "src/appSlice";

const TheSidebar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.sidebarShow);
  const darkMode = useSelector((state) => state.app.darkMode);

  const onChange = (val) => {
    const param = { type: "set", sidebarShow: val };
    const action = changeState(param);
    dispatch(action);
  };
  return (
    <CSidebar show={show} onShowChange={onChange}>
      <CSidebarBrand className="d-md-down-none" to="/">
        {darkMode && (
          <div className="logo-team-container">
            <div className="img"></div>
            {/* <img alt="logoapp" src="../images/app/logoteam.png" /> */}
          </div>
        )}
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>

      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
