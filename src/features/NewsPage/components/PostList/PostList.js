import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./PostList.scss";
import Post from "../Post/Post";
import postApi from "src/api/postApi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPostPage } from "src/appSlice";
import store from "src/app/store";
import { setValueAuth } from "src/shared_components/views/pages/login/authSlice";
import testApi from "src/api/testApi";
import { getAllGroupChatForUser } from "src/features/ChatPage/chatSlice";
import { getTest } from "src/api/testSlice";

PostList.propTypes = {};

PostList.propTypes = {};
function PostList(props) {
  const [listPosts, setListPosts] = useState([]);
  const dispatch = useDispatch();
  const latestPosts = useRef(null);
  latestPosts.current = listPosts;

  const pageNumber = useSelector((state) => state.app.currentPostPage);
  const userId = useSelector(state => state.auth.currentUser.id);

  useEffect(() => {
    async function getPosts() {
      try {
        const params = {
          UserId: userId,
          PageSize: 3,
          SkipItems: listPosts.length,
        }
        const outPut = await postApi.getPagination({ params });
        const cur = [...latestPosts.current];
        const las = cur.concat(outPut.data.items);
        console.log(las);
        setListPosts(las);
      } catch (err) {
        console.log(err);
      }

    }

    getPosts();
  }, [pageNumber]);

  const onButtonClick = () => {
    try {
      dispatch(getAllGroupChatForUser(userId));
    } catch (err) {
      console.log(err);
    }

  }

  const onLogout = () => {
    document.cookie = `backup=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    document.cookie = `TokenExpired=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    store.dispatch(setValueAuth(false));
  }

  return (
    <div>
      <button onClick={onButtonClick}>Test get</button>
      <button onClick={onLogout}>Log out</button>
      {listPosts.map((obj) => (
        <Post key={obj.postId} postObj={obj} />
      ))}
    </div>
  );
}

export default PostList;
