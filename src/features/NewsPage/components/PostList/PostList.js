// import React, { useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
// import "./PostList.scss";
// import Post from "../Post/Post";
// import postApi from "src/api/postApi";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentPostPage } from "src/appSlice";

// PostList.propTypes = {};

// function PostList(props) {
//   const [listPosts, setListPosts] = useState([]);
//   const dispatch = useDispatch();
//   const latestPosts = useRef(null);
//   latestPosts.current = listPosts;

//   const pageNumber = useSelector(state => state.app.currentPostPage);

//   useEffect(() => {
//     async function getPosts() {
//       const outPut = await postApi.getPagination({
//         pageNumber: pageNumber,
//         pageSize: 3,
//       });
//       const cur = [...latestPosts.current];
//       const las = cur.concat(outPut.data.items);
//       setListPosts(las);
//     }

//     getPosts();
//   }, [pageNumber])

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return function release() {
//       window.removeEventListener("scroll", handleScroll);
//     }
//   }, [])

//   const handleScroll = async () => {
//     const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
//     const body = document.body;
//     const html = document.documentElement;
//     const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
//     const windowBottom = windowHeight + window.pageYOffset;

//     if (windowBottom >= docHeight) {
//       loadMoreItems();
//     }
//   };

//   const loadMoreItems = () => {
//     dispatch(setCurrentPostPage());
//   }

//   return (
//     <div>
//       <div>

//         {
//           listPosts.map((obj, index) => (
//             <Post key={index} postObj={obj} />
//           ))
//         }

//       </div>
//     </div>

//   );
// }

// export default PostList;

import React from "react";
import PropTypes from "prop-types";
import "./PostList.scss";
import Post from "../Post/Post";
import testApi from "src/api/testApi";
import { refreshToken } from "src/utils/auth";
import { useDispatch } from "react-redux";
import { getTest } from "src/api/testSlice";
PostList.propTypes = {};

function PostList(props) {
  const dispatch = useDispatch();
  const onButtonClick = async () => {
    try {
      const outPut = await testApi.getTest();
      console.log('post gettest: ', outPut);
    } catch (error) {
      console.log(error);
    }
  }

  const onButtonClick1 = () => {
    refreshToken();
  }

  return (
    <div className="">
      <button onClick={onButtonClick}>Test token</button>
      <button onClick={onButtonClick1}>Test refresh token</button>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default PostList;
