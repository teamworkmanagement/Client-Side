import React, { useEffect, useState } from "react";
import "./Post.scss";
import CIcon from "@coreui/icons-react";
import CommentItem from "./Components/CommentItem/CommentItem";

import moment from "moment";
import "moment/locale/vi";
import commentApi from "src/api/commentApi";
import classNames from "classnames";
import postApi from "src/api/postApi";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../CustomInput/CustomInput";
import { convertToRaw } from "draft-js";
import GridImages from "./Components/GridImages/GridImages";
import { useHistory } from "react-router-dom";
import Tag from "./Components/Tag/Tag";
import AvatarImage from "src/shared_components/MySharedComponents/AvatarComponent/Components/AvatarImage/AvatarImage";
import { setNewAddReact, setNewComment, setRemoveReact } from "src/utils/signalr/signalrSlice";

moment.locale("vi");

function Post(props) {
  const [cmtLists, setComments] = useState([]);
  const [loadComment, setLoadComment] = useState(0);
  const [post, setPost] = useState({ ...props.post });
  const user = useSelector((state) => state.auth.currentUser);
  const newAddReact = useSelector((state) => state.signalr.newAddReact);
  const removeReact = useSelector((state) => state.signalr.removeReact);
  const newComment = useSelector((state) => state.signalr.newComment);

  const dispatch = useDispatch();

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
        .then((res) => { })
        .catch((err) => { })
      : postApi
        .reactPost(params)
        .then((res) => { })
        .catch((err) => { });
  };

  String.prototype.replaceBetween = function (start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
  };

  const mapStringToJsx = (str) => {
    const myArr = str.split("<@tag>");
    return myArr.map((ele, index) => {
      if (index % 2 === 0) {
        return <div dangerouslySetInnerHTML={{ __html: ele }}></div>;
      } else {
        return <Tag userId={ele} />;
      }
    });
  };
  const saveContent = (editorState) => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    if (blocks.length === 1) {
      if (blocks[0].text === "") return;
    }
    const cloneBlocks = [...blocks];

    //tags
    const obj = convertToRaw(editorState.getCurrentContent());

    const mentions = [];
    const entityMap = obj.entityMap;

    //console.log(entityMap);
    console.log(obj);
    for (const property in entityMap) {
      if (entityMap[property].type === "mention")
        mentions.push(entityMap[property].data.mention);
    }

    //console.log(cloneBlocks);

    cloneBlocks.forEach((block, index) => {
      if (block.entityRanges.length > 0) {
        block.entityRanges.forEach((entity) => {
          // var nameTag = block.text.substring(
          //   entity.offset,
          //   entity.offset + entity.length
          // );

          let indexData = entity.key;
          const userTagId = entityMap[indexData].data.mention.id;

          block.text = block.text.replaceBetween(
            entity.offset,
            entity.offset + entity.length,
            `<@tag>${userTagId}<@tag>`
          );
          console.log(block.text);
        });
      }
    });

    let value = cloneBlocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("<br>");

    let userIds = [];
    if (mentions.length > 0) {
      userIds = mentions.map((m) => m.id);
    }

    console.log(value);

    return;
    commentApi
      .addComment({
        commentPostId: post.postId,
        commentUserId: user.id,
        commentUserAvatar: user.userAvatar,
        commentUserName: user.fullName,
        commentTeamId: post.postTeamId,
        commentContent: value,
        commentCreatedAt: new Date().toISOString(),
        commentIsDeleted: false,
        commentUserTagIds: userIds,
      })
      .then((res) => {

      })
      .catch((err) => { });
  };

  useEffect(() => {
    if (!newAddReact) return;

    console.log(newAddReact);
    if (newAddReact.postId === post.postId) {
      if (newAddReact.userId === user.id) {
        setPost({
          ...post,
          postReactCount: post.postReactCount + 1,
          isReacted: true,
        });
      } else {
        setPost({
          ...post,
          postReactCount: post.postReactCount + 1,
        });
      }
    }
    if (newAddReact) {
      dispatch(setNewAddReact(null));
    }
  }, [newAddReact]);

  useEffect(() => {
    if (!removeReact) return;

    console.log(removeReact);
    if (removeReact.postId === post.postId) {
      if (removeReact.userId === user.id) {
        setPost({
          ...post,
          postReactCount: post.postReactCount - 1,
          isReacted: false,
        });
      } else {
        setPost({
          ...post,
          postReactCount: post.postReactCount - 1,
        })
      }
    }
    if (removeReact) {
      dispatch(setRemoveReact(null));
    }
  }, [removeReact]);

  useEffect(() => {
    if (!newComment) return;
    if (newComment.commentPostId === post.postId) {
      setComments([newComment].concat([...cmtLists]));
      setPost({
        ...post,
        postCommentCount: post.postCommentCount + 1,
      });
      console.log(newComment);
    }
    if (newComment) {
      dispatch(setNewComment(null));
    }
  }, [newComment]);

  const history = useHistory();

  const navigateToTeam = (post) => {
    history.push(`/team/${post.postTeamId}?tab=teaminfo`);
  };

  return (
    <div className="post-container" style={{ zIndex: props.index }}>
      <div className="post-header">
        <div className="post-infor">
          <div className="poster-avatar">
            <AvatarImage
              userName={
                user.id === post.postUserId ? user.fullName : post.userName
              }
              userImage={
                user.id === post.postUserId ? user.userAvatar : post.userAvatar
              }
              userId={post.postUserId}
              disable={false}
            />
          </div>
          <div className="poster-infor">
            <div className="name-and-group">
              <strong>
                {user.id === post.postUserId ? user.fullName : post.userName}
              </strong>{" "}
              {!props.isInTeam && `đã đăng trong nhóm `}
              {!props.isInTeam && (
                <strong onClick={() => navigateToTeam(post)}>
                  {post.teamName}
                </strong>
              )}
            </div>
            <div className="post-date">
              {moment(post.postCreatedAt).format("HH:MM, DD/MM/YYYY")}
              <CIcon name="cil-clock" />
            </div>
          </div>
        </div>
      </div>
      <div className="post-content">{mapStringToJsx(post.postContent)}</div>
      <div className="post-images-list-container">
        <GridImages countFrom={5} images={post.postImages} />
      </div>
      <div className="interaction-bar">
        <CIcon
          name="cil-heart"
          className={classNames("is-love-icon", { loved: post.isReacted })}
          onClick={onLoveClick}
        />
        <div className="love-count">{post.postReactCount}</div>
        <CIcon name="cil-speech" className="comment-icon" />
        <div className="comment-count">{post.postCommentCount}</div>
      </div>
      <div className="my-comment">
        <div className="my-avatar">
          <img alt="" src={user.userAvatar} />
        </div>
        <div className="input-container">
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
