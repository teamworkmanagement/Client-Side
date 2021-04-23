import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./PostList.scss";
import Post from "../Post/Post";
import PostForm from "../Post/Components/PostForm/PostForm";
import { useDispatch, useSelector } from "react-redux";
import postApi from "src/api/postApi";
import { setCurrentPostPage, setFilterChange } from "src/appSlice";

PostList.propTypes = {};

function PostList(props) {
  const [listPosts, setListPosts] = useState([]);

  const dispatch = useDispatch();
  const latestPosts = useRef(null);
  latestPosts.current = listPosts;

  const pageNumber = useSelector((state) => state.app.currentPostPage);
  const userId = '8650b7fe-2952-4b03-983c-660dddda9029';
  const filterChanged = useSelector(state => state.app.filterChanged);

  const [filter, setFilter] = useState({
    UserId: userId,
    PageSize: 3,
  });

  useEffect(() => {
    async function getPosts() {
      try {
        if (filterChanged) {
          console.log('filterchanged');
          const params = {
            ...props.filter,
            UserId: userId,
            PageSize: 3,
            SkipItems: 0,
          }

          setFilter(params);

          const outPut = await postApi.getPagination({ params });
          dispatch(setFilterChange(false));
          setListPosts(outPut.data.items);
        }

        else {
          console.log('pagechanged');
          const params = {
            ...filter,
            SkipItems: listPosts.length,
          }
          const outPut = await postApi.getPagination({ params });
          const cur = [...latestPosts.current];
          const las = cur.concat(outPut.data.items);
          console.log(las);
          setListPosts(las);
        }

      } catch (err) {
        console.log(err);
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

  return (
    <div>
      {
        listPosts.map(item => {
          return <Post post={item} key={item.postId} />
        })
      }
    </div>

  );
}

export default PostList;
