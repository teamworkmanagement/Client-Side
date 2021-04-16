import React from "react";
import PropTypes from "prop-types";
import "./CommentItem.scss";

CommentItem.propTypes = {};

function CommentItem(props) {
  return (
    <div className="comment-item-container">
      <div className="commenter-avatar">
        <img alt="" src="http://emilus.themenate.net/img/avatars/thumb-6.jpg" />
      </div>
      <div className="comment-infor">
        <div className="comment-header">
          <div className="commenter-name">Athony Dũng</div>
          <div className="comment-date">18/03/2021</div>
        </div>
        <div className="comment-content">
          Vô cùng thuyết phục, tào lao rất hay!!
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
