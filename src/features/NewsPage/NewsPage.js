import React, { useEffect, useRef } from "react";
import { CRow, CCol, CCard } from "@coreui/react";
import Post from "./components/Post/Post";
import PostToolBar from "./components/PostToolBar/PostToolBar";
import "./NewsPage.scss";

import PostList from "./components/PostList/PostList";
import { useDispatch } from "react-redux";
import { setCurrentPostPage } from "src/appSlice";
const NewsPage = () => {
  const dispatch = useDispatch();

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      console.log('reach bottom');
      dispatch(setCurrentPostPage());
    }
  }
  // render
  return (
    <CRow className="news-page-container">
      <CRow onScroll={handleScroll} className="row-content">
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
