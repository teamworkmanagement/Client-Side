import React, { useEffect, useState } from "react";
import "./HelpCenterPage.scss";
import { ImInfo } from "react-icons/im";

import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeStateHelpSidebar } from "src/appSlice.js";
import { FiBookOpen } from "react-icons/fi";
import { RiUserStarLine } from "react-icons/ri";
import FounderInfoPage from "./Components/FounderInfoPage/FounderInfoPage.js";

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
            onClick={() => setSelectedTab(0)}
          >
            <ImInfo className="icon-info icon" />
            Thông tin ứng dụng
          </div>
          <div
            className={`tab-help tab-2 ${selectedTab === 1 ? "active" : ""}`}
            onClick={() => setSelectedTab(1)}
          >
            <FiBookOpen className="icon-book icon" />
            Hướng dẫn sử dụng
          </div>
          <div
            className={`tab-help tab-2 ${selectedTab === 2 ? "active" : ""}`}
            onClick={() => setSelectedTab(2)}
          >
            <RiUserStarLine className="icon-about-us icon" />
            Đội ngũ phát triển
          </div>
        </div>

        <div className="help-content-container">
          {selectedTab === 0 && (
            <div className="help-content tab-1">
              <h4 className="intro-label">Giới thiệu</h4>
              <div className="description">
                <strong>EZTeam</strong> là ứng dụng web cung cấp các công cụ và
                tiện ích hỗ trợ cho việc học tập và làm việc nhóm của bạn.
                <br />
                Với một giao diện thân thiện cùng các chức năng cần thiết,{` `}
                <strong>EZTeam</strong> mong muốn nâng cao trải nghiệm người
                dùng, tạo ra một môi trường hoạt động nhóm hữu dụng, năng suất
                hơn, từ đó mang lại một kết quả tốt nhất cho mục tiêu học tập và
                làm việc nhóm của bạn.
              </div>
              <h4 className="feature-label">Chức năng</h4>
              <div className="label">
                Những chức năng thông dụng mà <strong>EZTeam</strong> sẽ mang
                đến cho bạn như:
              </div>
            </div>
          )}
          {selectedTab === 1 && <div className="help-content">b</div>}
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
