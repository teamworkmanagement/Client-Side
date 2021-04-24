import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
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
  CModalTitle,
  CRow,
} from "@coreui/react";
import PostList from "./Components/PostList/PostList";
import PostToolBar from "./Components/PostToolBar/PostToolBar";
import CIcon from "@coreui/icons-react";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { setFilterChange } from "src/appSlice";


NewsFeedPage.propTypes = {};

function NewsFeedPage(props) {
  const [showFilter, setShowFilter] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [filter, setFilter] = useState({
    UserId: '8650b7fe-2952-4b03-983c-660dddda9029',
    PageSize: 3,
  });

  const dispatch = useDispatch();

  const groupList = [
    {
      groupId: "1",
      groupAvatar:
        "https://dongnaireview.com/wp-content/uploads/2020/10/trung-tam-toeic-bien-hoa-5.jpg",
      groupName: "Anh Văn TOEIC",
      groupMemberCount: 11,
      groupNewPostCount: 9,
    },
    {
      groupId: "2",
      groupAvatar:
        "https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png",
      groupName: "Sinh viên A14 ktx",
      groupMemberCount: 1200,
      groupNewPostCount: 3,
    },
    {
      groupId: "3",
      groupAvatar:
        "https://scontent.fsgn5-7.fna.fbcdn.net/v/t31.18172-8/15975043_801295790009762_5833023295370153210_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=825194&_nc_ohc=dgeZuFN3avMAX956AeV&_nc_ht=scontent.fsgn5-7.fna&oh=aee48f31173dee1270bc615946e65024&oe=609D8354",
      groupName: "J2Team Community",
      groupMemberCount: 206700,
      groupNewPostCount: 11,
    },
    {
      groupId: "4",
      groupAvatar:
        "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/95384801_3541411182540556_323501399205740544_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=PNRMG3JZivEAX8fDiPY&_nc_ht=scontent.fsgn5-3.fna&oh=f9d490f5d7f7a1b81999da2845b80923&oe=609FA0C7",
      groupName: "Hóng hớt Showbiz",
      groupMemberCount: 1406700,
      groupNewPostCount: 18,
    },
    {
      groupId: "5",
      groupAvatar:
        "https://scontent-sin6-1.xx.fbcdn.net/v/t1.6435-9/118766018_141657554279630_4181404269355144692_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=825194&_nc_ohc=xhRXBuV001AAX8INvov&_nc_ht=scontent-sin6-1.xx&oh=cf023db4c19215dd31fcdd6358698267&oe=60A114DE",
      groupName: "Động sinh viên",
      groupMemberCount: 2002700,
      groupNewPostCount: 5,
    },
    {
      groupId: "6",
      groupAvatar:
        "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/60060631_1892088447564263_9024906648988155904_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=825194&_nc_ohc=kRlwDzBsRMgAX_7H1qt&_nc_ht=scontent.fsgn5-5.fna&oh=a39b407b6df36c29a03d6a054a0b7688&oe=609D9EF4",
      groupName: "Kteam - Lập trình C/C++, C#, SQL",
      groupMemberCount: 530972,
      groupNewPostCount: 2,
    },
    {
      groupId: "7",
      groupAvatar:
        "https://scontent-sin6-3.xx.fbcdn.net/v/t1.6435-9/70944423_1289407744573535_1300646982062178304_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=825194&_nc_ohc=30N8un2vPewAX8QcAkk&_nc_ht=scontent-sin6-3.xx&oh=5ece776d1f0b830ca2f8e106d6452719&oe=609EBA21",
      groupName: "18/09 lớp Toeic Speaking Writing cô Ngọc",
      groupMemberCount: 1289,
      groupNewPostCount: 2,
    },
  ];
  function toggleShowFilter() {
    const clonedShowFilter = { ...showFilter };
    setShowFilter(!showFilter);
    console.log(showFilter);
  }

  const getFilter = (obj) => {
    if (obj === null || obj === undefined)
      return;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    if (filter === obj || JSON.stringify(filter) === JSON.stringify(obj))
      return;

    console.log(obj, '-----', filter);

    setFilter({
      ...filter,
      ...obj
    })

    dispatch(setFilterChange(true));
  }
  return (
    <div className="newsfeed-page-container">
      <div className="post-list-container">
        <PostList filter={filter} />
      </div>
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
            <img className="expand-icon" src="images/expand_less.png" alt="" />
          ) : (
            <img className="expand-icon" src="images/expand_more.png" alt="" />
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

      <CModal
        show={showCreatePost}
        onClose={() => setShowCreatePost(!showCreatePost)}
      >
        <CModalBody>
          <TextareaAutosize
            className="input-post"
            minRows={1}
            maxRows={20}
            placeholder="Viết bản tin mới..."
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            className="submit-btn"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            Đăng bài
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default NewsFeedPage;
