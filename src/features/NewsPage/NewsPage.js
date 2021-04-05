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
    <div className="k-post">
      <div className="k-post-content">
        <PostList />
      </div>
      <div className="k-post-tool">
        <PostToolBar />
      </div>
    </div>
  );
};

export default NewsPage;
