import React from "react";
import CIcon from "@coreui/icons-react";
import { CImg } from "@coreui/react";
import store from '../../app/store';


const state = store.getState();
const teams = state.team.teams;
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
    _children: teams.map(x=>{
      return {
        _tag: "CSidebarNavItem",
        name: (
          <div className="team-name-dropdown-item">{x.teamName}</div>
        ),
        to: `/team/${x.teamId}`,
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
      };
    }),
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
    to: "/kanban",
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
