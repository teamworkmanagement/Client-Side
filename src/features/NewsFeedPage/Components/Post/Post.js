import React from "react";
import PropTypes from "prop-types";
import "./Post.scss";
import CIcon from "@coreui/icons-react";
import CommentItem from "./Components/CommentItem/CommentItem";
import { CInput } from "@coreui/react";

Post.propTypes = {};

function Post(props) {
  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-infor">
          <div className="poster-avatar">
            <img
              alt="avatar"
              src="http://emilus.themenate.net/img/avatars/thumb-4.jpg"
            />
          </div>
          <div className="poster-infor">
            <div className="name-and-group">
              <strong>Nguyễn Khoa</strong> đã đăng trong nhóm{" "}
              <strong>Anh Văn TOEIC</strong>
            </div>
            <div className="post-date">
              24/01/2021
              <CIcon name="cil-clock" />
            </div>
          </div>
        </div>
        <div className="post-actions">
          <CIcon name="cil-options" />
        </div>
      </div>
      <div className="post-content">
        Bộ Công an sẽ "chống ma túy như chống Covid-19", không chỉ bắt giữ ở
        trong nước mà chủ động tấn công từ bên ngoài, theo Thứ trưởng Bộ Công an
        Lê Quý Vương.
        <br /> Ngày 16/4, Văn phòng Chủ tịch nước công bố Luật Phòng Chống ma
        tuý (sửa đổi) đã được Quốc hội thông qua tại kỳ họp thứ 11, Quốc hội
        khoá XIV. <br />
        Thượng tướng Lê Quý Vương cho biết, luật quy định "ưu tiên nguồn lực
        phòng, chống ma tuý cho vùng đồng bào dân tộc thiểu số và miền núi, vùng
        sâu, vùng xa, hải đảo, khu vực biên giới và địa bàn phức tạp về ma tuý".
      </div>
      <div className="interaction-bar">
        <CIcon name="cil-heart" className="is-love-icon loved" />
        <div className="love-count">12</div>
        <CIcon name="cil-comment-square" className="comment-icon" />
        <div className="comment-count">4</div>
      </div>
      <div className="my-comment">
        <div className="my-avatar">
          <img alt="" src="avatars/6.jpg" />
        </div>
        <div className="input-container">
          <CInput type="text" placeholder="Viết bình luận..." />
        </div>
      </div>
      <div className="comment-list">
        <CommentItem />
        <CommentItem />
      </div>

      <div className="load-more-comment">
        <div>
          <i>Xem thêm</i>
        </div>
        <div className="rotate">&#171;</div>
      </div>
    </div>
  );
}

export default Post;
