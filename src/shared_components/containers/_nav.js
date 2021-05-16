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
    _tag: "CSidebarNavItem",
    name: "Nhóm",
    to: "/teams",
    icon: "cil-group",
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
    to: "/userprofile",
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
