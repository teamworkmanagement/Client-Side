import React, { useEffect, useRef, useState } from "react";
import "./AccountSettingsPage.scss";
import {
  CCol,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
  CTextarea,
} from "@coreui/react";
import { ImInfo } from "react-icons/im";

import {
  AiOutlineLock,
  AiOutlineDelete,
  AiFillGithub,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import authApi from "src/api/authApi";
import {
  changePassword,
  setCurrentUser,
} from "src/shared_components/views/pages/login/authSlice";
import CIcon from "@coreui/icons-react";
import {
  changeStateSettingOptionsSidebar,
  setSettingPageTab,
} from "src/appSlice";
import { FiEdit3 } from "react-icons/fi";
import { FaFacebookSquare } from "react-icons/fa";
import firebaseConfig from "src/utils/firebase/firebaseConfig";
import uuid from "src/utils/file/uuid";
import userApi from "src/api/userApi";
import { validateEmail, validatePhone } from "src/utils/common";
import { toast } from "react-toastify";
import CustomToast from "src/shared_components/MySharedComponents/CustomToast/CustomToast";

function AccountSettingsPage(props) {
  const settingPageTab = useSelector((state) => state.app.settingPageTab);
  const [selectedOptions, setSelectedOptions] = useState(0); //0:INFO, 1:PASSWORD
  const user = { ...useSelector((state) => state.auth.currentUser) };
  const [userInfo, setUserInfo] = useState(user);
  const [changePWObject, setResetPasswordObject] = useState({
    userId: user.id,
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
  });
  const [currentDirty, setCurrentDirty] = useState(false);
  const [newDirty, setNewDirty] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const dispatch = useDispatch();
  function ChooseSettingOption(index) {
    dispatch(setSettingPageTab(index));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    setSelectedOptions(settingPageTab);
  }, [settingPageTab]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") setNewDirty(true);
    if (name === "currentPassword") setCurrentDirty(true);
    else setConfirmDirty(true);

    setResetPasswordObject({
      ...changePWObject,
      [name]: value,
    });
  };

  const updateUserInfo = () => {
    if (!userInfo.fullName || !userInfo.email) {
      toast(
        <CustomToast
          type="error"
          title="L???i"
          message="Vui l??ng nh???p ?????y ????? th??ng tin"
        />
      );
      return;
    }

    if (!validateEmail(userInfo.email)) {
      toast(
        <CustomToast type="error" title="L???i" message="Email kh??ng h???p l???" />
      );
      return;
    }

    if (!validatePhone(userInfo.userPhoneNumber) && userInfo.userPhoneNumber) {
      toast(
        <CustomToast
          type="error"
          title="L???i"
          message="S??? ??i???n tho???i kh??ng h???p l???"
        />
      );
      return;
    }
    console.log(userInfo);

    let dob = "";
    console.log(userInfo);
    if (userInfo.userDob === "") {
      dob = null;
    } else {
      dob = new Date(userInfo.userDob);
    }

    console.log(dob);
    const userInfoClone = { ...userInfo, userDob: dob };
    authApi
      .updateUserInfo(userInfoClone)
      .then((res) => {})
      .catch((err) => {
        toast(<CustomToast type="error" title="L???i" message="C?? l???i x???y ra" />);
      });
  };

  const changePasswordClick = () => {
    console.log(changePWObject);
    if (
      !changePWObject.confirmPassword ||
      (!changePWObject.currentPassword &&
        !user.firstTimeSocial &&
        !changePWObject.newPassword)
    ) {
      toast(
        <CustomToast
          type="error"
          title="L???i"
          message="Vui l??ng ki???m tra d??? li???u"
        />
      );
      return;
    }
    dispatch(changePassword(changePWObject));
  };
  const toggleSettingOptionsSidebar = () => {
    dispatch(
      changeStateSettingOptionsSidebar({
        type: "settingoptionssidebar",
        settingOptionsSidebarShow: true,
      })
    );
  };

  const imgPickerRef = useRef(null);
  const pickImage = () => {
    imgPickerRef.current.click();
  };

  const onPickImage = (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseConfig.storage().ref();
    const fileRef = storageRef.child(`${uuid()}/${file.name}`);
    fileRef.put(file).then((data) => {
      console.log("Uploaded a file");
      data.ref.getDownloadURL().then((url) => {
        console.log(url);
        userApi
          .updateImageUrl({
            delete: false,
            userId: userInfo.id,
            imageUrl: url,
          })
          .then((res) => {
            setUserInfo({
              ...userInfo,
              userAvatar: url,
            });
            dispatch(
              setCurrentUser({
                ...userInfo,
                userAvatar: url,
              })
            );
          })
          .catch((err) => {});
      });
    });
  };

  const removeImage = () => {
    userApi
      .updateImageUrl({
        delete: true,
        userId: userInfo.id,
        imageUrl: null,
      })
      .then((res) => {
        setUserInfo({
          ...userInfo,
          userAvatar: `https://ui-avatars.com/api/?name=${userInfo.fullName}`,
        });
      })
      .catch((err) => {});
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);

  return (
    <div className="account-page-container">
      <div className="toggle-setting-options-sidebar-btn">
        <CIcon
          //className="ml-md-3 d-md-none toggle-chat-list-sidebar-icon"
          className="ml-md-3 d-sm-down-block  d-md-none toggle-chat-list-sidebar-icon"
          onClick={toggleSettingOptionsSidebar}
          name="cil-menu"
        />
      </div>
      <div className="account-page-content">
        <div className="setting-options d-sm-down-none">
          <div
            className={`tab-setting tab-1 tab-infor ${
              selectedOptions === 0 ? "active" : ""
            }`}
            onClick={() => ChooseSettingOption(0)}
          >
            <ImInfo className="icon-info icon" />
            Th??ng tin c???a b???n
          </div>
          <div
            className={`tab-setting tab-2 tab-passowrd ${
              selectedOptions === 1 ? "active" : ""
            }`}
            onClick={() => ChooseSettingOption(1)}
          >
            <AiOutlineLock className="icon-password icon" />
            ?????i m???t kh???u
          </div>
        </div>

        <div className="settings-content">
          {selectedOptions === 0 && (
            <div className="setting-content setting-infor-content">
              <div className="avatar-group">
                <img alt="" src={userInfo.userAvatar} />
                <div className="avatar-action-group">
                  <div className="change-image-btn" onClick={pickImage}>
                    <FiEdit3 className="change-ava-icon" />
                    ?????i ???nh ?????i di???n
                    <input
                      accept="image/*"
                      onChange={onPickImage}
                      ref={imgPickerRef}
                      type="file"
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="remove-image-btn" onClick={removeImage}>
                    <AiOutlineDelete className="icon delete-ava-icon" />
                    X??a ???nh
                  </div>
                </div>
              </div>
              <CRow className="info-row">
                <CCol sm="12" lg="6">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="inputIsValid">
                      <div className="require-item">*</div>H??? t??n
                    </CLabel>
                    <CInput
                      id="fullname-input"
                      placeholder="Nh???p h??? t??n..."
                      autoComplete
                      name="fullName"
                      value={userInfo.fullName}
                      onChange={handleInputChange}
                      invalid={
                        userInfo.fullName === "" || userInfo.fullName === null
                      }
                    />
                    <CInvalidFeedback>T??n kh??ng h???p l???</CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol sm="12" lg="6">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="phone-input">
                      <div className="require-item not-show">*</div>S??? ??i???n
                      tho???i
                    </CLabel>
                    <CInput
                      id="phone-input"
                      placeholder="Nh???p s??? ??i???n tho???i..."
                      name="userPhoneNumber"
                      value={userInfo.userPhoneNumber}
                      onChange={handleInputChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="info-row">
                <CCol sm="12" lg="6">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="email-input">
                      <div className="require-item">*</div>Email
                    </CLabel>
                    <CInput
                      disabled
                      type="email"
                      id="email-input"
                      placeholder="Nh???p email..."
                      autoComplete="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      invalid={userInfo.email === "" || userInfo.email === null}
                    />
                    <CInvalidFeedback>Email kh??ng h???p l???</CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol sm="12" lg="6">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="birthDate-input">
                      <div className="require-item not-show">*</div>Ng??y sinh
                    </CLabel>
                    <CInput
                      name="userDob"
                      id="birthDate-input"
                      value={
                        userInfo.userDob
                          ? userInfo.userDob.substring(0, 10)
                          : ""
                      }
                      type="date"
                      onChange={handleInputChange}
                    />
                    <CInvalidFeedback>Ng??y sinh kh??ng h???p l???</CInvalidFeedback>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="info-row">
                <CCol sm="12" lg="8">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="email-input">
                      <div className="require-item not-show">*</div>M?? t??? b???n
                      th??n
                    </CLabel>
                    <CTextarea
                      type="text"
                      id="des-input"
                      placeholder="Th??ng tin b???n th??n..."
                      value={userInfo.userDescription}
                      name="userDescription"
                      onChange={handleInputChange}
                    />
                    <CInvalidFeedback>Email kh??ng h???p l???</CInvalidFeedback>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="info-row">
                <CCol sm="12" lg="8">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="email-input">
                      <div className="require-item not-show">*</div>?????a ch???
                    </CLabel>
                    <CInput
                      type="text"
                      id="des-input"
                      placeholder="?????a ch???..."
                      value={userInfo.userAddress}
                      onChange={handleInputChange}
                      name="userAddress"
                      //value={userInfo.email}
                      //onChange={handleInputChange}
                      //invalid={userInfo.email === "" || userInfo.email === null}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="info-row">
                <CCol sm="12" lg="8">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="email-input">
                      <div className="require-item not-show">*</div>Li??n k???t
                      kh??c
                    </CLabel>
                    <div className="social-group">
                      <div className="social-label">
                        <AiFillGithub className="github-icon icon" /> Github
                      </div>
                      <CInput
                        type="text"
                        id="des-input"
                        placeholder="Github link..."
                        value={userInfo.userGithubLink}
                        name="userGithubLink"
                        onChange={handleInputChange}
                        //value={userInfo.email}
                        //onChange={handleInputChange}
                        //invalid={userInfo.email === "" || userInfo.email === null}
                      />
                    </div>
                    <div className="social-group">
                      <div className="social-label">
                        <FaFacebookSquare className="github-icon icon" />{" "}
                        Facebook
                      </div>
                      <CInput
                        type="text"
                        id="des-input"
                        placeholder="Facebook link..."
                        name="userFacebookLink"
                        value={userInfo.userFacebookLink}
                        onChange={handleInputChange}
                        //value={userInfo.email}
                        //onChange={handleInputChange}
                        //invalid={userInfo.email === "" || userInfo.email === null}
                      />
                    </div>
                  </CFormGroup>
                </CCol>
              </CRow>

              <div onClick={updateUserInfo} className="save-btn">
                L??u l???i
              </div>
            </div>
          )}
          {selectedOptions === 1 && (
            <div className="setting-content setting-password-content">
              {!user.firstTimeSocial ? (
                <CFormGroup>
                  <CLabel className="input-label" htmlFor="current-password">
                    M???t kh???u hi???n t???i
                  </CLabel>
                  <div className="password-group">
                    <CInput
                      id="current-password"
                      placeholder="Nh???p m???t kh???u hi???n t???i..."
                      value={changePWObject.currentPassword}
                      onChange={handlePasswordChange}
                      invalid={currentDirty && !changePWObject.currentPassword}
                      type={`${showPassword ? "text" : "password"}`}
                      name="currentPassword"
                    />
                    {showPassword && (
                      <AiFillEye
                        onClick={() => setShowPassword(false)}
                        className="icon-eye-password icon-showpassword"
                      />
                    )}
                    {!showPassword && (
                      <AiFillEyeInvisible
                        onClick={() => setShowPassword(true)}
                        className=" icon-eye-password icon-hidepassword"
                      />
                    )}
                  </div>
                  <CInvalidFeedback>
                    M???t kh???u hi???n t???i kh??ng h???p l???
                  </CInvalidFeedback>
                </CFormGroup>
              ) : null}
              <CFormGroup>
                <CLabel className="input-label" htmlFor="new-password">
                  M???t kh???u m???i
                </CLabel>
                <div className="password-group">
                  <CInput
                    type={`${showNewPassword ? "text" : "password"}`}
                    id="new-password"
                    placeholder="Nh???p m???t kh???u m???i..."
                    value={changePWObject.newPassword}
                    onChange={handlePasswordChange}
                    invalid={
                      newDirty &&
                      (changePWObject.newPassword === "" ||
                        changePWObject.newPassword === null)
                    }
                    valid={newDirty && changePWObject.newPassword !== ""}
                    name="newPassword"
                  />
                  {showNewPassword && (
                    <AiFillEye
                      onClick={() => setShowNewPassword(false)}
                      className="icon-eye-password icon-showpassword"
                    />
                  )}
                  {!showNewPassword && (
                    <AiFillEyeInvisible
                      onClick={() => setShowNewPassword(true)}
                      className=" icon-eye-password icon-hidepassword"
                    />
                  )}
                </div>

                <CInvalidFeedback>M???t kh???u m???i kh??ng h???p l???</CInvalidFeedback>
              </CFormGroup>
              <CFormGroup>
                <CLabel className="input-label" htmlFor="new-password-confirm">
                  X??c nh???n m???t kh???u m???i
                </CLabel>
                <div className="password-group">
                  <CInput
                    type={`${showReNewPassword ? "text" : "password"}`}
                    id="new-password-confirm"
                    placeholder="Nh???p l???i m???t kh???u m???i..."
                    value={changePWObject.confirmPassword}
                    onChange={handlePasswordChange}
                    invalid={
                      confirmDirty &&
                      (changePWObject.confirmPassword === "" ||
                        changePWObject.confirmPassword === null ||
                        changePWObject.confirmPassword !==
                          changePWObject.newPassword)
                    }
                    valid={
                      confirmDirty &&
                      changePWObject.confirmPassword ===
                        changePWObject.newPassword
                    }
                    name="confirmPassword"
                  />
                  {showReNewPassword && (
                    <AiFillEye
                      onClick={() => setShowReNewPassword(false)}
                      className="icon-eye-password icon-showpassword"
                    />
                  )}
                  {!showReNewPassword && (
                    <AiFillEyeInvisible
                      onClick={() => setShowReNewPassword(true)}
                      className=" icon-eye-password icon-hidepassword"
                    />
                  )}
                </div>

                <CInvalidFeedback>
                  x??c nh???n m???t kh???u m???i kh??ng tr??ng kh???p
                </CInvalidFeedback>
              </CFormGroup>
              <div onClick={changePasswordClick} className="save-btn-password">
                C???p nh???t
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsPage;
