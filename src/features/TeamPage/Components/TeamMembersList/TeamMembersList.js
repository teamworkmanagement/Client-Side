import React, { useEffect, useRef, useState } from "react";
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
import { useParams } from "react-router";
import teamApi from "src/api/teamApi";
import InviteMemberModal from "./InviteMemberModal/InviteMemberModal";
import chatApi from "src/api/chatApi";
import { useDispatch, useSelector } from "react-redux";
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
import Loading from "src/shared_components/MySharedComponents/Loading/Loading";
import { CgArrowsExchange } from "react-icons/cg";
import { setUserModal } from "src/appSlice";
import { useHistory } from "react-router-dom";
import {
  setUpdateTeamInfo,
  setLeaveTeam,
  setJoinTeam,
} from "src/utils/signalr/signalrSlice";
import { toast } from "react-toastify";
import CustomToast from "src/shared_components/MySharedComponents/CustomToast/CustomToast";

function TeamMembersList(props) {
  const [showMode, setShowMode] = useState(1); //1:list, 2:grid

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

  const [admin, setAdmin] = useState({});
  const [members, setMembers] = useState([]);
  const [team, setTeam] = useState({});
  const [showInvite, setShowInvite] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showStartChat, setShowStartChat] = useState(false);
  const [pages, setPages] = useState(1);
  const [fixedMembers, setFixedMembers] = useState([]);
  const user = useSelector((state) => state.auth.currentUser);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const { teamId } = useParams();
  const [filterObj, setFilterObj] = useState(null);

  const imgPickerRef = useRef(null);
  const history = useHistory();

  const updateTeamInfSignalR = useSelector(
    (state) => state.signalr.updateTeamInfo
  );
  const leftTeam = useSelector((state) => state.signalr.leaveTeam);
  const joinTeam = useSelector((state) => state.signalr.joinTeam);

  useEffect(() => {
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz: ", teamId);
    if (!teamId) return;
    setLoadingMembers(true);
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
      pageSize: 5,
      keyWord: null,
    };

    setFilterObj(params);

    teamApi
      .getTeam(teamId)
      .then((res) => {
        setTeam(res.data);
      })
      .catch((err) => { });
  }, [teamId]);

  useEffect(() => {
    if (!updateTeamInfSignalR) return;
    if (updateTeamInfSignalR) {
      console.log("realtimezzzzzzzzzzzzzzzzzzzzzzz");
      if (teamId === updateTeamInfSignalR.teamId) {
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
          pageSize: 10,
          keyWord: null,
        };

        setFilterObj(params);

        teamApi
          .getTeam(teamId)
          .then((res) => {
            setTeam(res.data);
          })
          .catch((err) => { });

        dispatch(setUpdateTeamInfo(null));
      }
    }
  }, [updateTeamInfSignalR]);

  useEffect(() => {
    if (!joinTeam) return;
    if (joinTeam) {
      if (teamId === joinTeam.teamId) {
        //load lại ds thành viên
        const params = {
          teamId: teamId,
          pageSize: 10,
          pageNumber: 1,
          keyWord: null,
        };

        setFilterObj(params);
      }
    }
    dispatch(setJoinTeam(null));
  }, [joinTeam]);

  useEffect(() => {
    if (!leftTeam) return;
    if (leftTeam) {
      if (teamId === leftTeam.teamId) {
        //load lại ds thành viên
        const params = {
          teamId: teamId,
          pageSize: 10,
          pageNumber: 1,
          keyWord: null,
        };

        setFilterObj(params);
      }
    }
    dispatch(setLeaveTeam(null));
  }, [leftTeam]);

  const currentPageChange = (index) => {
    if (index === 0) return;
    setLoadingMembers(true);
    console.log(index);
    setCurrentPage(index);

    const params = {
      teamId: teamId,
      pageSize: 10,
      pageNumber: index,
      keyWord: null,
    };

    setFilterObj(params);
  };

  const onClose = (err) => {
    setShowInvite(false);
    if (err.ErrorCode && err.ErrorCode === '409') {
      toast(
        <CustomToast
          type="error"
          title="Lỗi"
          message="Thành viên đã tồn tại!"
        />
      );
      return;
    }
    if (err.ErrorCode && err.ErrorCode === '404') {
      toast(
        <CustomToast
          type="error"
          title="Lỗi"
          message="Người dùng tồn tại!"
        />
      );
      return;
    }
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
          history.push({
            pathname: "/chat",
            search: `g=${res.data.groupChatId}`,
          });
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

  const dispatch = useDispatch();
  const onStartChatClose = (grChatId) => {
    setShowStartChat(false);
    if (grChatId) {
      history.push({
        pathname: "/chat",
        search: `g=${grChatId}`,
      });
    }
  };

  function NoItemView() {
    return (
      <div className="no-item-view-table">
        <div className="nodata-image">
          <div className="icon-group">
            <AiOutlineTeam className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>
          <div className="noti-infor">Không tìm thấy thành viên</div>
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

    teamApi
      .updateTeam(newTeam)
      .then((res) => {
        setTeam(newTeam);
      })
      .catch((err) => { });
  };

  const onPickImage = (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseConfig.storage().ref();
    const fileRef = storageRef.child(`${uuid()}/${file.name}`);
    fileRef.put(file).then((data) => {
      console.log("Uploaded a file");
      data.ref.getDownloadURL().then((url) => {
        console.log(url);
        onUpdateTeam({
          name: "teamImageUrl",
          value: url,
        });
      });
    });
  };

  const openPickImage = () => {
    imgPickerRef.current.click();
  };

  const changeLeader = (item) => {
    const confirmBox = window.confirm("Bạn có chắc chắn muốn trao lại quyền quản lý?");
    if (confirmBox !== true) {
      return;
    }
    teamApi
      .changeLeader({
        teamId: team.teamId,
        leaderId: item.userId,
      })
      .then((res) => {
        if (!teamId) return;

        teamApi
          .getAdmin(teamId)
          .then((res) => {
            console.log(res);
            setAdmin(res.data);

            props.changeLeader();
          })
          .catch((err) => { });

        const params = {
          teamId: teamId,
          pageNumber: 1,
          pageSize: 10,
        };

        setFilterObj(params);

        teamApi
          .getTeam(teamId)
          .then((res) => {
            setTeam(res.data);
          })
          .catch((err) => { });
      })
      .catch((err) => { });
  };

  const quitTeam = (item) => {
    console.log("quitteam: ", item);

    const params = {
      teamId: teamId,
      userId: item.userId,
    };

    teamApi
      .leaveTeam({ params })
      .then((res) => { })
      .catch((err) => { });
  };

  useEffect(() => {
    if (filterObj) {
      const clone = {
        ...filterObj,
        pageSize: 10,
      };
      teamApi
        .getUsersPagingByTeam({ params: clone })
        .then((res) => {
          console.log(res.data.items);
          setMembers(res.data.items);
          setPages(Math.ceil(res.data.totalRecords / res.data.pageSize));
        })
        .catch((err) => { })
        .finally(() => {
          setLoadingMembers(false);
        });

      console.log(filterObj);
    }
  }, [filterObj]);

  //eslint-disable-next-line
  const [userId, setUserId] = useState(null);
  const xemThongTin = (item) => {
    setUserId(item.userId);
    dispatch(
      setUserModal({
        show: true,
        userId: item.userId,
      })
    );
  };
  return (
    <div className="team-members-container">
      <div className="members-list-header">
        <div className="other-actions">
          <div className="lookup-input">
            <CInput type="text" name="teamName" placeholder="Tìm thành viên" />
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
              <img alt="" src={team.teamImageUrl} />
            </div>
            <div className="team-name-actions">
              <div className="team-name">{team.teamName}</div>
              <div className="actions-group">
                <div
                  onClick={() => {
                    if (admin.userId !== user.id) return;
                    openPickImage();
                  }}
                  className={`btn-change-image ${admin.userId !== user.id ? "disable" : ""
                    }`}
                >
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
                  className={`btn-change-name ${admin.userId !== user.id ? "disable" : ""
                    }`}
                  onClick={() => {
                    if (admin.userId !== user.id) return;
                    setShowEditName(true);
                  }}
                >
                  <FiEdit3 className="icon-edit-image icon-edit" />
                  Đổi tên nhóm
                </div>
              </div>
            </div>
          </div>
          <div className="team-code-group">
            <div className="label-code">Mã nhóm</div>
            <div className="team-code">{team?.teamCode}</div>
          </div>
          <div className="team-description-group">
            <div className="label-description">
              Mô tả
              {admin.userId === user.id && (
                <div
                  className="icon-edit-container"
                  onClick={() => setShowEditDescription(true)}
                >
                  <FiEdit3 className="icon-edit-description icon-edit" />
                </div>
              )}
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
              items={[admin]}
              fields={fields}
              scopedSlots={{
                infor: (item) => {
                  return (
                    <td>
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
                            {admin.userId !== user.id && (
                              <CDropdownItem
                                className="first"
                                onClick={() => nhanTin(admin)}
                              >
                                <CIcon name="cil-send" />
                                Nhắn tin
                              </CDropdownItem>
                            )}
                            <CDropdownItem
                              className="last"
                              onClick={() => xemThongTin(admin)}
                            >
                              <CIcon name="cil-info" />
                              Xem thông tin
                            </CDropdownItem>
                            {/*<CDropdownItem className="normal">
                              <CIcon name="cil-find-in-page" />
                              Trao quyền admin
                            </CDropdownItem>
                            <CDropdownItem className="last">
                              <CIcon name="cil-account-logout" />
                              Mời rời nhóm
                  </CDropdownItem>*/}
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
                  placeholder="Tìm thành viên"
                  onChange={(e) =>
                    setFilterObj({
                      ...filterObj,
                      keyWord: e.target.value,
                      pageNumber: 1,
                    })
                  }
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
            {loadingMembers && members.length === 0 && <Loading />}
            {members.length === 0 && NoItemView()}
            {members.length > 0 && (
              <CDataTable
                items={members}
                fields={fields}
                noItemsViewSlot={NoItemView()}
                scopedSlots={{
                  infor: (item) => {
                    return (
                      <td>
                        <div className="member-infor-container">
                          <img
                            className="member-avatar"
                            alt=""
                            src={item.userImageUrl}
                          />

                          <div className="member-infor">
                            <div className="member-name">
                              {item.userFullname}
                            </div>
                            <div className="member-email">{item.userEmail}</div>
                          </div>
                        </div>
                      </td>
                    );
                  },
                  role: (item) => {
                    return (
                      <td>
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
                                <CIcon
                                  name="cil-options"
                                  className="rotate-90"
                                />
                              </div>
                            </CDropdownToggle>
                            <CDropdownMenu
                              aria-labelledby="dropdownMenuButton"
                              placement="bottom-end"
                            >
                              {item.userId !== user.id && (
                                <CDropdownItem
                                  className="first"
                                  onClick={() => nhanTin(item)}
                                >
                                  <CIcon name="cil-send" />
                                  Nhắn tin
                                </CDropdownItem>
                              )}

                              <CDropdownItem
                                className="normal"
                                onClick={() => xemThongTin(item)}
                              >
                                <CIcon name="cil-info" />
                                Xem thông tin
                              </CDropdownItem>

                              {team.teamLeaderId === user.id && (
                                <CDropdownItem
                                  className="normal"
                                  onClick={() => changeLeader(item)}
                                >
                                  {/* <CIcon name="cil-find-in-page" /> */}
                                  <CgArrowsExchange className="c-icon icon-exchange" />
                                  Trao quyền Trưởng nhóm
                                </CDropdownItem>
                              )}
                              {team.teamLeaderId === user.id && (
                                <CDropdownItem
                                  className="last"
                                  onClick={() => quitTeam(item)}
                                >
                                  <CIcon name="cil-account-logout" />
                                  Mời rời nhóm
                                </CDropdownItem>
                              )}
                            </CDropdownMenu>
                          </CDropdown>
                        </div>
                      </td>
                    );
                  },
                }}
              />
            )}

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

      <InviteMemberModal
        showAddInvite={showInvite}
        teamId={team.teamId}
        onClose={onClose}
      />
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
