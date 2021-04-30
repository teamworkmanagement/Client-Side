import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Post.scss";
import CIcon from "@coreui/icons-react";
import CommentItem from "./Components/CommentItem/CommentItem";
import { CInput } from "@coreui/react";
import moment from "moment";
import "moment/locale/vi";
import commentApi from "src/api/commentApi";
import classNames from "classnames";
import postApi from "src/api/postApi";

moment.locale("vi");
Post.propTypes = {};

function Post(props) {
  const [cmtLists, setComments] = useState([]);
  const [loadComment, setLoadComment] = useState(0);
  const [post, setPost] = useState({ ...props.post });
  const [commentContent, setCommentContent] = useState("");

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
  };

  const onLoveClick = () => {
    const params = {
      postId: post.postId,
      userId: "8650b7fe-2952-4b03-983c-660dddda9029",
    };
    post.isReacted
      ? postApi
          .deleteReactPost({ params })
          .then((res) => {})
          .catch((err) => {})
      : postApi
          .reactPost(params)
          .then((res) => {})
          .catch((err) => {});

    setPost({
      ...post,
      postReactCount: post.isReacted
        ? post.postReactCount - 1
        : post.postReactCount + 1,
      isReacted: !post.isReacted,
    });
  };

  const onAddComment = (e) => {
    if (e.key === "Enter") {
      if (commentContent !== "") {
        console.log(commentContent);
        commentApi
          .addComment({
            commentPostId: post.postId,
            commentUserId: "8650b7fe-2952-4b03-983c-660dddda9029",
            commentContent: commentContent,
            commentCreatedAt: new Date().toISOString(),
            commentIsDeleted: false,
          })
          .then((res) => {
            setPost({
              ...post,
              postCommentCount: post.postCommentCount + 1,
            });

            const newArrr = [
              {
                commentId: res.data.commentId,
                commentPostId: res.data.commentPostId,
                commentUserId: res.data.commentUserId,
                commentContent: res.data.commentContent,
                userName: "Dungx Nguyeenx",
                commentCreatedAt: res.data.commentCreatedAt,
              },
            ].concat([...cmtLists]);

            setComments(newArrr);
          })
          .catch((err) => {});
      }
      setCommentContent("");
    }
  };
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
              <strong>{post.userName}</strong> đã đăng trong nhóm{" "}
              <strong>{post.teamName}</strong>
            </div>
            <div className="post-date">
              {moment(post.postCreatedAt).format("l")}
              <CIcon name="cil-clock" />
            </div>
          </div>
        </div>
        <div className="post-actions">
          <CIcon name="cil-options" />
        </div>
      </div>
      <div className="post-content">{post.postContent}</div>
      <div className="interaction-bar">
        <CIcon
          name="cil-heart"
          className={classNames("is-love-icon", { loved: post.isReacted })}
          onClick={onLoveClick}
        />
        <div className="love-count">{post.postReactCount}</div>
        <CIcon name="cil-comment-square" className="comment-icon" />
        <div className="comment-count">{post.postCommentCount}</div>
      </div>
      <div className="my-comment">
        <div className="my-avatar">
          <img alt="" src="avatars/6.jpg" />
        </div>
        <div className="input-container">
          <CInput
            type="text"
            placeholder="Viết bình luận..."
            value={commentContent}
            onKeyDown={onAddComment}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </div>
      </div>
      <div className="comment-list">
        {cmtLists.map((item) => {
          return <CommentItem comment={item} key={item.commentId} />;
        })}
      </div>

      <div className="load-more-comment">
        <div onClick={seeMore}>
          <i>Xem thêm </i>
        </div>
        <div className="rotate">&#171;</div>
      </div>
    </div>
  );
}

export default Post;
