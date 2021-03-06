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
import {
  setNewAddReact,
  setNewComment,
  setRemoveReact,
} from "src/utils/signalr/signalrSlice";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { toast } from "react-toastify";
import CustomToast from "src/shared_components/MySharedComponents/CustomToast/CustomToast";

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
        return (
          <div
            className="normal-text-comment"
            dangerouslySetInnerHTML={{ __html: ele }}
          ></div>
        );
      } else {
        return <Tag userId={ele} />;
      }
    });
  };

  function replaceOffset(str, offs) {
    let tag = "<@tag>";
    offs.reverse().forEach(function (v) {
      str = str.replace(
        new RegExp("(.{" + v[0] + "})(.{" + (v[1] - v[0]) + "})"),
        "$1" + tag + "$2" + tag + ""
      );
    });
    return str;
  }

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
        let offsets = [];
        let users = [];
        block.entityRanges.forEach((entity) => {
          // var nameTag = block.text.substring(
          //   entity.offset,
          //   entity.offset + entity.length
          // );

          let indexData = entity.key;
          const userTagId = entityMap[indexData].data.mention.id;

          offsets.push([entity.offset, entity.offset + entity.length]);
          users.push(userTagId);
        });

        let newStr = replaceOffset(block.text, offsets);
        console.log(newStr);
        let myArray = newStr.split("<@tag>");
        let j = 0;
        for (let i = 0; i < myArray.length; i++) {
          if (i % 2 !== 0) {
            myArray[i] = `<@tag>${users[j]}<@tag>`;
            j++;
          } else {
            continue;
          }
        }

        const finalStr = myArray.join("");
        console.log(myArray);
        console.log(finalStr);
        block.text = finalStr;
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
      .then((res) => { })
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
        });
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

  const onRemovePost = () => {
    console.log('on remove: ', post.postId)
    postApi.deletePost(post.postId)
      .then(res => {
        props.onDeletePost(post);
        toast(
          <CustomToast
            type="success"
            title="Th??ng b??o"
            message="X??a th??nh c??ng!"
          />
        );
      }).catch(err => {
        toast(
          <CustomToast
            type="error"
            title="L???i"
            message="C?? l???i x???y ra!"
          />)
      })
  }

  const onReportPost = () => {
    console.log('on report: ', post.postId);
    postApi.postReport({
      postId: post.postId,
    }).then(res => {
      toast(
        <CustomToast
          type="success"
          title="Th??ng b??o"
          message="B??o c??o th??nh c??ng!"
        />)
    }).catch(err => {
      if (err.ErrorCode && err.ErrorCode === '409') {
        toast(
          <CustomToast
            type="error"
            title="L???i"
            message="B???n ???? b??o c??o n???i dung n??y!"
          />);

        return;
      }
      toast(
        <CustomToast
          type="error"
          title="L???i"
          message="C?? l???i x???y ra!"
        />)
    })
  }

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
              {!props.isInTeam && `???? ????ng trong nh??m `}
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
        <div className="post-actions">
          <div className="post-header-actions-dropdown">
            <CDropdown>
              <CDropdownToggle id="dropdownMenuButton" caret>
                <div className="lane-actions">
                  <CIcon name="cil-options" className="rotate-90" />
                </div>
              </CDropdownToggle>
              <CDropdownMenu
                aria-labelledby="dropdownMenuButton"
                placement="bottom-end"
              >
                {post.postUserId !== user.id && <CDropdownItem onClick={onReportPost} className="first">
                  <CIcon name="cil-flag-alt" />
                  B??o c??o
                </CDropdownItem>}

                {post.showDelete && <CDropdownItem onClick={onRemovePost} className="last">
                  <CIcon name="cil-trash" className="icon-delete" />
                  X??a
                </CDropdownItem>}
              </CDropdownMenu>
            </CDropdown>
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

      {post.postCommentCount !== cmtLists.length && (
        <div className="load-more-comment">
          <div onClick={seeMore}>
            <i>Xem th??m </i>
          </div>
          <div className="rotate">&#171;</div>
        </div>
      )}
    </div>
  );
}

export default Post;
