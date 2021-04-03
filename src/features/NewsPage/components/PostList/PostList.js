import React from "react";
import PropTypes from "prop-types";
import "./PostList.scss";
import Post from "../Post/Post";
PostList.propTypes = {};

function PostList(props) {
  return (
    <div>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default PostList;
