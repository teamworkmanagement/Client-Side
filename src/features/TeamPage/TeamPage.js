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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ListFileTable from "../../shared_components/MySharedComponents/ListFileTable/ListFileTable";
import NewsFeedPage from "../NewsFeedPage/NewsFeedPage";
import KanbanBoard from "../KanbanBoard/KanbanBoard";

TeamPage.propTypes = {};

function TeamPage(props) {
  const lorem = "ccc";
  const [active, setActive] = useState(0);
  return (
    <div className="team-container">
      <CTabs activeTab={active} onActiveTabChange={(idx) => setActive(idx)}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-newspaper" />
              <div className="tab-name">Bản tin nhóm</div>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-line-weight" />
              <div className="tab-name">Công việc</div>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-send" />
              <div className="tab-name">Tin nhắn nhóm</div>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-description" />
              <div className="tab-name">Tài liệu</div>
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane>
            <NewsFeedPage isInTeam={true} />
          </CTabPane>
          <CTabPane>
            <KanbanBoard />
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
