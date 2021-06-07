import React from "react";
import PropTypes from "prop-types";
import "./FeedbackPage.scss";
import { RiMailStarLine } from "react-icons/ri";
import { CTextarea } from "@coreui/react";
import { toast } from "react-toastify";
import CustomToast from "src/shared_components/MySharedComponents/CustomToast/CustomToast";

FeedbackPage.propTypes = {};

function FeedbackPage(props) {
  function sendFeedback() {
    toast(
      <CustomToast
        type="success"
        title="Gửi thành công"
        message="Cảm ơn bạn đã đóng góp ý kiến cho ứng dụng!"
      />
    );
  }
  return (
    <div className="feedback-page-container">
      <div className="feedback-page-content">
        <div className="title">
          <RiMailStarLine className="icon-title" />
          Những góp ý đáng giá của bạn sẽ giúp chúng tôi cải thiện ứng dụng tốt
          hơn!
        </div>
        <CTextarea className="feedback-box" />
        <div className="send-btn" onClick={sendFeedback}>
          Gửi đóng góp
        </div>
      </div>
      <div className="image-feedback ">
        <img alt="" src="../images/feedback/thankyou.png" />
      </div>
    </div>
  );
}

export default FeedbackPage;
