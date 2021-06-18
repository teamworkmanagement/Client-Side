import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./AccountSettingsPage.scss";
import {
  CCol,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
  CTextarea,
  CValidFeedback,
} from "@coreui/react";
import { BiKey } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import {
  AiFillEdit,
  AiOutlineLock,
  AiOutlineDelete,
  AiFillGithub,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import authApi from "src/api/authApi";
import {
  changePassword,
  setCurrentUser,
} from "src/shared_components/views/pages/login/authSlice";
import CIcon from "@coreui/icons-react";
import { changeStateSettingOptionsSidebar } from "src/appSlice";
import { FiEdit3 } from "react-icons/fi";
import { FaFacebookSquare } from "react-icons/fa";
import firebaseConfig from "src/utils/firebase/firebaseConfig";
import uuid from "src/utils/file/uuid";
import userApi from "src/api/userApi";

AccountSettingsPage.propTypes = {};

function AccountSettingsPage(props) {
  const userSetting = useSelector((state) => state.app.userSetting);
  const [selectedOptions, setSelectedOptions] = useState(0); //0:INFO, 1:PASSWORD
  const user = { ...useSelector((state) => state.auth.currentUser) };
  const [userInfo, setUserInfo] = useState(user);
  const [changePWObject, setResetPasswordObject] = useState({
    userId: user.id,
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentDirty, setCurrentDirty] = useState(false);
  const [newDirty, setNewDirty] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date(2021, 2, 1));

  function ChooseSettingOption(index) {
    setSelectedOptions(index);
  }

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    if (userSetting !== null && userSetting !== undefined)
      setSelectedOptions(userSetting);
  }, [userSetting]);

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

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return re.test(phone);
  }
  const updateUserInfo = () => {
    if (!userInfo.fullName || !userInfo.email) {
      alert("error empty");
      return;
    }

    if (!validateEmail(userInfo.email)) {
      alert("error email");
      return;
    }

    if (!validatePhone(userInfo.userPhoneNumber)) {
      alert("error phone");
      return;
    }
    console.log(userInfo);
    authApi
      .updateUserInfo(userInfo)
      .then((res) => {
        dispatch(setCurrentUser(userInfo));
      })
      .catch((err) => {});
  };

  const changePasswordClick = () => {
    console.log(changePWObject);
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
            <BsInfoCircle className="icon-info icon" />
            Thông tin của bạn
          </div>
          <div
            className={`tab-setting tab-2 tab-passowrd ${
              selectedOptions === 1 ? "active" : ""
            }`}
            onClick={() => ChooseSettingOption(1)}
          >
            <AiOutlineLock className="icon-password icon" />
            Đổi mật khẩu
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
                    Đổi ảnh đại diện
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
                    Xóa ảnh
                  </div>
                </div>
              </div>
              <CRow className="info-row">
                <CCol sm="12" lg="6">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="inputIsValid">
                      <div className="require-item">*</div>Họ tên
                    </CLabel>
                    <CInput
                      id="fullname-input"
                      placeholder="Nhập họ tên..."
                      autoComplete
                      name="fullName"
                      value={userInfo.fullName}
                      onChange={handleInputChange}
                      invalid={
                        userInfo.fullName === "" || userInfo.fullName === null
                      }
                    />
                    <CInvalidFeedback>Tên không hợp lệ</CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol sm="12" lg="6">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="phone-input">
                      <div className="require-item not-show">*</div>Số điện
                      thoại
                    </CLabel>
                    <CInput
                      id="phone-input"
                      placeholder="Nhập số điện thoại..."
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
                      type="email"
                      id="email-input"
                      placeholder="Nhập email..."
                      autoComplete="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      invalid={userInfo.email === "" || userInfo.email === null}
                    />
                    <CInvalidFeedback>Email không hợp lệ</CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol sm="12" lg="6">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="birthDate-input">
                      <div className="require-item not-show">*</div>Ngày sinh
                    </CLabel>
                    <CInput
                      name="userDob"
                      id="birthDate-input"
                      value={userInfo.userDob}
                      type="date"
                      onChange={handleInputChange}
                    />
                    <CInvalidFeedback>Ngày sinh không hợp lệ</CInvalidFeedback>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="info-row">
                <CCol sm="12" lg="8">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="email-input">
                      <div className="require-item not-show">*</div>Mô tả bản
                      thân
                    </CLabel>
                    <CTextarea
                      type="text"
                      id="des-input"
                      placeholder="Thông tin bản thân..."
                      value={userInfo.userDescription}
                      name="userDescription"
                      onChange={handleInputChange}
                    />
                    <CInvalidFeedback>Email không hợp lệ</CInvalidFeedback>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="info-row">
                <CCol sm="12" lg="8">
                  <CFormGroup>
                    <CLabel className="input-label" htmlFor="email-input">
                      <div className="require-item not-show">*</div>Địa chỉ
                    </CLabel>
                    <CInput
                      type="text"
                      id="des-input"
                      placeholder="Địa chỉ..."
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
                      <div className="require-item not-show">*</div>Liên kết
                      khác
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
                Lưu lại
              </div>
            </div>
          )}
          {selectedOptions === 1 && (
            <div className="setting-content setting-password-content">
              {!user.firstTimeSocial ? (
                <CFormGroup>
                  <CLabel className="input-label" htmlFor="current-password">
                    Mật khẩu hiện tại
                  </CLabel>
                  <CInput
                    id="current-password"
                    placeholder="Nhập mật khẩu hiện tại..."
                    value={changePWObject.currentPassword}
                    onChange={handlePasswordChange}
                    invalid={currentDirty && !changePWObject.currentPassword}
                    type="password"
                    name="currentPassword"
                  />
                  <CInvalidFeedback>
                    Mật khẩu hiện tại không hợp lệ
                  </CInvalidFeedback>
                </CFormGroup>
              ) : null}
              <CFormGroup>
                <CLabel className="input-label" htmlFor="new-password">
                  Mật khẩu mới
                </CLabel>
                <CInput
                  type="password"
                  id="new-password"
                  placeholder="Nhập mật khẩu mới..."
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
                <CInvalidFeedback>Mật khẩu mới không hợp lệ</CInvalidFeedback>
              </CFormGroup>
              <CFormGroup>
                <CLabel className="input-label" htmlFor="new-password-confirm">
                  Xác nhận mật khẩu mới
                </CLabel>
                <CInput
                  type="password"
                  id="new-password-confirm"
                  placeholder="Nhập lại mật khẩu mới..."
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
                <CInvalidFeedback>
                  xác nhận mật khẩu mới không trùng khớp
                </CInvalidFeedback>
              </CFormGroup>
              <div onClick={changePasswordClick} className="save-btn-password">
                Cập nhật
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsPage;
