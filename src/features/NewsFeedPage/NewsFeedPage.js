import React, { useEffect, useRef, useState } from "react";
import "./NewsFeedPage.scss";
import {
  CBadge,
  CButton,
  CCol,
  CCollapse,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import PostList from "./Components/PostList/PostList";
import PostToolBar from "./Components/PostToolBar/PostToolBar";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterChange } from "src/appSlice";
import GroupFilter from "./Components/Post/Components/Selector/GroupFilter/GroupFilter";
import postApi from "src/api/postApi";
import { useLocation, useParams } from "react-router";
import PostEditor from "./Components/PostEditor/PostEditor";
import { convertToRaw } from "draft-js";
import uuid from "src/utils/file/uuid";
import firebaseConfig from "src/utils/firebase/firebaseConfig";
import queryString from "query-string";
import teamApi from "src/api/teamApi";
import { useHistory } from "react-router-dom";

function NewsFeedPage(props) {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const user = useSelector((state) => state.auth.currentUser);

  const [filter, setFilter] = useState({
    UserId: user.id,
    PageSize: 3,
  });

  const [clearSelect, setClearFilter] = useState(-1);
  const [addPostDone, setAddPostDone] = useState(null);

  const [grAddPost, setGrAddPost] = useState(null);

  //eslint-disable-next-line
  const [newPostContent, setNewPostContent] = useState("");
  const [listPictures, setListPictures] = useState([]);
  const [resetEditorText, setResetEditorText] = useState(-1);

  const location = useLocation();
  const queryParams = queryString.parse(location.search).p;

  const { teamId } = useParams();

  useEffect(() => {
    if (teamId) setGrAddPost(teamId);
  }, [teamId]);

  const pickImgRef = useRef(null);

  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    teamApi
      .getTeamsRecommendForUser(user.id)
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((err) => {});
  }, []);

  function toggleShowFilter() {
    setShowFilter(!showFilter);
  }

  const getFilter = (obj) => {
    if (obj === null || obj === undefined) return;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    if (
      filter === obj ||
      JSON.stringify(filter) === JSON.stringify(obj) ||
      JSON.stringify(obj) === JSON.stringify({})
    )
      return;

    setFilter({
      ...obj,
      UserId: user.id,
      PageSize: 3,
    });

    dispatch(setFilterChange(true));
  };

  const getGroupPost = (gr) => {
    setGrAddPost(gr === null ? null : gr.value);
  };

  const uploadImage = () => {
    if (listPictures.length === 0) return;

    /*listPictures.forEach((pic, index) => {
      const uploadTask =
        firebaseConfig.storage().ref().child(`${uuid()}/${pic.file.name}`).put(pic.file);
      promises.push(uploadTask);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            console.log(`Progress: ${progress}%`);
          }
        },
        error => console.log(error.code),
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          const cloneLinks = [...linkPictures];
          cloneLinks.push(downloadURL);

          setLinkPictures(cloneLinks);

        });
    });
    return Promise.all(promises);*/

    const promises = listPictures.map((pic, index) => {
      let ref = firebaseConfig
        .storage()
        .ref()
        .child(`${uuid()}/${pic.file.name}`);
      return ref
        .put(pic.file)
        .then(async () => {
          const link = await ref.getDownloadURL();
          return {
            index: index,
            link: link,
          };
        })
        .catch((err) => console.log(err.code));
    });
    return Promise.all(promises);
  };

  const addPostClick = () => {
    setResetEditorText(resetEditorText + 1);
  };

  const onModalClose = () => {
    setClearFilter(clearSelect + 1);
    setNewPostContent("");
    setShowCreatePost(false);
    setListPictures([]);
  };

  const onAddPost = async (editorState) => {
    if (!grAddPost) {
      alert("Xem lại");
      return;
    }

    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    if (blocks.length === 1) {
      if (blocks[0].text === "") {
        alert("Xem lại!");
        return;
      }
    }

    const cloneBlocks = [...blocks];

    //tags
    const obj = convertToRaw(editorState.getCurrentContent());

    const mentions = [];
    const entityMap = obj.entityMap;

    for (const property in entityMap) {
      if (entityMap[property].type === "mention")
        mentions.push(entityMap[property].data.mention);
    }

    cloneBlocks.forEach((block, index) => {
      if (block.entityRanges.length > 0) {
        block.entityRanges.forEach((entity) => {
          // var nameTag = block.text.substring(
          //   entity.offset,
          //   entity.offset + entity.length
          // );

          let indexData = entity.key;
          const userTagId = entityMap[indexData].data.mention.id;

          block.text = block.text.replaceBetween(
            entity.offset,
            entity.offset + entity.length,
            `<@tag>${userTagId}<@tag>`
          );
          console.log(block.text);
        });
      }
    });

    let value = cloneBlocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("<br>");

    let userIds = [];
    if (mentions.length > 0) {
      userIds = mentions.map((m) => m.id);
    }

    console.log(value);
    console.log(userIds);


    const links = await uploadImage();

    postApi
      .addPost({
        postUserId: user.id,
        postTeamId: teamId ? teamId : grAddPost,
        postContent: value,
        userIds: userIds,
        postImages: links,
      })
      .then((res) => {
        res.data.postImages = links?.map((x) => x.link);
        console.log(addPostDone);
        console.log(res.data);
        setAddPostDone(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setShowCreatePost(false);
    setListPictures([]);
  };

  const onPickImageChange = (e) => {
    const newLists = Array.from(e.target.files).map((f) => {
      return {
        url: URL.createObjectURL(f),
        file: f,
      };
    });

    setListPictures([...listPictures, ...newLists]);
  };

  const removePicture = (index) => {
    const cloneListPictures = [...listPictures];
    cloneListPictures.splice(index, 1);
    setListPictures(cloneListPictures);
  };

  const history = useHistory();
  const navigateToTeam = (teamId) => {
    history.push(`/team/${teamId}`);
  };
  return (
    <div className="newsfeed-page-container">
      <CRow>
        <CCol xl="9" lg="9" md="9" sm="12" className="post-list-col ">
          <CRow className="row-inside-list-post">
            <CCol
              xl="10"
              md="10"
              sm="10"
              xs="12"
              className="post-list-inside-col"
            >
              <div className="post-list-container">
                <PostList
                  addPostDone={addPostDone}
                  isInTeam={props.isInTeam}
                  filter={filter}
                />
              </div>
            </CCol>
          </CRow>
        </CCol>
        {!queryParams ? (
          <CCol
            xl="3"
            lg="3"
            md="3"
            sm="0"
            className="d-sm-down-none side-panel-col"
          >
            <div className="side-panel-container">
              <div
                className="create-post-btn"
                onClick={() => setShowCreatePost(!showCreatePost)}
              >
                <div className="title">
                  <CIcon name="cil-pencil" />
                  Viết bài mới
                </div>
              </div>
              <div
                className="toggle-filter-btn"
                onClick={toggleShowFilter}
                style={
                  showFilter
                    ? {
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                        borderBottom: "none",
                      }
                    : {
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                        borderBottom: "1px solid #e6ebf1",
                      }
                }
              >
                <div className="title">
                  <CIcon name="cil-list-filter" />
                  Lọc bản tin
                </div>
                {showFilter ? (
                  <img
                    className="expand-icon"
                    src="../images/expand_less.png"
                    alt=""
                  />
                ) : (
                  <img
                    className="expand-icon"
                    src="../images/expand_more.png"
                    alt=""
                  />
                )}
              </div>
              <CCollapse show={showFilter}>
                <PostToolBar getFilter={getFilter} />
              </CCollapse>
              {!props.isInTeam && (
                <div className="post-group-list-container">
                  <div className="group-list-title">Bài viết trong nhóm</div>
                  {groupList.map((item, index) => {
                    return (
                      <div
                        onClick={() => navigateToTeam(item.groupId)}
                        key={item.groupId}
                        className="post-group-item"
                        style={{ animationDelay: `${(index + 2) / 10}s` }}
                      >
                        <div className="group-avatar">
                          <img src={item.groupAvatar} alt="" />
                        </div>
                        <div className="group-infor">
                          <div className="group-name">{item.groupName}</div>
                          <div className="group-member-count">
                            {item.groupMemberCount} Thành viên
                          </div>
                        </div>
                        <div className="group-new-count">
                          <CBadge className="badge-danger">
                            {item.groupNewPostCount}
                          </CBadge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CCol>
        ) : null}
      </CRow>

      {!queryParams ? (
        <CModal show={showCreatePost} onClosed={onModalClose}>
          <CModalHeader closeButton></CModalHeader>
          <CModalBody>
            {!teamId ? (
              <GroupFilter
                className="mb-3"
                clearSelect={clearSelect}
                getGroupPost={getGroupPost}
              />
            ) : null}

            <PostEditor
              postTeamId={grAddPost}
              reset={resetEditorText}
              onAddPost={onAddPost}
            />
            {listPictures.length > 0 && (
              <div className="list-images-container">
                {listPictures.map((image, index) => {
                  return (
                    <div className="img-container">
                      <img className="upload-img" alt="" src={image.url} />
                      <div
                        className="delete-img-btn"
                        onClick={() => removePicture(index)}
                      >
                        <CIcon name="cil-x" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div
              onClick={() => pickImgRef.current.click()}
              className="add-image-btn-container"
            >
              <div className="add-image-btn">
                <CIcon name="cil-image-plus" />
                Thêm ảnh
                <input
                  type="file"
                  onChange={onPickImageChange}
                  multiple
                  ref={pickImgRef}
                  style={{ display: "none" }}
                  accept="image/*"
                />
              </div>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton className="submit-btn" onClick={addPostClick}>
              Đăng bài
            </CButton>
          </CModalFooter>
        </CModal>
      ) : null}
    </div>
  );
}

export default NewsFeedPage;
