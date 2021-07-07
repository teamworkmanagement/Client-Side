import React from "react";
import "./NoInternetPage.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "../CustomToast/CustomToast";

function NoInternetPage(props) {
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
