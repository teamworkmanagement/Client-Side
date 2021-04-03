import React from "react";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import "./Post.scss";
import ContentToolBar from "../ContentToolBar/ContentToolBar";
import Comment from "../Comment/Comment";
import Divider from "src/shared_components/Divider/Divider";
import CommentList from "../CommentList/CommentList";
import LoadMore from "../LoadMore/LoadMore";
import MyComment from "../MyComment/MyComment";

const Post = () => {
  // render
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="author-infor">
              <div className="author-avatar c-avatar">
                <img
                  src={"avatars/1.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
              </div>
              <div className="author-name">Card with label</div>
            </div>
            <div className="post-date ">12/03/2021</div>
          </CCardHeader>
          <CCardBody>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </CCardBody>
          <ContentToolBar />
          <Divider />
          <MyComment />
          <CommentList />
          <LoadMore />
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Post;
