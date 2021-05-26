import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AccountSettingsPage.scss";
import {
  CCol,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
  CValidFeedback,
} from "@coreui/react";
import { BiKey } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import authApi from "src/api/authApi";
import { setCurrentUser } from "src/shared_components/views/pages/login/authSlice";

AccountSettingsPage.propTypes = {};

function AccountSettingsPage(props) {
  const [selectedOptions, setSelectedOptions] = useState(0); //0:INFO, 1:PASSWORD
  const user = { ...useSelector(state => state.auth.currentUser) };
  const [userInfo, setUserInfo] = useState(user);
  const [changePWObject, setResetPasswordObject] = useState({ userId: user.id, currentPassword: null, newPassword: null, confirmPassword: null });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentDirty, setCurrentDirty] = useState(false);
  const [newDirty, setNewDirty] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date(2021, 2, 1));
  const userPassword = "khoanguyen";
  function ChooseSettingOption(index) {
    setSelectedOptions(index);
  }

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword")
      setNewDirty(true);
    if (name === "currentPassword")
      setCurrentDirty(true);
    else setConfirmDirty(true);

    setResetPasswordObject({
      ...changePWObject,
      [name]: value,
    })
  }

  const updateUserInfo = () => {
    console.log(userInfo);
    authApi.updateUserInfo(userInfo).then(res => {
      dispatch(setCurrentUser(userInfo));
    }).catch(err => {

    })
  }

  const changePasswordClick = () => {
    console.log(changePWObject);
    authApi.changePassword(changePWObject).then(res => {

    }).catch(err => {

    })
  }
  return (
    <div className="account-page-container">
      <div className="account-page-content">
        <CRow>
          <CCol className="setting-options" xm="4" sm="4" lg="3" xl="3">
            <div
              className={`tab-setting tab-infor ${selectedOptions === 0 ? "active" : ""
                }`}
              onClick={() => ChooseSettingOption(0)}
            >
              <BsInfoCircle className="icon-info icon" />
              Thông tin của bạn
            </div>
            <div
              className={`tab-setting tab-passowrd ${selectedOptions === 1 ? "active" : ""
                }`}
              onClick={() => ChooseSettingOption(1)}
            >
              <BiKey className="icon-password icon" />
              Đổi mật khẩu
            </div>
          </CCol>

          <CCol className="settings-content" xs="8" sm="8" lg="9" xl="9">
            {selectedOptions === 0 && (
              <div className="setting-content setting-infor-content">
                <CRow className="">
                  <CCol sm="12" md="4" xl="4" className="image-col content-col">
                    <div className="avatar">
                      <img
                        alt=""
                        src="https://emilus.themenate.net/img/avatars/thumb-4.jpg"
                      />
                      <div className="icon-container">
                        <AiFillEdit className="icon-edit-image" />
                      </div>
                    </div>
                  </CCol>
                  <CCol sm="12" md="8" xl="8" className="info-col content-col">
                    <div className="form-groups">
                      <CFormGroup>
                        <CLabel className="input-label" htmlFor="inputIsValid">
                          Họ tên
                        </CLabel>
                        <CInput
                          id="fullname-input"
                          placeholder="Nhập họ tên..."
                          autoComplete
                          name="fullName"
                          value={userInfo.fullName}
                          onChange={handleInputChange}
                          invalid={userInfo.fullName === "" || userInfo.fullName === null}
                        />
                        <CInvalidFeedback>Tên không hợp lệ</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel className="input-label" htmlFor="email-input">
                          Email
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
                      <CFormGroup>
                        <CLabel className="input-label" htmlFor="phone-input">
                          Số điện thoại
                        </CLabel>
                        <CInput
                          id="phone-input"
                          placeholder="Nhập số điện thoại..."
                          name="userPhoneNumber"
                          value={userInfo.userPhoneNumber}
                          onChange={handleInputChange}
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel
                          className="input-label"
                          htmlFor="birthDate-input"
                        >
                          Ngày sinh
                        </CLabel>
                        <CInput
                          name="userDob"
                          id="birthDate-input"
                          value={userInfo.userDob}
                          type="date"
                          onChange={handleInputChange}
                        />
                        <CInvalidFeedback>
                          Ngày sinh không hợp lệ
                        </CInvalidFeedback>
                      </CFormGroup>
                    </div>
                    <div onClick={updateUserInfo} className="save-btn">Lưu lại</div>
                  </CCol>
                </CRow>
              </div>
            )}
            {selectedOptions === 1 && (
              <div className="setting-content setting-password-content">
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
                      newDirty && (changePWObject.newPassword === "" || changePWObject.newPassword === null)
                    }
                    valid={newDirty && changePWObject.newPassword !== ""}
                    name="newPassword"
                  />
                  <CInvalidFeedback>Mật khẩu mới không hợp lệ</CInvalidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel
                    className="input-label"
                    htmlFor="new-password-confirm"
                  >
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
                        changePWObject.confirmPassword !== changePWObject.newPassword)
                    }
                    valid={confirmDirty && changePWObject.confirmPassword === changePWObject.newPassword}
                    name="confirmPassword"
                  />
                  <CInvalidFeedback>
                    xác nhận mật khẩu mới không trùng khớp
                  </CInvalidFeedback>
                </CFormGroup>
                <div onClick={changePasswordClick} className="save-btn">Cập nhật</div>
              </div>
            )}
          </CCol>
        </CRow>
      </div>
    </div>
  );
}

export default AccountSettingsPage;
