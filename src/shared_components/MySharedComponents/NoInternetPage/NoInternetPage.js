import React from "react";
import PropTypes from "prop-types";
import "./NoInternetPage.scss";

NoInternetPage.propTypes = {};

function NoInternetPage(props) {
  function reloadPage() {
    //reload current page content
    //note: không load lại web, chỉ gọi lại api
  }
  return (
    <div className="no-internet-page-container">
      <img
        className="normal"
        alt=""
        src="../images/nointernet/nointernet.png"
      />
      <img
        alt=""
        className="full-width"
        src="../images/nointernet/nointernet.png"
      />
      <div className="content">Không có kết nối mạng!</div>
      <div className="back-home-btn" onClick={reloadPage}>
        Thử tải lại trang
      </div>
    </div>
  );
}

export default NoInternetPage;
