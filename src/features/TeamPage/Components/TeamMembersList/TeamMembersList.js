import React, { useEffect, useRef, useState } from "react";
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
  CToast,
  CToastBody,
  CToaster,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Redirect, useHistory, useParams } from "react-router";
import teamApi from "src/api/teamApi";
import InviteMemberModal from "./InviteMemberModal/InviteMemberModal";
import chatApi from "src/api/chatApi";
import { useSelector } from "react-redux";
import uuid from "src/utils/file/uuid";
import StartChatMembers from "../StartChatMembers/StartChatMembers";
import { BsSearch } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { VscSearchStop } from "react-icons/vsc";
import { RiImageEditFill } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import EditTeamNameModal from "./EditTeamNameModal/EditTeamNameModal";
import EditTeamDescriptionModal from "./EditTeamDescriptionModal/EditTeamDescriptionModal";
import firebaseConfig from "src/utils/firebase/firebaseConfig";

TeamMembersList.propTypes = {};

function TeamMembersList(props) {
  const [showMode, setShowMode] = useState(1); //1:list, 2:grid
  const history = useHistory();
  const teamName = "Nhóm ôn thi TOEIC";
  const teamDescription =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.";
  const [currentPage, setCurrentPage] = useState(1);
  function switchShowMode(index) {
    if (index === showMode) return;
    setShowMode(index);
  }
  const fields = [
    { key: "infor", label: "Tên", _style: { width: "100%" } },
    { key: "role", label: "Vai trò" },
    { key: "actions", label: "Hành động", _style: { width: "5%" } },
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

  const [admin, setAdmin] = useState({});
  const [members, setMembers] = useState([]);
  const [team, setTeam] = useState({});
  const [showInvite, setShowInvite] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showStartChat, setShowStartChat] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [toastContent, setToastContent] = useState("");
  const [pages, setPages] = useState(1);
  const [fixedMembers, setFixedMembers] = useState([]);
  const user = useSelector((state) => state.auth.currentUser);
  const { teamId } = useParams();

  const imgPickerRef = useRef(null);

  const [redirect, setRedirect] = useState(null);

  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || [];
      toasters[toast.position].push(toast);
      return toasters;
    }, {});
  })();

  useEffect(() => {
    if (!teamId) return;
    teamApi
      .getAdmin(teamId)
      .then((res) => {
        console.log(res);
        setAdmin(res.data);
      })
      .catch((err) => { });

    const params = {
      teamId: teamId,
      pageNumber: 1,
      pageSize: 1,
    };

    teamApi
      .getUsersPagingByTeam({ params })
      .then((res) => {
        console.log(res.data.items);
        setMembers(res.data.items);
        setPages(Math.ceil(res.data.totalRecords / res.data.pageSize));
      })
      .catch((err) => { });

    teamApi
      .getTeam(teamId)
      .then((res) => {
        setTeam(res.data);
      })
      .catch((err) => { });
  }, [teamId]);

  const currentPageChange = (index) => {
    if (index === 0) return;
    console.log(index);
    setCurrentPage(index);

    const params = {
      teamId: teamId,
      pageSize: 1,
      pageNumber: index,
    };

    teamApi
      .getUsersPagingByTeam({ params })
      .then((res) => {
        console.log(res.data.items);
        setMembers(res.data.items);
        setPages(Math.ceil(res.data.totalRecords / res.data.pageSize));
      })
      .catch((err) => { });
  };

  const onClose = (e) => {
    setShowInvite(false);
    if (!e) return;
    setToastContent(e);
    setToasts([
      ...toasts,
      {
        position: "bottom-left",
        autohide: 1000,
        closeButton: false,
        fade: true,
        color: "info",
      },
    ]);
    //setShowInvite(false); //ở đây chương trình ko chạy tới dc
  };

  const nhanTin = (item) => {
    console.log(item);
    chatApi
      .checkDoubleExists({
        userOneId: user.id,
        userTwoId: item.userId,
      })
      .then((res) => {
        if (res.data.exists) {
          console.log(res.data);
          /*history.push({
          pathname: '/chat',
          search: `g=${res.data.groupChatId}`
        });*/
          //history.push(`http://localhost:4155/chat?g=${res.data.groupChatId}`);
          //history.replace(`/chat?g=${res.data.groupChatId}`);
          setRedirect(`/chat?g=${res.data.groupChatId}`);
        } else {
          console.log(res.data);
          setShowStartChat(true);

          setFixedMembers([
            {
              value: user.id,
              label: user.fullName,
              img: user.userAvatar,
              isFixed: true,
            },
            {
              value: item.userId,
              label: item.userFullname,
              img: item.userImageUrl,
              isFixed: true,
            },
          ]);
        }
      })
      .catch((err) => { });
  };

  const onStartChatClose = () => {
    setShowStartChat(false);
  };

  function NoItemView() {
    return (
      <div className="no-item-view-table">
        <div className="nodata-image">
          <div className="icon-group">
            <AiOutlineTeam className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">Chưa có thành viên nào trong nhóm</div>
          <div className="create-btn">Mời thành viên</div>
        </div>
      </div>
    );
  }

  function onCloseEditNameModal() {
    setShowEditName(false);
  }
  function onCloseEditDescriptionModal() {
    setShowEditDescription(false);
  }

  const onUpdateTeam = (object) => {
    console.log(object);
    const { name, value } = object;
    const newTeam = {
      ...team,
      [name]: value,
    };

    teamApi.updateTeam(newTeam)
      .then(res => {
        setTeam(newTeam);
      }).catch(err => {

      })
  }

  const onPickImage = (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseConfig.storage().ref();
    const fileRef = storageRef.child(`${uuid()}/${file.name}`);
    fileRef.put(file).then((data) => {
      console.log("Uploaded a file");
      data.ref.getDownloadURL().then((url) => {
        console.log(url);
        onUpdateTeam({
          name: 'teamImageUrl',
          value: url
        })
      });
    });
  }

  const openPickImage = () => {
    imgPickerRef.current.click();
  }
  return (
    <div className="team-members-container">
      {redirect ? <Redirect from="/team" to={redirect} /> : null}

      <div className="members-list-header">
        <div className="other-actions">
          <div className="lookup-input">
            <CInput
              type="text"
              name="teamName"
              placeholder="Tìm công việc..."
            />
            <BsSearch className="icon-search" />
          </div>
          <div
            className="add-btn add-list-btn"
            onClick={() => {
              setShowInvite(true);
            }}
          >
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
      <div className="team-info-panel">
        <div className="team-info-panel-content">
          <div className="name-image-group">
            <div className="team-image-container">
              <img
                alt=""
                src={team.teamImageUrl}
              />
            </div>
            <div className="team-name-actions">
              <div className="team-name">
                {team.teamName}
              </div>
              <div className="actions-group">
                <div onClick={openPickImage} className="btn-change-image">
                  <RiImageEditFill className="icon-edit-image icon-edit" />
                  Đổi ảnh
                  <input
                    accept="image/*"
                    onChange={onPickImage}
                    ref={imgPickerRef}
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>
                <div
                  className="btn-change-name"
                  onClick={() => setShowEditName(true)}
                >
                  <FiEdit3 className="icon-edit-image icon-edit" />
                  Đổi tên nhóm
                </div>
              </div>
            </div>
          </div>
          <div className="team-description-group">
            <div className="label-description">
              Mô tả
              <div
                className="icon-edit-container"
                onClick={() => setShowEditDescription(true)}
              >
                <FiEdit3 className="icon-edit-description icon-edit" />
              </div>
            </div>
            <div className="team-description">{team.teamDescription}</div>
          </div>
        </div>
      </div>
      <CRow>
        <CCol lg="3" md="12" className="col-leader">
          <div className="leader-infor-container d-md-down-none">
            <div className="label">Trưởng nhóm </div>
            <img alt="" src={admin.userImageUrl} />
            <div className="leader-name">{admin.userFullname}</div>
            <div className="leader-email">{admin.userEmail}</div>
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
                          src={admin.userImageUrl}
                        />

                        <div className="member-infor">
                          <div className="member-name">
                            {admin.userFullname}
                          </div>
                          <div className="member-email">{admin.userEmail}</div>
                        </div>
                      </div>
                    </td>
                  );
                },
                role: (item) => {
                  return (
                    <td>
                      <div className="member-role">
                        <div className={`role-color leader`}></div>
                        Trưởng nhóm
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
                            <CDropdownItem
                              className="first"
                              onClick={() => nhanTin(admin)}
                            >
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
            <div className="members-list-header">
              <div className="lookup-input">
                <CInput
                  type="text"
                  name="teamName"
                  placeholder="Tìm công việc..."
                />
                <BsSearch className="icon-search" />
              </div>
              <div
                className="add-btn add-list-btn"
                onClick={() => {
                  setShowInvite(true);
                }}
              >
                <CIcon name="cil-plus" />
                Mời thành viên
              </div>
            </div>
            <div className="label">Thành viên</div>
            <CDataTable
              items={members}
              fields={fields}
              noItemsViewSlot={NoItemView()}
              scopedSlots={{
                infor: (item) => {
                  return (
                    <td onClick={() => navigateToProfile(item)}>
                      <div className="member-infor-container">
                        <img
                          className="member-avatar"
                          alt=""
                          src={item.userImageUrl}
                        />

                        <div className="member-infor">
                          <div className="member-name">{item.userFullname}</div>
                          <div className="member-email">{item.userEmail}</div>
                        </div>
                      </div>
                    </td>
                  );
                },
                role: (item) => {
                  return (
                    <td onClick={() => navigateToProfile(item)}>
                      <div className="member-role">
                        <div className={`role-color`}></div>
                        Thành viên
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
                            <CDropdownItem
                              className="first"
                              onClick={() => nhanTin(item)}
                            >
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
            {members.length > 0 && (
              <CPagination
                className="pagination-team-members"
                activePage={currentPage}
                pages={pages}
                onActivePageChange={currentPageChange}
                doubleArrows={false}
                dots
              />
            )}
          </div>
        </CCol>
      </CRow>
      <div>
        {Object.keys(toasters).map((toasterKey) => (
          <CToaster
            color="bg-info"
            position={toasterKey}
            key={"toaster" + toasterKey}
          >
            {toasters[toasterKey].map((toast, key) => {
              return (
                <CToast show={true} autohide={2000} fade={true}>
                  <CToastBody>{toastContent}</CToastBody>
                </CToast>
              );
            })}
          </CToaster>
        ))}
      </div>
      <InviteMemberModal showAddInvite={showInvite} onClose={onClose} />
      <EditTeamNameModal
        teamName={team.teamName}
        show={showEditName}
        onSave={onUpdateTeam}
        onClose={onCloseEditNameModal}
      />
      <EditTeamDescriptionModal
        teamDescription={team.teamDescription}
        show={showEditDescription}
        onSave={onUpdateTeam}
        onClose={onCloseEditDescriptionModal}
      />
      <StartChatMembers
        showStartChat={showStartChat}
        fixedMembers={fixedMembers}
        onModalClose={onStartChatClose}
      />
    </div>
  );
}

export default TeamMembersList;
