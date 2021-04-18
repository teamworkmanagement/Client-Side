import React from "react";
import PropTypes from "prop-types";
import "./PostList.scss";
import Post from "../Post/Post";
import PostForm from "../Post/Components/PostForm/PostForm";

PostList.propTypes = {};

function PostList(props) {
  return (
    <div>
      <Post />
      <Post />
    </div>
  );
}

export default PostList;
