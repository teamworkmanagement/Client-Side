import React from "react";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import "./Post.scss";
import ContentToolBar from "../ContentToolBar/ContentToolBar";
import Comment from "../Comment/Comment";
import Divider from "src/shared_components/MySharedComponents/Divider/Divider";
import CommentList from "../CommentList/CommentList";
import LoadMore from "../LoadMore/LoadMore";
import MyComment from "../MyComment/MyComment";
import moment from "moment";

const Post = (props) => {
  // render
  return (
    <CRow className="post-item-container">
      <CCard className="post-item">
        <CCardHeader>
          <div className="author-infor">
            <div className="author-avatar c-avatar">
              <img
                src={props.postObj.userAvatar}
                className="c-avatar-img"
                alt="avatar"
              />
            </div>
            <div className="author-name">{props.postObj.userName}</div>
          </div>
          <div className="post-date ">
            {moment(props.postObj.postCreatedAt).format("DD/MM/YYYY hh:mma")}
          </div>
        </CCardHeader>
        <CCardBody>{props.postObj.postContent}</CCardBody>
        <ContentToolBar comments={props.postObj.postCommentCount} />
        <Divider />
        <MyComment />
        <CommentList postId={props.postObj.postId} />
        {/*<LoadMore />*/}
      </CCard>
    </CRow>
  );
};

export default Post;
