import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./PostList.scss";
import Post from "../Post/Post";
import postApi from "src/api/postApi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPostPage } from "src/appSlice";

PostList.propTypes = {};

PostList.propTypes = {};
function PostList(props) {
  const [listPosts, setListPosts] = useState([]);
  const dispatch = useDispatch();
  const latestPosts = useRef(null);
  latestPosts.current = listPosts;

  const pageNumber = useSelector((state) => state.app.currentPostPage);

  useEffect(() => {
    async function getPosts() {
      const outPut = await postApi.getPagination({
        pageNumber: pageNumber,
        pageSize: 3,
      });
      const cur = [...latestPosts.current];
      const las = cur.concat(outPut.data.items);
      console.log(las);
      setListPosts(las);
    }

    getPosts();
  }, [pageNumber]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return function release() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = async () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      loadMoreItems();
    }
  };

  const loadMoreItems = () => {
    dispatch(setCurrentPostPage());
  };

  return (
    <div>
      {listPosts.map((obj, index) => (
        <Post key={index} postObj={obj} />
      ))}
    </div>
  );
}

export default PostList;
