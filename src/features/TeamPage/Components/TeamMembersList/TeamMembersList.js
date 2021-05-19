import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TeamMembersList.scss";
import {
  CButton,
  CButtonGroup,
  CCol,
  CDataTable,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CPagination,
  CRow,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router";

TeamMembersList.propTypes = {};

function TeamMembersList(props) {
  const [showMode, setShowMode] = useState(1); //1:list, 2:grid
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(2);
  function switchShowMode(index) {
    if (index === showMode) return;
    setShowMode(index);
  }
  const fields = [
    { key: "infor", label: "Tên", _style: { width: "100%" } },
    { key: "role", label: "Vai trò" },
    { key: "actions", label: "Hành động", _style: { width: "5%" } },
  ];

  const usersData = [
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
      name: "Nguyễn Tiến Dũng",
      email: "dungnguyen@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
      name: "Võ Anh Tấn",
      email: "demotan14@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-4.jpg",
      name: "Anthony Phan",
      email: "phanthi1972@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-5.jpg",
      name: "Phương Thanh",
      email: "mrphuongth@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      name: "Tú Hảo",
      email: "haotheface@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-7.jpg",
      name: "Samu Liu",
      email: "africaSam@gmail.com",
      isLeader: false,
    },
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
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
  const leaderData = [
    {
      avatar: "https://emilus.themenate.net/img/avatars/thumb-4.jpg",
      name: "Huy Lê",
      email: "huylengoc12@gmail.com",
      isLeader: true,
    },
  ];

  const navigateToProfile = (user) => {
    history.push(`/userprofile`);
  };

  return (
    <div className="team-members-container">
      <div className="members-list-header">
        <div className="search-bar-container">
          <div className="input-container">
            <CInput
              class="input-field"
              placeholder="...tìm thành viên"
              type="text"
            />
            <div className="input-actions-group">
              <CIcon name="cil-search" />
            </div>
          </div>
        </div>
        <div className="other-actions">
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
      </div>
      <CRow>
        <CCol lg="3" md="12" className="col-leader">
          <div className="leader-infor-container d-md-down-none">
            <div className="label">Trưởng nhóm </div>
            <img
              alt=""
              src="https://emilus.themenate.net/img/avatars/thumb-4.jpg"
            />
            <div className="leader-name">Huy Lê</div>
            <div className="leader-email">huylengoc12@gmail.com</div>
          </div>
          <div className="leader-infor-container row-infor d-lg-none">
            <div className="label">Trưởng nhóm </div>
            {/* <img
              alt=""
              src="https://emilus.themenate.net/img/avatars/thumb-4.jpg"
            />
            <div className="leader-name">Huy Lê</div>
            <div className="leader-email">huylengoc12@gmail.com</div> */}
            <CDataTable
              items={leaderData}
              fields={fields}
              scopedSlots={{
                infor: (item) => {
                  return (
                    <td onClick={() => navigateToProfile(item)}>
                      <div className="member-infor-container">
                        <img
                          className="member-avatar"
                          alt=""
                          src={item.avatar}
                        />

                        <div className="member-infor">
                          <div className="member-name">{item.name}</div>
                          <div className="member-email">{item.email}</div>
                        </div>
                      </div>
                    </td>
                  );
                },
                role: (item) => {
                  return (
                    <td>
                      <div className="member-role">
                        <div
                          className={`role-color ${
                            item.isLeader ? "leader" : ""
                          }`}
                        ></div>
                        {item.isLeader ? "Trưởng nhóm" : "Thành viên"}
                      </div>
                    </td>
                  );
                },
                actions: (item) => {
                  return (
                    <td>
                      <div className="member-actions-dropdown">
                        <CDropdown>
                          <CDropdownToggle id="dropdownMenuButton" caret>
                            <div className="lane-actions">
                              <CIcon name="cil-options" className="rotate-90" />
                            </div>
                          </CDropdownToggle>
                          <CDropdownMenu
                            aria-labelledby="dropdownMenuButton"
                            placement="bottom-end"
                          >
                            <CDropdownItem className="first">
                              <CIcon name="cil-send" />
                              Nhắn tin
                            </CDropdownItem>
                            <CDropdownItem className="normal">
                              <CIcon name="cil-find-in-page" />
                              Xem thông tin
                            </CDropdownItem>
                            <CDropdownItem className="last">
                              <CIcon name="cil-account-logout" />
                              Mời rời nhóm
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    </td>
                  );
                },
              }}
            />
          </div>
        </CCol>
        <CCol lg="9" md="12" className="col-members">
          <div className="members-container">
            <div className="label">Thành viên</div>
            <CDataTable
              items={usersData}
              fields={fields}
              scopedSlots={{
                infor: (item) => {
                  return (
                    <td onClick={() => navigateToProfile(item)}>
                      <div className="member-infor-container">
                        <img
                          className="member-avatar"
                          alt=""
                          src={item.avatar}
                        />

                        <div className="member-infor">
                          <div className="member-name">{item.name}</div>
                          <div className="member-email">{item.email}</div>
                        </div>
                      </div>
                    </td>
                  );
                },
                role: (item) => {
                  return (
                    <td onClick={() => navigateToProfile(item)}>
                      <div className="member-role">
                        <div
                          className={`role-color ${
                            item.isLeader ? "leader" : ""
                          }`}
                        ></div>
                        {item.isLeader ? "Trưởng nhóm" : "Thành viên"}
                      </div>
                    </td>
                  );
                },
                actions: (item) => {
                  return (
                    <td>
                      <div className="member-actions-dropdown">
                        <CDropdown>
                          <CDropdownToggle id="dropdownMenuButton" caret>
                            <div className="lane-actions">
                              <CIcon name="cil-options" className="rotate-90" />
                            </div>
                          </CDropdownToggle>
                          <CDropdownMenu
                            aria-labelledby="dropdownMenuButton"
                            placement="bottom-end"
                          >
                            <CDropdownItem className="first">
                              <CIcon name="cil-send" />
                              Nhắn tin
                            </CDropdownItem>
                            <CDropdownItem className="normal">
                              <CIcon name="cil-find-in-page" />
                              Xem thông tin
                            </CDropdownItem>
                            <CDropdownItem className="last">
                              <CIcon name="cil-account-logout" />
                              Mời rời nhóm
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
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
        </CCol>
      </CRow>
    </div>
  );
}

export default TeamMembersList;
