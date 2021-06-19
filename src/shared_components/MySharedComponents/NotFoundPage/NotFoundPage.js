import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NotFoundPage.scss";
import NotiPopup from "../NotiPopup/NotiPopup";
import { useHistory } from "react-router-dom";

NotFoundPage.propTypes = {};

function NotFoundPage(props) {
  const [showNotiPopup, setShowNotiPopup] = useState(false);
  const history = useHistory();
  function goBackHome() {
    history.push({
      pathname: '/dashboard',
      search: null,
    })
  }
  function testNotiPopup() {
    setShowNotiPopup(true);
  }
  function onCloseNotiPopup() {
    setShowNotiPopup(false);
  }
  return (
    <div className="not-found-page-container">
      <img className="normal" alt="" src="../images/notfound/notfound.png" />
      <img
        alt=""
        className="full-width "
        src="../images/notfound/notfound.png"
      />
      <div className="content">Nội dung này không tồn tại!</div>
      <div
        className="back-home-btn"
        onClick={goBackHome}
      >
        Quay về trang chủ
      </div>
      <NotiPopup
        popupType="info"
        popupMessage="Test thôi"
        popupButtonText="Đóng"
        showNotiPopup={showNotiPopup}
        onClose={onCloseNotiPopup}
      />
    </div>
  );
}

export default NotFoundPage;
