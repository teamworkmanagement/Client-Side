import React from "react";
import { CRow, CCol, CCard } from "@coreui/react";
import Post from "./components/Post/Post";
import PostToolBar from "./components/PostToolBar/PostToolBar";
import "./NewsPage.scss";

import PostList from "./components/PostList/PostList";
const NewsPage = () => {
  // render
  return (
    <CRow className="news-page-container">
      <CRow className="row-content">
        <CCol className="post-list col-9">
          <CCard className="card-1">
            <PostList />
          </CCard>
        </CCol>
        <CCol className="filter-tool col-3">
          <CCard className="card-2">
            <PostToolBar />
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  );
};

export default NewsPage;
