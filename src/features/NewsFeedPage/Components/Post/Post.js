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
import { useSelector } from "react-redux";
import PostEditor from "../PostEditor/PostEditor";
import CustomInput from "../CustomInput/CustomInput";
import { convertToRaw } from "draft-js";
import FbImageLibrary from "react-fb-image-grid";

moment.locale("vi");
Post.propTypes = {};

function Post(props) {
  const [cmtLists, setComments] = useState([]);
  const [loadComment, setLoadComment] = useState(0);
  const [post, setPost] = useState({ ...props.post });
  const [commentContent, setCommentContent] = useState("");
  const user = useSelector((state) => state.auth.currentUser);
  const [resetEditor, setResetEditor] = useState(0);

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
      userId: user.id,
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
            commentUserId: user.id,
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
                userName: user.fullName,
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

  const saveContent = (editorState) => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    let value = blocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("<br>");

    //tags
    const obj = convertToRaw(editorState.getCurrentContent());

    const mentions = [];
    const entityMap = obj.entityMap;

    for (const property in entityMap) {
      if (entityMap[property].type === "mention")
        mentions.push(entityMap[property].data.mention);
    }

    //add tag to
    mentions.forEach((m) => {
      value = value.replace(
        m.name,
        '<strong className="tag-user">@' + m.name + "</strong>"
      );
    });

    commentApi
      .addComment({
        commentPostId: post.postId,
        commentUserId: user.id,
        commentContent: value,
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
            userName: user.fullName,
            commentCreatedAt: res.data.commentCreatedAt,
          },
        ].concat([...cmtLists]);

        setComments(newArrr);
      })
      .catch((err) => {});

    console.log(value);
  };

  const listImages = [
    "https://momoshop.com.vn/wp-content/uploads/2018/11/balo-laptop-dep8623079002_293603435.jpg",

    "https://balotuankhoi.com/wp-content/uploads/2020/10/xuong-may-balo-laptop-balotuankhoi.com_.jpg",

    "https://ohay.vn/blog/wp-content/uploads/2020/06/ba-lo-laza11.jpg",

    "https://balotuankhoi.com/wp-content/uploads/2020/10/xuong-may-balo-laptop-balotuankhoi.com_.jpg",

    "https://balotuankhoi.com/wp-content/uploads/2020/10/xuong-may-balo-laptop-balotuankhoi.com_.jpg",

    "https://balotuankhoi.com/wp-content/uploads/2020/10/xuong-may-balo-laptop-balotuankhoi.com_.jpg",
  ];

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
              <strong>
                {user.id === post.postUserId ? user.fullName : post.userName}
              </strong>{" "}
              {!props.isInTeam && `đã đăng trong nhóm `}
              {!props.isInTeam && <strong>{post.teamName}</strong>}
            </div>
            <div className="post-date">
              {moment(post.postCreatedAt).format("hh:mm, DD/MM/YYYY")}
              <CIcon name="cil-clock" />
            </div>
          </div>
        </div>
        <div className="post-actions">
          <CIcon className="rotate-90" name="cil-options" />
        </div>
      </div>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.postContent }}
      ></div>
      <div className="post-images-list-container">
        <FbImageLibrary images={listImages} />
      </div>
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
          <img alt="" src="../avatars/6.jpg" />
        </div>
        <div className="input-container">
          {/*<CInput
            type="text"
            placeholder="Viết bình luận..."
            value={commentContent}
            onKeyDown={() => { }}
            onChange={(e) => setCommentContent(e.target.value)}
          />*/}

          <CustomInput saveContent={saveContent} teamId={post.postTeamId} />
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
