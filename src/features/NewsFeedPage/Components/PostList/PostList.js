import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./PostList.scss";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import postApi from "src/api/postApi";
import { setCurrentPostPage, setFilterChange } from "src/appSlice";
import Empty from "../Post/Components/Empty/Empty";
import Loading from "../Post/Components/Loading/Loading";
import CIcon from "@coreui/icons-react";
import { useParams } from "react-router";

PostList.propTypes = {};

function PostList(props) {
  const [listPosts, setListPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const dispatch = useDispatch();
  const latestPosts = useRef(null);
  latestPosts.current = listPosts;

  const pageNumber = useSelector((state) => state.app.currentPostPage);

  const filterChanged = useSelector((state) => state.app.filterChanged);

  const { teamId } = useParams();

  useEffect(() => {
    async function getPosts() {
      try {
        setIsLoading(true);
        const params = {
          ...props.filter,
          SkipItems: filterChanged ? 0 : listPosts.length,
        };

        let outPut = {};
        if (teamId) {
          params.teamId = teamId;
          outPut = await postApi.getPaginationTeam({ params });
        } else {
          outPut = await postApi.getPaginationUser({ params });
        }

        if (filterChanged) {
          dispatch(setFilterChange(false));
          setListPosts(outPut.data.items);
        } else {
          const cur = [...latestPosts.current];
          const las = cur.concat(outPut.data.items);
          setListPosts(las);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getPosts();
  }, [pageNumber, props.filter]);

  //o trong team
  useEffect(() => {
    if (teamId) {
      async function getPosts() {
        try {
          setIsLoading(true);
          const params = {
            ...props.filter,
            SkipItems: 0,
          };

          params.teamId = teamId;
          const outPut = await postApi.getPaginationTeam({ params });
          setListPosts(outPut.data.items);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
      getPosts();
    }
  }, [teamId]);

  useEffect(() => {
    if (props.addPostDone === null) return;
    const cur = [...latestPosts.current];
    const las = [props.addPostDone].concat(cur);
    setListPosts(las);
  }, [props.addPostDone]);

  useEffect(() => {
    window.onscroll = function (ev) {
      if (window.pageYOffset > 100) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        dispatch(setCurrentPostPage());
        console.log("k");
      }
    };
  }, []);

  const scrollTop = () => {
    //window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 2);
  };

  const renderListPost = listPosts.map((item) => {
    return <Post post={item} key={item.postId} />;
  });

  return (
    <div className="post-list">
      {listPosts.length === 0 && !isLoading ? (
        <div className="nodata-image">
          <CIcon name="cil-newspaper" />
          <CIcon className="icon-x" name="cil-x" />
          <CIcon className="icon-glass" name="cil-magnifying-glass" />

          <div className="noti-infor">
            Chưa có bài viết nào trong các nhóm của bạn
          </div>
          <div className="create-post-btn">Tạo bài viết mới</div>
        </div>
      ) : (
        renderListPost
      )}
      {isLoading ? <Loading className="loading-bar" /> : null}

      {showScroll ? (
        <div className="go-top-btn" onClick={scrollTop}>
          <CIcon name="cil-chevron-top" />
        </div>
      ) : null}
    </div>
  );
}

export default PostList;
