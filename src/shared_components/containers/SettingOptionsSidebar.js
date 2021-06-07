import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarNav,
  CSidebarNavItem,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import "./SettingOptionsSidebar.scss";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import { changeStateSettingOptionsSidebar } from "src/appSlice";
import { setActiveTab } from "src/features/ListTeamPage/teamSlice";
import { BsInfoCircle } from "react-icons/bs";
import { BiKey } from "react-icons/bi";

const SettingOptionsSidebar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.settingOptionsSidebarShow);

  const onChange = (val) => {
    const param = {
      type: "settingoptionssidebar",
      settingOptionsSidebarShow: val,
    };
    const action = changeStateSettingOptionsSidebar(param);
    dispatch(action);
  };

  const onClick = (index) => {
    // dispatch(setActiveTab(index));
    // dispatch(
    //   changeStateTeamTabsSidebar({
    //     type: "teamtabssidebar",
    //     teamTabsSidebarShow: false,
    //   })
    // );
  };
  return (
    <CSidebar
      className="d-sm-down-block d-md-none sidebar-setting-options"
      show={show}
      onShowChange={onChange}
    >
      <CSidebarNav>
        <CNavItem onClick={() => onClick(0)} className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <BsInfoCircle className="icon-info icon" />
            <div className="tab-name">Thông tin của bạn</div>
          </CNavLink>
        </CNavItem>
        <CNavItem onClick={() => onClick(1)} className="nav-tab-item">
          <CNavLink href="#" className="tab-item-link">
            <BiKey className="icon-password icon" />

            <div className="tab-name">Đổi mật khẩu</div>
          </CNavLink>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(SettingOptionsSidebar);
