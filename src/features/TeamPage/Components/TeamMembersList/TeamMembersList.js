import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TeamMembersList.scss";
import {
  CButton,
  CButtonGroup,
  CDataTable,
  CPagination,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

TeamMembersList.propTypes = {};

function TeamMembersList(props) {
  const [showMode, setShowMode] = useState(1); //1:list, 2:grid
  const [currentPage, setCurrentPage] = useState(2);
  function switchShowMode(index) {
    if (index === showMode) return;
    setShowMode(index);
  }
  const fields = [
    { key: "avatar", label: "Ảnh đại diện", _style: { width: "0%" } },
    { key: "infor", label: "Tên", _style: { width: "15%" } },
    { key: "role", label: "Vai trò", _style: { width: "15%" } },
    { key: "actions", label: "", _style: { width: "20%" } },
  ];

  const usersData = [
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      name: "Nguyễn Tiến Dũng",
      email: "dungnguyen@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      name: "Nguyễn Tiến Dũng",
      email: "dungnguyen@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      name: "Nguyễn Tiến Dũng",
      email: "dungnguyen@gmail.com",
      isLeader: true,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      name: "Nguyễn Tiến Dũng",
      email: "dungnguyen@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      name: "Nguyễn Tiến Dũng",
      email: "dungnguyen@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      name: "Nguyễn Tiến Dũng",
      email: "dungnguyen@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      name: "Nguyễn Tiến Dũng",
      email: "dungnguyen@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      name: "Nguyễn Tiến Dũng",
      email: "dungnguyen@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      name: "Nguyễn Tiến Dũng",
      email: "dungnguyen@gmail.com",
      isLeader: false,
    },
  ];

  return (
    <div className="team-members-container">
      <div className="members-list-header">
        <div className="add-btn add-list-btn">
          <CIcon name="cil-plus" />
          Mời thành viên
        </div>

        <CButtonGroup className="show-mode">
          <CTooltip placement="top" content="Danh sách">
            <CButton
              className={`first mode-btn ${showMode === 1 && "active"}`}
              color="secondary"
              onClick={() => switchShowMode(1)}
              type="button"
            >
              <CIcon name="cil-list" />
            </CButton>
          </CTooltip>
          <CTooltip placement="top" content="Lưới">
            <CButton
              className={`last mode-btn ${showMode === 2 && "active"}`}
              color="secondary"
              onClick={() => switchShowMode(2)}
            >
              <CIcon name="cil-grid" />
            </CButton>
          </CTooltip>
        </CButtonGroup>
      </div>
      <CDataTable
        items={usersData}
        fields={fields}
        scopedSlots={{
          avatar: (item) => {
            return (
              <td>
                <img className="member-avatar" alt="" src={item.avatar} />
              </td>
            );
          },
          infor: (item) => {
            return (
              <td>
                <div className="member-infor">
                  <div className="member-name">{item.name}</div>
                  <div className="member-email">{item.email}</div>
                </div>
              </td>
            );
          },
          role: (item) => {
            return (
              <td>
                <div className={`member-role ${item.isLeader ? "leader" : ""}`}>
                  {item.isLeader ? "Trưởng nhóm" : "Thành viên"}
                </div>
              </td>
            );
          },
        }}
      />
      <CPagination
        className="pagination-team-members"
        activePage={currentPage}
        pages={10}
        onActivePageChange={setCurrentPage}
      />
    </div>
  );
}

export default TeamMembersList;
