import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./PostList.scss";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import postApi from "src/api/postApi";
import { setCurrentPostPage, setFilterChange } from "src/appSlice";
import Empty from "../Post/Empty/Empty";

PostList.propTypes = {};

function PostList(props) {
  const [listPosts, setListPosts] = useState([]);

  const dispatch = useDispatch();
  const latestPosts = useRef(null);
  latestPosts.current = listPosts;

  const pageNumber = useSelector((state) => state.app.currentPostPage);
  const userId = '8650b7fe-2952-4b03-983c-660dddda9029';
  const filterChanged = useSelector(state => state.app.filterChanged);

  useEffect(() => {
    async function getPosts() {
      try {
        const params = {
          ...props.filter,
          SkipItems: filterChanged ? 0 : listPosts.length,
        }
        
        const outPut = await postApi.getPagination({ params });

        if (filterChanged) {
          dispatch(setFilterChange(false));
          setListPosts(outPut.data.items);
        }
        else {
          const cur = [...latestPosts.current];
          const las = cur.concat(outPut.data.items);
          setListPosts(las);
        }
      } catch (err) {
        console.log(err);
      }
      finally {

      }
    }

    getPosts();
  }, [pageNumber, props.filter]);


  useEffect(() => {
    window.onscroll = function (ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        dispatch(setCurrentPostPage());
      }
    };
  }, [])

  const renderListPost = listPosts.map(item => {
    return <Post post={item} key={item.postId} />
  });

  return (
    <div>
      {
        listPosts.length === 0 ? <Empty /> : renderListPost
      }
    </div>
  );
}

export default PostList;
