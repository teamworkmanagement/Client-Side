import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NoInternetPage.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "../CustomToast/CustomToast";

NoInternetPage.propTypes = {};

function NoInternetPage(props) {
  function reloadPage() {
    //reload current page content
    //note: không load lại web, chỉ gọi lại api
  }
  const notify = () => {
    //type: "success", "error", "info"
    toast(
      <CustomToast
        type="success"
        title="Thành công"
        message="Hành động đã được thực hiện"
      />
    );
  };

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
      <div
        className="back-home-btn"
        //onClick={reloadPage}
        onClick={notify}
      >
        Thử tải lại trang
      </div>
      {/* <ToastContainer hideProgressBar /> */}
    </div>
  );
}

export default NoInternetPage;
