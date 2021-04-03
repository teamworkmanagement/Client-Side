import React from "react";
import PropTypes from "prop-types";
import { CInput, CTextarea } from "@coreui/react";
import "./MyComment.scss";
MyComment.propTypes = {};

function MyComment(props) {
  return (
    <div className="my-comment">
      <div className="author-avatar c-avatar">
        <img
          src="avatars/6.jpg"
          className="c-avatar-img"
          alt="admin@bootstrapmaster.com"
        />
      </div>
      <CInput id="name" autoComplete="off" placeholder="Viết bình luận..." />
    </div>
  );
}

export default MyComment;
