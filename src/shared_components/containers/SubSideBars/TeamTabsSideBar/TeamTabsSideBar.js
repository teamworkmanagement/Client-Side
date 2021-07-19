import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSidebar, CSidebarNav, CNavItem, CNavLink } from "@coreui/react";
import "./TeamTabsSideBar.scss";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import { changeStateTeamTabsSidebar } from "src/appSlice";
import { setActiveTab } from "src/features/ListTeamPage/teamSlice";
import { GrGroup } from "react-icons/gr";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { VscDeviceCameraVideo } from "react-icons/vsc";

const TeamTabsSideBar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.teamTabsSidebarShow);
  const activeTab = useSelector((state) => state.team.activeTab);

  const onChange = (val) => {
    const param = { type: "teamtabssidebar", teamTabsSidebarShow: val };
    const action = changeStateTeamTabsSidebar(param);
    dispatch(action);
  };

  const onClick = (index) => {
    dispatch(setActiveTab(index));
    dispatch(
      changeStateTeamTabsSidebar({
        type: "teamtabssidebar",
        teamTabsSidebarShow: false,
      })
    );
  };
  return (
    <CSidebar
      className="d-sm-down-block d-md-none sidebar-team-tabs"
      show={show}
      onShowChange={onChange}
    >
      <CSidebarNav>
        <CNavItem
          onClick={() => onClick(0)}
          className={`nav-tab-item ${activeTab === 0 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <GrGroup className="icon-group" />
            <div className="tab-name">Thông tin nhóm</div>
          </CNavLink>
        </CNavItem>
        <CNavItem
          onClick={() => onClick(1)}
          className={`nav-tab-item ${activeTab === 1 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-newspaper" />
            <div className="tab-name">Bản tin nhóm</div>
          </CNavLink>
        </CNavItem>
        <CNavItem
          onClick={() => onClick(2)}
          className={`nav-tab-item ${activeTab === 2 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-storage" />
            <div className="tab-name">Công việc</div>
          </CNavLink>
        </CNavItem>
        <CNavItem
          onClick={() => onClick(3)}
          className={`nav-tab-item ${activeTab === 3 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-send" />
            <div className="tab-name">Tin nhắn nhóm</div>
          </CNavLink>
        </CNavItem>
        <CNavItem
          onClick={() => onClick(4)}
          className={`nav-tab-item ${activeTab === 4 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <VscDeviceCameraVideo className="nav-link-icon icon-meeting" />
            <div className="tab-name">Phòng họp</div>
          </CNavLink>
        </CNavItem>
        <CNavItem
          onClick={() => onClick(5)}
          className={`nav-tab-item ${activeTab === 5 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-alarm" />
            <div className="tab-name">Đặt hẹn</div>
          </CNavLink>
        </CNavItem>

        <CNavItem
          onClick={() => onClick(6)}
          className={`nav-tab-item ${activeTab === 6 ? "active" : ""}`}
        >
          <CNavLink href="#" className="tab-item-link">
            <CIcon className="nav-link-icon" name="cil-description" />
            <div className="tab-name">Tài liệu</div>
          </CNavLink>
        </CNavItem>

        <CNavItem
          onClick={() => onClick(7)}
          className={`nav-tab-item ${activeTab === 7 ? "active" : ""}`}
        >
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
