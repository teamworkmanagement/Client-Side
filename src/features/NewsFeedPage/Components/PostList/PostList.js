import React, { useEffect, useRef, useState } from "react";
import "./PostList.scss";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import postApi from "src/api/postApi";
import { setCurrentPostPage, setFilterChange } from "src/appSlice";
import CIcon from "@coreui/icons-react";
import { useLocation, useParams } from "react-router";
import queryString from "query-string";
import Loading from "src/shared_components/MySharedComponents/Loading/Loading";

function PostList(props) {
  const [listPosts, setListPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const location = useLocation();
  const queryParams = queryString.parse(location.search).p;

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
          SkipItems: filterChanged ? 0 : queryParams ? 0 : listPosts.length,
          postId: queryParams,
        };

        let outPut = {};
        if (teamId) {
          params.teamId = teamId;
          outPut = await postApi.getPaginationTeam({ params });
        } else {
          outPut = await postApi.getPaginationUser({ params });
        }

        if (filterChanged || queryParams) {
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
  }, [pageNumber, props.filter, teamId]);

  useEffect(() => {
    if (props.addPostDone === null) return;

    console.log(props.addPostDone);

    //const cur = [...latestPosts.current];
    //const las = [props.addPostDone].concat(cur);
    const cloneLists = [...listPosts];
    const newPosts = [props.addPostDone].concat(cloneLists);
    setListPosts(newPosts);
  }, [props.addPostDone]);

  useEffect(() => {
    window.onscroll = function (e) {
      //const element = e.target;
      // console.log(e.currentTarget);
      // console.log(
      //   element.scrollHeight - element.scrollTop + "-" + element.clientHeight
      // );

      if (window.pageYOffset > 100) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (
          window.location.pathname.includes("/newsfeed") ||
          window.location.search.includes("tab=feed")
        ) {
          dispatch(setCurrentPostPage());
        }
      }
    };
  }, []);

  const scrollTop = () => {
    //window.scrollTo(0, 0);
    setTimeout(() => {
      //window.scrollTo(0, 0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2);
  };

  const onDeletePost = (post) => {
    const clonePosts = [...listPosts];
    const index = clonePosts.findIndex(p => p.postId === post.postId);
    clonePosts.splice(index, 1);
    setListPosts(clonePosts);
  }

  const renderListPost = listPosts.map((item, index) => {
    return (
      <Post
        index={listPosts.length - index}
        isInTeam={props.isInTeam}
        post={item}
        key={item.postId}
        onDeletePost={onDeletePost}
      />
    );
  });

  const onScroll = (e) => {
    //const element = e.target;
  };

  return (
    <div className="post-list" onscroll={onScroll}>
      {listPosts.length === 0 && !isLoading ? (
        <div className="nodata-image-post-list">
          <CIcon name="cil-newspaper" className="icon-post" />
          <CIcon className="icon-x" name="cil-x" />
          <CIcon className="icon-glass" name="cil-magnifying-glass" />

          <div className="noti-infor">
            Ch??a c?? b??i vi???t n??o trong c??c nh??m c???a b???n
          </div>
        </div>
      ) : (
        renderListPost
      )}
      {isLoading ? <Loading className="loading-bar" /> : null}

      {showScroll ? (
        <div
          className="go-top-btn"
          style={{ right: props.isInTeam ? "6rem" : "2rem" }}
          onClick={scrollTop}
        >
          <CIcon name="cil-chevron-top" />
        </div>
      ) : null}
    </div>
  );
}

export default PostList;
