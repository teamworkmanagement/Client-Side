import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ListTeamPage.scss";
import {
  CButton,
  CButtonGroup,
  CCol,
  CDataTable,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CRow,
  CTooltip,
  CWidgetDropdown,
} from "@coreui/react";
import { useSelector } from "react-redux";
import AvatarList from "src/shared_components/MySharedComponents/AvatarList/AvatarList";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "src/shared_components/views/charts/ChartLineSimple";

ListTeamPage.propTypes = {};

function ListTeamPage(props) {
  const [showMode, setShowMode] = useState(1); //1:grid, 2:list
  function switchShowMode(index) {
    //debugger;
    console.log(index);
    if (index === showMode) return;
    setShowMode(index);
  }
  const teams = [
    {
      teamId: "team_1",
      teamLeaderId: "user_1",
      teamLeaderImageUrl:
        "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
      teamLeaderName: "Tiến Dũng",
      teamName: "Hóng hớt showbiz",
      teamDescription: "Hóng những chuyện liên quan đến showbiz",
      teamCreatedAt: new Date(),
      teamCode: "IU8O9K",
      teamIsDeleted: false,
      teamImageUrl:
        "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/95384801_3541411182540556_323501399205740544_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=PNRMG3JZivEAX8fDiPY&_nc_ht=scontent.fsgn5-3.fna&oh=f9d490f5d7f7a1b81999da2845b80923&oe=609FA0C7",
    },
    {
      teamId: "team_2",
      teamLeaderId: "user_2",
      teamLeaderImageUrl:
        "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
      teamLeaderName: "Phạm Phúc Khải",
      teamName: "TOEIC anh văn",
      teamDescription: "Hóng những chuyện liên quan đến showbiz",
      teamCreatedAt: new Date(),
      teamCode: "IU8O9K",
      teamIsDeleted: false,
      teamImageUrl:
        "https://scontent-sin6-3.xx.fbcdn.net/v/t1.6435-9/70944423_1289407744573535_1300646982062178304_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=825194&_nc_ohc=30N8un2vPewAX8QcAkk&_nc_ht=scontent-sin6-3.xx&oh=5ece776d1f0b830ca2f8e106d6452719&oe=609EBA21",
    },
    {
      teamId: "team_3",
      teamLeaderId: "user_3",
      teamName: "J2TEAM Community",
      teamLeaderImageUrl:
        "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
      teamLeaderName: "Nguyễn Khoa",
      teamDescription: "Hóng những chuyện liên quan đến showbiz",
      teamCreatedAt: new Date(),
      teamCode: "IU8O9K",
      teamIsDeleted: false,
      teamImageUrl:
        "https://scontent.fsgn5-7.fna.fbcdn.net/v/t31.18172-8/15975043_801295790009762_5833023295370153210_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=825194&_nc_ohc=dgeZuFN3avMAX956AeV&_nc_ht=scontent.fsgn5-7.fna&oh=aee48f31173dee1270bc615946e65024&oe=609D8354",
    },
    {
      teamId: "team_4",
      teamLeaderId: "user_4",
      teamName: "Lớp SE207.L11",
      teamLeaderImageUrl:
        "https://emilus.themenate.net/img/avatars/thumb-4.jpg",
      teamLeaderName: "Phan Châu Trinh",
      teamDescription: "Hóng những chuyện liên quan đến showbiz",
      teamCreatedAt: new Date(),
      teamCode: "IU8O9K",
      teamIsDeleted: false,
      teamImageUrl:
        "https://s35691.pcdn.co/wp-content/uploads/2018/12/meta-teaching-181210.jpg",
    },
    {
      teamId: "team_5",
      teamLeaderId: "user_5",
      teamName: "Dev-web studio",
      teamLeaderImageUrl:
        "https://emilus.themenate.net/img/avatars/thumb-5.jpg",
      teamLeaderName: "Phan Ngọc Huy",
      teamDescription: "Hóng những chuyện liên quan đến showbiz",
      teamCreatedAt: new Date(),
      teamCode: "IU8O9K",
      teamIsDeleted: false,
      teamImageUrl:
        "data:image/png;base64,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",
    },
    {
      teamId: "team_6",
      teamLeaderId: "user_6",
      teamName: "EZ Frontend",
      teamLeaderImageUrl:
        "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      teamLeaderName: "Nguyễn Phi Hùng",
      teamDescription: "Hóng những chuyện liên quan đến showbiz",
      teamCreatedAt: new Date(),
      teamCode: "IU8O9K",
      teamIsDeleted: false,
      teamImageUrl:
        "https://yt3.ggpht.com/ytc/AAUvwngi08PmeCnMBrVRL3ueQqnieSiI7LCae-oQM9owOEg=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      teamId: "team_7",
      teamLeaderId: "user_7",
      teamName: "Mua bán account Netflix",
      teamLeaderImageUrl:
        "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
      teamLeaderName: "Nguyễn Thế Thức",
      teamDescription: "Hóng những chuyện liên quan đến showbiz",
      teamCreatedAt: new Date(),
      teamCode: "IU8O9K",
      teamIsDeleted: false,
      teamImageUrl:
        "https://hanoicomputercdn.com/media/news/79_netflix_la_gi.jpg",
    },
    {
      teamId: "team_8",
      teamLeaderId: "user_8",
      teamName: "Phê Phim",
      teamLeaderImageUrl:
        "https://emilus.themenate.net/img/avatars/thumb-10.jpg",
      teamLeaderName: "Thanh Duyên",
      teamDescription: "Hóng những chuyện liên quan đến showbiz",
      teamCreatedAt: new Date(),
      teamCode: "IU8O9K",
      teamIsDeleted: false,
      teamImageUrl:
        "https://yt3.ggpht.com/ytc/AAUvwni9b1f0B7V_Wy4UGanrNSzfdzjFAhqNlJgJUqeIaQ=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      teamId: "team_9",
      teamLeaderId: "user_9",
      teamName: "CLB Thể thao",
      teamLeaderImageUrl:
        "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      teamLeaderName: "Thục Trinh",
      teamDescription: "Hóng những chuyện liên quan đến showbiz",
      teamCreatedAt: new Date(),
      teamCode: "IU8O9K",
      teamIsDeleted: false,
      teamImageUrl:
        "https://saigontranslation.com/vi/wp-content/uploads/2015/11/the_duc_the_thao.jpg",
    },
  ];
  const fields = [
    { key: "name", label: "Tên nhóm", _style: { width: "30%" }, filter: true },
    { key: "leader", label: "Trưởng nhóm", _style: { width: "15%" } },
    { key: "member", label: "Thành viên", _style: { width: "1%" } },
    {
      key: "tasks",
      label: "Công việc",
      _style: { width: "5%", className: "text-center" },
    },
    // { key: "owner", label: "Người tải lên", _style: { width: "20%" } },
    // { key: "type", label: "Loại", _style: { width: "10%" } },
    // {
    //   key: "downloadAction",
    //   label: "Tải về",
    //   _style: { width: "10%" },
    //   sorter: false,
    //   filter: false,
    // },
  ];
  const members = useSelector((state) => state.app.users);

  function getMemberCount() {
    return members.length;
  }

  return (
    <div className="list-team-container">
      <div className="header-tool-bar">
        <div className="create-team-btn">
          <CIcon name="cil-plus" />
          Tạo nhóm mới
        </div>
        <CButtonGroup className="show-mode">
          <CTooltip placement="top" content="Lưới">
            <CButton
              className={`first mode-btn ${showMode === 1 && "active"}`}
              color="secondary"
              onClick={() => switchShowMode(1)}
              type="button"
            >
              <CIcon name="cil-grid" />
            </CButton>
          </CTooltip>
          <CTooltip placement="top" content="Danh sách">
            <CButton
              className={`last mode-btn ${showMode === 2 && "active"}`}
              color="secondary"
              onClick={() => switchShowMode(2)}
            >
              <CIcon name="cil-list" />
            </CButton>
          </CTooltip>
        </CButtonGroup>
      </div>
      {showMode === 1 && (
        <CRow className="grid-view-container">
          {teams.map((team, index) => {
            return (
              <CCol
                sm="6"
                lg="3"
                key={index}
                style={{ animationDelay: `${index / 20}s` }}
                className="grid-item-container"
              >
                <div className="item-content">
                  <div className="team-header">
                    <div className="header-actions-dropdown">
                      <CDropdown>
                        <CDropdownToggle id="dropdownMenuButton" caret>
                          <div className="lane-actions">
                            <CIcon name="cil-options" />
                          </div>
                        </CDropdownToggle>
                        <CDropdownMenu
                          aria-labelledby="dropdownMenuButton"
                          placement="bottom-end"
                        >
                          <CDropdownItem className="first">
                            <CIcon name="cil-arrow-circle-right" />
                            Vào nhóm
                          </CDropdownItem>
                          <CDropdownItem className="middle">
                            <div className="dropdown-icon-group">
                              <CIcon name="cil-bell" />
                              <CIcon
                                className="rotate-45"
                                name="cil-window-minimize"
                              />
                            </div>
                            <div className="special-text">Tắt thông báo</div>
                          </CDropdownItem>
                          <CDropdownItem className="last">
                            <CIcon name="cil-account-logout" />
                            Rời nhóm
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                  </div>
                  <div className="team-infor">
                    <img
                      className="team-avatar"
                      alt=""
                      src={team.teamImageUrl}
                    />
                    <div className="team-name">{team.teamName}</div>
                    <div className="team-description">
                      {team.teamDescription}
                    </div>
                  </div>
                  <div className="team-detail-infor">
                    <div className="member-infor">
                      <CIcon name="cil-group" />
                      <div className="member-count">23</div>
                    </div>
                    <div className="divider"></div>
                    <div className="leader-infor">
                      <div className="icon-group">
                        <CIcon name="cil-flag-alt" />
                      </div>
                      <CTooltip placement="top" content={team.teamLeaderName}>
                        <div className="leader-name">
                          <img
                            className="leader-avatar"
                            alt=""
                            src={team.teamLeaderImageUrl}
                          />
                          {team.teamLeaderName}
                        </div>
                      </CTooltip>
                    </div>
                  </div>
                  <div className="team-action">Vào nhóm</div>
                </div>
              </CCol>
            );
          })}
        </CRow>
      )}
      {showMode === 2 && (
        <div className="table-view-container">
          <div className="table-content">
            <table className="table table-hover  mb-0 d-none d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th className="text-center">
                    <CIcon name="cil-people" />
                  </th>
                  <th>Tên nhóm</th>
                  <th>Trưởng nhóm</th>

                  <th>Tiến độ</th>
                  <th className="text-center">Thành viên</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => {
                  return (
                    <tr style={{ animationDelay: `${index / 20}s` }}>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img
                            src={team.teamImageUrl}
                            className="c-avatar-img"
                            alt="admin@bootstrapmaster.com"
                          />
                        </div>
                      </td>
                      <td>
                        <div>{team.teamName}</div>
                        <div className="small text-muted">
                          {team.teamDescription}
                        </div>
                      </td>
                      <td>
                        <div className="leader-cell">
                          <img
                            className="team-leader-avatar"
                            alt=""
                            src={team.teamLeaderImageUrl}
                          />
                          <div className="">{team.teamLeaderName}</div>
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>50%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">
                              11/01/2021 - 20/04/2021
                            </small>
                          </div>
                        </div>
                        <CProgress
                          className="progress-xs"
                          color="success"
                          value="50"
                        />
                      </td>
                      <td className="text-center">
                        <AvatarList users={members} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListTeamPage;
