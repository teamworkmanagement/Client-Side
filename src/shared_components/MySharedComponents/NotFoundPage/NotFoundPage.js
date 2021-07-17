import React, { useEffect, useState } from "react";
import "./NotFoundPage.scss";
import NotiPopup from "../NotiPopup/NotiPopup";
import { useHistory } from "react-router-dom";

function NotFoundPage(props) {
  const [showNotiPopup, setShowNotiPopup] = useState(false);
  const history = useHistory();
  function goBackHome() {
    history.push({
      pathname: "/dashboard",
      search: null,
    });
  }

  function onCloseNotiPopup() {
    setShowNotiPopup(false);
  }

  const [close, setClose] = useState(false);

  useEffect(() => {
    if (history.location.pathname.includes('meetingvideo')) {
      setClose(true);
    }
  }, [history.location.pathname])

  const onCloseTab = () => {
    window.close();
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
      {!close ? <div className="back-home-btn" onClick={goBackHome}>
        Quay về trang chủ
      </div> : <div className="back-home-btn" onClick={onCloseTab}>
        Đóng
      </div>}
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
