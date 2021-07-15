import { CCollapse } from "@coreui/react";
import React, { useState } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import "./GuidePage.scss";

function GuidePage(props) {
  const [showCreateTeam, setShowCreateTeam] = useState(false);

  return (
    <div className="guide-page">
      <h4 className="">Hướng dẫn sử dụng các chức năng của ứng dụng</h4>
      <div
        className={`toggle-label ${showCreateTeam ? "opening" : ""}`}
        onClick={() => setShowCreateTeam(!showCreateTeam)}
      >
        <BsFillCaretRightFill className={`icon-arrow `} />
        Tạo nhóm
      </div>
      <div
        className={`toggle-label ${showCreateTeam ? "opening" : ""}`}
        onClick={() => setShowCreateTeam(!showCreateTeam)}
      >
        <BsFillCaretRightFill className={`icon-arrow `} />
        Thêm thành viên nhóm
      </div>
      <div
        className={`toggle-label ${showCreateTeam ? "opening" : ""}`}
        onClick={() => setShowCreateTeam(!showCreateTeam)}
      >
        <BsFillCaretRightFill className={`icon-arrow `} />
        Tạo công việc nhóm
      </div>
      <div
        className={`toggle-label ${showCreateTeam ? "opening" : ""}`}
        onClick={() => setShowCreateTeam(!showCreateTeam)}
      >
        <BsFillCaretRightFill className={`icon-arrow `} />
        Cập nhật công việc
      </div>
      <div
        className={`toggle-label ${showCreateTeam ? "opening" : ""}`}
        onClick={() => setShowCreateTeam(!showCreateTeam)}
      >
        <BsFillCaretRightFill className={`icon-arrow `} />
        Tải lên tài liệu
      </div>
      <div
        className={`toggle-label ${showCreateTeam ? "opening" : ""}`}
        onClick={() => setShowCreateTeam(!showCreateTeam)}
      >
        <BsFillCaretRightFill className={`icon-arrow `} />
        Thống kê tiến độ
      </div>
      <div
        className={`toggle-label ${showCreateTeam ? "opening" : ""}`}
        onClick={() => setShowCreateTeam(!showCreateTeam)}
      >
        <BsFillCaretRightFill className={`icon-arrow `} />
        Nhắn tin
      </div>
      <div
        className={`toggle-label ${showCreateTeam ? "opening" : ""}`}
        onClick={() => setShowCreateTeam(!showCreateTeam)}
      >
        <BsFillCaretRightFill className={`icon-arrow `} />
        Cập nhật thông tin tài khoản
      </div>
      <div
        className={`toggle-label ${showCreateTeam ? "opening" : ""}`}
        onClick={() => setShowCreateTeam(!showCreateTeam)}
      >
        <BsFillCaretRightFill className={`icon-arrow `} />
        Đổi mật khẩu
      </div>
      <CCollapse show={showCreateTeam}></CCollapse>
    </div>
  );
}

export default GuidePage;
