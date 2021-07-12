import React from "react";
import "./IntroPage.scss";
import { FiCircle } from "react-icons/fi";
import { BiTask } from "react-icons/bi";
import { ImUsers, ImUser, ImFilesEmpty } from "react-icons/im";
import { AiOutlineComment } from "react-icons/ai";
import CIcon from "@coreui/icons-react";
import { useDispatch } from "react-redux";
import { setHelpPageTab } from "src/appSlice.js";

function IntroPage(props) {
  const dispatch = useDispatch();
  function openGuideTab() {
    dispatch(setHelpPageTab(1));
  }
  return (
    <div className="intro-page">
      <h4 className="intro-label">Giới thiệu</h4>
      <div className="description">
        <strong>EZTeam</strong> là ứng dụng web cung cấp các công cụ và tiện ích
        hỗ trợ cho việc học tập và làm việc nhóm của bạn.
        <br />
        Với một giao diện thân thiện cùng các chức năng cần thiết,{` `}
        <strong>EZTeam</strong> mong muốn nâng cao trải nghiệm người dùng, tạo
        ra một môi trường hoạt động nhóm hữu dụng, năng suất hơn, từ đó mang lại
        một kết quả tốt nhất cho mục tiêu học tập và làm việc nhóm của bạn.
      </div>
      <h4 className="feature-label">Chức năng</h4>
      <div className="label">
        Những chức năng thông dụng mà <strong>EZTeam</strong> sẽ mang đến cho
        bạn như:
      </div>
      <div className="feature-list">
        <div className="feature-item">
          <FiCircle className="icon-circle" />
          <CIcon name="cil-group" className="feature-item-icon icon-group" />
          <div className="feature-name">Quản lý nhóm</div>
        </div>

        <div className="feature-item">
          <FiCircle className="icon-circle" />
          <div className="special-icon-group">
            <BiTask className="feature-item-icon" />
            <div className="background"></div>
            <ImUsers className="group-icon" />
          </div>
          <div className="feature-name">Quản lý công việc nhóm </div>
        </div>
        <div className="feature-item">
          <FiCircle className="icon-circle" />
          <div className="special-icon-group">
            <BiTask className="feature-item-icon" />
            <div className="background"></div>
            <ImUser className="user-icon" />
          </div>
          <div className="feature-name">Quản lý công việc cá nhân </div>
        </div>
        <div className="feature-item">
          <FiCircle className="icon-circle" />
          <CIcon name="cil-newspaper" className="feature-item-icon news-icon" />
          <div className="feature-name">Xem / Tạo bản tin, tin tức</div>
        </div>
        <div className="feature-item">
          <FiCircle className="icon-circle" />
          <AiOutlineComment className="feature-item-icon " />
          <div className="feature-name">Nhắn tin, tương tác</div>
        </div>
        <div className="feature-item">
          <FiCircle className="icon-circle" />
          <ImFilesEmpty className="feature-item-icon icon-files" />
          <div className="feature-name">
            Quản lý / Tải lên / Tải xuống tài liệu, tập tin
          </div>
        </div>
      </div>
      <div className="label-more">
        Tìm hiểu thêm <span onClick={openGuideTab}>Tại đây</span>
      </div>
    </div>
  );
}

export default IntroPage;
