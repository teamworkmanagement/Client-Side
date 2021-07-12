import { CNavItem, CNavLink, CSidebar, CSidebarNav } from "@coreui/react";
import React from "react";
import { BiKey } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// sidebar nav config
import {
  changeStateSettingOptionsSidebar,
  setSettingPageTab,
} from "src/appSlice";
import "./SettingOptionsSidebar.scss";
import { ImInfo } from "react-icons/im";
const SettingOptionsSidebar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.settingOptionsSidebarShow);
  const settingPageTab = useSelector((state) => state.app.settingPageTab);

  const onChange = (val) => {
    const param = {
      type: "settingoptionssidebar",
      settingOptionsSidebarShow: val,
    };
    const action = changeStateSettingOptionsSidebar(param);
    dispatch(action);
  };

  const selectTab = (index) => {
    dispatch(setSettingPageTab(index));
    dispatch(
      changeStateSettingOptionsSidebar({
        type: "settingoptionssidebar",
        settingOptionsSidebarShow: false,
      })
    );
  };
  return (
    <CSidebar
      className="d-sm-down-block d-md-none sidebar-setting-options"
      show={show}
      onShowChange={onChange}
    >
      <CSidebarNav>
        <CNavItem
          onClick={() => selectTab(0)}
          className={`nav-tab-item ${settingPageTab === 0 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <ImInfo className="icon-info icon" />
            <div className="tab-name">Thông tin của bạn</div>
          </CNavLink>
        </CNavItem>
        <CNavItem
          onClick={() => selectTab(1)}
          className={`nav-tab-item ${settingPageTab === 1 ? "active" : ""}`}
        >
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
