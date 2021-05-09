import React from "react";
import PropTypes from "prop-types";
import "./CommentItem.scss";
import moment from "moment";
import 'moment/locale/vi';

moment.locale('vi');

CommentItem.propTypes = {};

function CommentItem({ comment }) {
  return (
    <div className="comment-item-container">
      <div className="commenter-avatar">
        <img alt="" src="http://emilus.themenate.net/img/avatars/thumb-6.jpg" />
      </div>
      <div className="comment-infor">
        <div className="comment-header">
          <div className="commenter-name">{comment.userName}</div>
          <div className="comment-date">{moment(comment.commentCreatedAt).format('l')}</div>
        </div>
        <div className="comment-content" dangerouslySetInnerHTML={{ __html: comment.commentContent }}>

        </div>
      </div>
    </div>
  );
}

export default CommentItem;
