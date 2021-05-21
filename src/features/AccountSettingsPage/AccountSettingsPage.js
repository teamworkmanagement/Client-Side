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

AccountSettingsPage.propTypes = {};

function AccountSettingsPage(props) {
  const [selectedOptions, setSelectedOptions] = useState(0); //0:INFO, 1:PASSWORD
  const [fullname, setFullname] = useState("Nguyễn Dũng");
  const [email, setEmail] = useState("nguyendung@gmail.com");
  const [phone, setPhone] = useState("0980863722");
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
  function handleInputName(e) {
    const { value } = e.target;
    setFullname(value);
  }
  function handleInputEmail(e) {
    const { value } = e.target;
    setEmail(value);
  }
  function handleInputPhone(e) {
    const { value } = e.target;
    setPhone(value);
  }
  function handleInputCurrentPassword(e) {
    const { value } = e.target;
    setCurrentDirty(true);
    setCurrentPassword(value);
  }
  function handleInputNewPassword(e) {
    const { value } = e.target;
    setNewDirty(true);
    setNewPassword(value);
  }
  function handleInputConfirmPassword(e) {
    const { value } = e.target;
    setConfirmDirty(true);
    setConfirmPassword(value);
  }

  return (
    <div className="account-page-container">
      <div className="account-page-content">
        <CRow>
          <CCol className="setting-options" xm="4" sm="4" lg="3" xl="3">
            <div
              className={`tab-setting tab-infor ${
                selectedOptions === 0 ? "active" : ""
              }`}
              onClick={() => ChooseSettingOption(0)}
            >
              <BsInfoCircle className="icon-info icon" />
              Thông tin của bạn
            </div>
            <div
              className={`tab-setting tab-passowrd ${
                selectedOptions === 1 ? "active" : ""
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
                          value={fullname}
                          onChange={handleInputName}
                          invalid={fullname === "" || fullname === null}
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
                          name="email-input"
                          placeholder="Nhập email..."
                          autoComplete="email"
                          value={email}
                          onChange={handleInputEmail}
                          invalid={email === "" || email === null}
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
                          value={phone}
                          onChange={handleInputPhone}
                          invalid={phone === "" || phone === null}
                        />
                        <CInvalidFeedback>
                          Số điện thoại không hợp lệ
                        </CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel
                          className="input-label"
                          htmlFor="birthDate-input"
                        >
                          Ngày sinh
                        </CLabel>
                        <CInput
                          id="birthDate-input"
                          value={"2021-02-01"}
                          type="date"
                        />
                        <CInvalidFeedback>
                          Ngày sinh không hợp lệ
                        </CInvalidFeedback>
                      </CFormGroup>
                    </div>
                    <div className="save-btn">Lưu lại</div>
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
                    value={currentPassword}
                    onChange={handleInputCurrentPassword}
                    invalid={currentDirty && currentPassword !== userPassword}
                    valid={currentDirty && currentPassword === userPassword}
                    type="password"
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
                    value={newPassword}
                    onChange={handleInputNewPassword}
                    invalid={
                      newDirty && (newPassword === "" || newPassword === null)
                    }
                    valid={newDirty && newPassword !== ""}
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
                    value={confirmPassword}
                    onChange={handleInputConfirmPassword}
                    invalid={
                      confirmDirty &&
                      (confirmPassword === "" ||
                        confirmPassword === null ||
                        confirmPassword !== newPassword)
                    }
                    valid={confirmDirty && confirmPassword === newPassword}
                  />
                  <CInvalidFeedback>
                    xác nhận mật khẩu mới không trùng khớp
                  </CInvalidFeedback>
                </CFormGroup>
                <div className="save-btn">Lưu lại</div>
              </div>
            )}
          </CCol>
        </CRow>
      </div>
    </div>
  );
}

export default AccountSettingsPage;
