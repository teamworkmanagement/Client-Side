import { CNavItem, CNavLink, CSidebar, CSidebarNav } from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImInfo } from "react-icons/im";

// sidebar nav config
import { changeStateHelpSidebar, setHelpPageTab } from "src/appSlice";
import "./HelpSidebar.scss";
import { FiBookOpen } from "react-icons/fi";
import { RiUserStarLine } from "react-icons/ri";

const HelpSidebar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.helpSidebarShow);
  const helpPageTab = useSelector((state) => state.app.helpPageTab);

  const onChange = (val) => {
    const param = {
      type: "helpsidebar",
      helpSidebarShow: val,
    };
    const action = changeStateHelpSidebar(param);
    dispatch(action);
  };

  const selectTab = (index) => {
    dispatch(setHelpPageTab(index));
    dispatch(
      changeStateHelpSidebar({
        type: "helpsidebar",
        helpSidebarShow: false,
      })
    );
  };
  return (
    <CSidebar
      className="d-sm-down-block d-md-none sidebar-help-center"
      show={show}
      onShowChange={onChange}
    >
      <CSidebarNav>
        <CNavItem
          onClick={() => selectTab(0)}
          className={`nav-tab-item ${helpPageTab === 0 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <ImInfo className="icon-info icon" />
            <div className="tab-name">Thông tin ứng dụng</div>
          </CNavLink>
        </CNavItem>
        <CNavItem
          onClick={() => selectTab(1)}
          className={`nav-tab-item ${helpPageTab === 1 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <FiBookOpen className="icon-password icon" />
            <div className="tab-name">Hướng dẫn sử dụng</div>
          </CNavLink>
        </CNavItem>
        <CNavItem
          onClick={() => selectTab(2)}
          className={`nav-tab-item ${helpPageTab === 2 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <RiUserStarLine className="icon-password icon" />
            <div className="tab-name">Đội ngũ phát triển</div>
          </CNavLink>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(HelpSidebar);
