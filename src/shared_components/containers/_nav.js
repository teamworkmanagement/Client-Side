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
    _tag: "CSidebarNavDropdown",
    name: "Quản lý công việc",
    route: "/managetask",
    icon: "cil-task",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: (
          <div className="manage-mytasks-dropdown-item custom-dropdown-item">
            <CIcon name="cil-user" />
            <div className="overlay-icon"></div>
            <CIcon name="cil-clipboard" className="icon-task" />
            Công việc của tôi
          </div>
        ),
        to: "/managetask/mytasks",
        //icon: "cil-user",
      },
      {
        _tag: "CSidebarNavItem",
        name: (
          <div className="manage-mytasks-dropdown-item custom-dropdown-item">
            <CIcon name="cil-group" />
            <div className="overlay-icon"></div>
            <CIcon name="cil-clipboard" className="icon-task-group" />
            Công việc trong nhóm
          </div>
        ),
        to: "/managetask/teamtasks",
        //icon: "cil-group",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Tài liệu",
    to: "/myfiles",
    icon: "cil-folder-open",
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
    to: "/myaccount",
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
