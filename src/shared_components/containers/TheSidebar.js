import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";
import { changeState } from "src/appSlice";
import { getTeamByUserId } from "src/features/TeamPage/teamSlice";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.sidebarShow);
  const darkMode = useSelector((state) => state.app.darkMode);
  const user = useSelector(state => state.auth.currentUser);
  const teams = useSelector(state => state.team.teams);
  const [navState, setNavState] = useState([]);

  const onChange = (val) => {
    console.log("change : ", val);
    const param = { type: "set", sidebarShow: val };
    const action = changeState(param);
    dispatch(action);
  };




  useEffect(() => {
    if (teams.length > 0) {
      const mynav = [
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
          _children: [...teams].map(x => {
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

      setNavState(mynav);
    }
  }, [teams]);
  useEffect(() => {
    dispatch(getTeamByUserId(user.id));
  }, [])

  return (
    <CSidebar show={show} onShowChange={onChange}>
      <CSidebarBrand className="d-md-down-none" to="/">
        {darkMode && <div className="logo-team-container"></div>}
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navState}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>

      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
