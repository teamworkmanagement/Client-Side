import React, { useEffect, useState } from "react";
import "./HelpCenterPage.scss";
import { ImInfo } from "react-icons/im";

import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeStateHelpSidebar, setHelpPageTab } from "src/appSlice.js";
import { FiBookOpen } from "react-icons/fi";
import { RiUserStarLine } from "react-icons/ri";
import FounderInfoPage from "./Components/FounderInfoPage/FounderInfoPage.js";
import IntroPage from "./Components/IntroPage/IntroPage.js";
import GuidePage from "./Components/GuidePage/GuidePage.js";

function HelpCenterPage(props) {
  const [selectedTab, setSelectedTab] = useState(0); //0:.., 1:..
  const helpPageTab = useSelector((state) => state.app.helpPageTab);
  const dispatch = useDispatch();
  const toggleHelpSidebar = () => {
    dispatch(
      changeStateHelpSidebar({
        type: "helpsidebar",
        helpSidebarShow: true,
      })
    );
  };

  function openTab(index) {
    dispatch(setHelpPageTab(index));
  }

  useEffect(() => {
    setSelectedTab(helpPageTab);
  }, [helpPageTab]);

  return (
    <div className="help-page-container">
      <div className="toggle-help-options-sidebar-btn">
        <CIcon
          className="ml-md-3 d-sm-down-block  d-md-none toggle-help-sidebar-icon"
          name="cil-menu"
          onClick={toggleHelpSidebar}
        />
      </div>
      <div className="help-page-content">
        <div className="help-options d-sm-down-none">
          <div
            className={`tab-help tab-1 tab-infor ${
              selectedTab === 0 ? "active" : ""
            }`}
            onClick={() => openTab(0)}
          >
            <ImInfo className="icon-info icon" />
            Thông tin ứng dụng
          </div>
          <div
            className={`tab-help tab-2 ${selectedTab === 1 ? "active" : ""}`}
            onClick={() => openTab(1)}
          >
            <FiBookOpen className="icon-book icon" />
            Hướng dẫn sử dụng
          </div>
          <div
            className={`tab-help tab-2 ${selectedTab === 2 ? "active" : ""}`}
            onClick={() => openTab(2)}
          >
            <RiUserStarLine className="icon-about-us icon" />
            Đội ngũ phát triển
          </div>
        </div>

        <div className="help-content-container">
          {selectedTab === 0 && (
            <div className="help-content tab-1">
              <IntroPage />
            </div>
          )}
          {selectedTab === 1 && (
            <div className="help-content">
              <GuidePage />
            </div>
          )}
          {selectedTab === 2 && (
            <div className="help-content">
              <FounderInfoPage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HelpCenterPage;
