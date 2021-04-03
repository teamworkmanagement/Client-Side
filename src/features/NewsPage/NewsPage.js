import React from "react";
import { CRow, CCol } from "@coreui/react";
import Post from "./components/Post/Post";
import PostToolBar from "./components/PostToolBar/PostToolBar";
import "./NewsPage.scss";
import PostList from "./components/PostList/PostList";
const NewsPage = () => {
  // render
  return (
    // <div className="k-post">
    //   <Content className="content" />
    //   <PostToolBar className="tool-bar" />
    // </div>
    <CRow className="k-post">
      <CCol sm="10" className="k-post-content">
        <PostList />
      </CCol>
      <CCol sm="2" className="k-post-tool">
        <PostToolBar />
      </CCol>
    </CRow>
  );
};

export default NewsPage;
