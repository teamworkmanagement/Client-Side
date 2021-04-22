import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Post.scss";
import CIcon from "@coreui/icons-react";
import CommentItem from "./Components/CommentItem/CommentItem";
import { CInput } from "@coreui/react";
import moment from "moment";
import 'moment/locale/vi';
import commentApi from "src/api/commentApi";

moment.locale("vi");
Post.propTypes = {};

function Post(props) {
  const [cmtLists, setComments] = useState([]);
  const [loadComment, setLoadComment] = useState(0);

  useEffect(() => {
    async function getComments() {
      const params = {
        PostId: props.post.postId,
        PageSize: 2,
        SkipItems: cmtLists.length,
      };
      const comments = await commentApi.getPagination(params);
      setComments([...cmtLists].concat(comments.data.items));
    }

    getComments();
  }, [props.post, loadComment]);

  const seeMore = () => {
    setLoadComment(loadComment + 1);
  }

  
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
              <strong>{props.post.userName}</strong> đã đăng trong nhóm{" "}
              <strong>{props.post.teamName}</strong>
            </div>
            <div className="post-date">
              {moment(props.post.postCreatedAt).format("l")}
              <CIcon name="cil-clock" />
            </div>
          </div>
        </div>
        <div className="post-actions">
          <CIcon name="cil-options" />
        </div>
      </div>
      <div className="post-content">
        {props.post.postContent}
      </div>
      <div className="interaction-bar">
        <CIcon name="cil-heart" className="is-love-icon loved" />
        <div className="love-count">{props.post.postReactCount}</div>
        <CIcon name="cil-comment-square" className="comment-icon" />
        <div className="comment-count">{props.post.postCommentCount}</div>
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
        {
          cmtLists.map(item => {
            return <CommentItem comment={item} key={item.commentId} />
          })
        }
      </div>

      <div className="load-more-comment">
        <div onClick={seeMore}>
          <i>Xem thêm</i>
        </div>
        <div className="rotate">&#171;</div>
      </div>
    </div>
  );
}

export default Post;
