import React from "react";
import CIcon from "@coreui/icons-react";
import { CImg } from "@coreui/react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Tổng quan",
    to: "/dashboard",
    icon: "cil-speedometer", //<CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Bản tin",
    to: "/news",
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
        name: "Sinh viên A14 - KTX",
        to: "/icons/coreui-icons",
        icon: (
          <CImg
            src={"avatars/6.jpg"}
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
        name: "Bảo trì phần mềm gfdg",
        icon: (
          <CImg
            src={"avatars/1.jpg"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        ),
        to: "/dashboard",
        badge: {
          color: "success",
          text: "NEW",
        },
      },
      {
        _tag: "CSidebarNavItem",
        name: "Group Anh văn TOEIC",
        to: "/icons/brands",
        icon: (
          <CImg
            src={"avatars/3.jpg"}
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
    to: "/team",
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
