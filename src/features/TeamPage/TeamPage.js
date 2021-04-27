import React, { useState } from "react";
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

TeamPage.propTypes = {};

function TeamPage(props) {
  const lorem = "ccc";
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
        </CNav>
        <CTabContent>
          <CTabPane>
            <NewsFeedPage isInTeam={true} />
          </CTabPane>
          <CTabPane>
            <TeamTasks />
          </CTabPane>
          <CTabPane>
            <ChatPage isInTeam={true} />
          </CTabPane>
          <CTabPane>
            <ListFileTable />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
}

export default TeamPage;
