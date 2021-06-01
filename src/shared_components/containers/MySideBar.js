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
    <CSidebar show={show} onShowChange={onChange}>
      <div>my siderbar</div>
      <CSidebarNav>sidebar content</CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(MySideBar);
