import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TeamPage.scss";
import ChatPage from "../ChatPage/ChatPage";
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ListFileTable from "../../shared_components/MySharedComponents/ListFileTable/ListFileTable";
import NewsFeedPage from "../NewsFeedPage/NewsFeedPage";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import TeamTasks from "./Components/TeamTasks/TeamTasks";
import TeamMembers from "./Components/TeamMembers/TeamMembers";
import { useDispatch, useSelector } from "react-redux";
import { getTeamByUserId } from "./teamSlice";
import { useParams } from "react-router";

TeamPage.propTypes = {};

function TeamPage(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.currentUser);
  const [active, setActive] = useState(1);

  

  
  return (
    <div className="team-container">
      <CTabs activeTab={active} onActiveTabChange={(idx) => setActive(idx)}>
        <CNav variant="tabs">
          <CNavItem>
            <CTooltip content="Bản tin nhóm" placement="right">
              <CNavLink>
                <CIcon name="cil-newspaper" />
                <div className="tab-name">Bản tin nhóm</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip content="Công việc" placement="right">
              <CNavLink>
                <CIcon name="cil-line-weight" />
                <div className="tab-name">Công việc</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip content="Tin nhắn nhóm" placement="right">
              <CNavLink>
                <CIcon name="cil-send" />
                <div className="tab-name">Tin nhắn nhóm</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip content="Tài liệu" placement="right">
              <CNavLink>
                <CIcon name="cil-description" />
                <div className="tab-name">Tài liệu</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip content="Thành viên" placement="right">
              <CNavLink>
                <CIcon name="cil-people" />
                <div className="tab-name">Thành viên</div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane>
            <NewsFeedPage isInTeam={true} />
          </CTabPane>
          <CTabPane>
            <TeamTasks />
          </CTabPane>
          <CTabPane>
            <ChatPage isInTeam={true} tabActiveTeam={active} />
          </CTabPane>
          <CTabPane>
            <ListFileTable />
          </CTabPane>
          <CTabPane>
            <TeamMembers />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
}

export default TeamPage;
