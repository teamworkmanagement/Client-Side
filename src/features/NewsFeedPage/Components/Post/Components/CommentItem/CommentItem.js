import React from "react";
import PropTypes from "prop-types";
import "./CommentItem.scss";
import moment from "moment";
import 'moment/locale/vi';
import Tag from "../Tag/Tag";

moment.locale('vi');

CommentItem.propTypes = {};

function CommentItem({ comment }) {
  const mapStringToJsx = (str) => {
    const myArr = str.split('<@tag>');
    return myArr.map((ele, index) => {
      if (index % 2 === 0) {
        return <div dangerouslySetInnerHTML={{ __html: ele }}></div>
      }
      else {
        return <Tag userId={ele} />
      }

    })
  }
  return (
    <div className="comment-item-container">
      <div className="commenter-avatar">
        <img alt="" src={comment.userAvatar} />
      </div>
      <div className="comment-infor">
        <div className="comment-header">
          <div className="commenter-name">{comment.userName}</div>
          <div className="comment-date">{moment(comment.commentCreatedAt).format('l')}</div>
        </div>
        <div className="comment-content" >
          {mapStringToJsx(comment.commentContent)}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
