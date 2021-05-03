import React from "react";
import CIcon from "@coreui/icons-react";
import { CImg } from "@coreui/react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Tổng quan",
    to: "/newchat",
    icon: "cil-speedometer", //<CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Bản tin",
    to: "/newsfeed",
    icon: "cil-newspaper",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Nhóm",
    to: "/news",
    icon: "cil-group",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: (
          <div className="team-name-dropdown-item">Group Anh Văn Toeic</div>
        ),
        to: "/team",
        icon: (
          <CImg
            src={
              "https://scontent-sin6-3.xx.fbcdn.net/v/t1.6435-9/70944423_1289407744573535_1300646982062178304_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=825194&_nc_ohc=30N8un2vPewAX8QcAkk&_nc_ht=scontent-sin6-3.xx&oh=5ece776d1f0b830ca2f8e106d6452719&oe=609EBA21"
            }
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        ),
        badge: {
          color: "success",
          text: "NEW",
        },
      },
      {
        _tag: "CSidebarNavItem",
        name: <div className="team-name-dropdown-item">Hóng hớt Showbiz</div>,

        icon: (
          <CImg
            src={
              "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/95384801_3541411182540556_323501399205740544_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=PNRMG3JZivEAX8fDiPY&_nc_ht=scontent.fsgn5-3.fna&oh=f9d490f5d7f7a1b81999da2845b80923&oe=609FA0C7"
            }
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        ),
        to: "",
        badge: {
          color: "success",
          text: "NEW",
        },
      },
      {
        _tag: "CSidebarNavItem",
        name: <div className="team-name-dropdown-item">J2Team DeathClick</div>,
        to: "",
        icon: (
          <CImg
            src={
              "https://scontent.fsgn5-7.fna.fbcdn.net/v/t31.18172-8/15975043_801295790009762_5833023295370153210_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=825194&_nc_ohc=dgeZuFN3avMAX956AeV&_nc_ht=scontent.fsgn5-7.fna&oh=aee48f31173dee1270bc615946e65024&oe=609D8354"
            }
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        ),
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Tin nhắn",
    to: "/chat",
    icon: "cil-chat-bubble",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Quản lý công việc",
    to: "/teams",
    icon: "cib-stackoverflow",
  },

  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Cài đặt"],
    icon: "cil-settings",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Tài khoản",
    to: "",
    icon: {
      name: "cil-user",
    },
    label: true,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Ứng dụng",
    to: "",
    icon: {
      name: "cil-settings",
    },
    label: true,
  },

  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export default _nav;
