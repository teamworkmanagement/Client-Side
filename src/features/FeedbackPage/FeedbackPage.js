import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FeedbackPage.scss";
import { RiMailStarLine } from "react-icons/ri";
import { CTextarea } from "@coreui/react";
import { toast } from "react-toastify";
import CustomToast from "src/shared_components/MySharedComponents/CustomToast/CustomToast";
import userApi from "src/api/userApi";
import { useSelector } from "react-redux";

FeedbackPage.propTypes = {};

function FeedbackPage(props) {
  const user = useSelector(state => state.auth.currentUser);
  function sendFeedback() {
    if (!value)
      return;

    userApi.feedback({
      userFeedbackId: user.id,
      feedbackContent: value,
    }).then(res => {
      toast(
        <CustomToast
          type="success"
          title="Gửi thành công"
          message="Cảm ơn bạn đã đóng góp ý kiến cho ứng dụng!"
        />
      );
    }).catch(err => {

    })
      .finally(() => {
        setValue('');
      })

  }

  const [value, setValue] = useState('');
  return (
    <div className="feedback-page-container">
      <div className="feedback-page-content">
        <div className="title">
          <RiMailStarLine className="icon-title" />
          Những góp ý đáng giá của bạn sẽ giúp chúng tôi cải thiện ứng dụng tốt
          hơn!
        </div>
        <CTextarea value={value} onChange={(e) => setValue(e.target.value)} className="feedback-box" />
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
