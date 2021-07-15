import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CRow,
} from "@coreui/react";
import authApi from "src/api/authApi";
import { useHistory } from "react-router";
import "./Register.scss";

import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import DialogModalRegister from "./Components/DialogModalRegister/DialogModalRegister.js";

const Register = () => {
  const [registerObj, setRegisterObj] = useState(null);
  const history = useHistory();
  const [showDialogModal, setShowDialogModal] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setdialogMessage] = useState("");
  const [dialogType, setDialogType] = useState(0);

  function closeDialog() {
    setShowDialogModal(false);
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegisterObj({
      ...registerObj,
      [name]: value,
    });
  };

  const onRegisterClick = () => {
    if (
      !registerObj?.email ||
      !registerObj?.password ||
      !registerObj?.confirmPassword ||
      !registerObj?.fullName
    ) {
      setDialogTitle("Không hợp lệ");
      setdialogMessage("Vui lòng cung cấp đầy đủ thông tin");
      setDialogType(2);
      setShowDialogModal(true);
      return;
    }

    authApi
      .register(registerObj)
      .then((res) => {
        setDialogTitle("Thành công");
        setdialogMessage(
          "Email xác nhận đã được gửi đến email của bạn, vui lòng kiểm tra email và hoàn tất quá trình đăng ký"
        );
        setDialogType(0);
        setShowDialogModal(true);
        history.push("/login");
      })
      .catch((err) => {
        setDialogTitle("Lỗi");
        setdialogMessage(
          "Thông tin cung cấp không hợp lệ, vui lòng kiểm tra lại"
        );
        setDialogType(2);
        setShowDialogModal(true);
        return;
      });
  };
  return (
    <div className="register-container c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1 className="title">Tạo tài khoản mới</h1>
                  <div className="login-label-group">
                    <div className="text">Bạn đã có tài khoản rồi?</div>
                    <div
                      className="label-login"
                      onClick={() => history.push("/login")}
                    >
                      Đăng nhập
                    </div>
                  </div>
                  <img
                    alt=""
                    src="../images/register/register.svg"
                    className="image-register"
                  />
                  <CInputGroup className="mb-3">
                    <div className="input-top-label">Tên của bạn</div>
                    <div className="input-row">
                      <CInput
                        type="text"
                        name="fullName"
                        placeholder="Họ tên..."
                        onChange={onChange}
                        autoComplete="username"
                      />
                      <AiOutlineUser className="icon-right-input" />
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <div className="input-top-label">Địa chỉ Email</div>
                    <div className="input-row">
                      <CInput
                        type="text"
                        placeholder="Email..."
                        onChange={onChange}
                        name="email"
                        autoComplete="email"
                      />
                      <HiOutlineMail className="icon-right-input" />
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <div className="input-top-label">Mật khẩu</div>

                    <div className="input-row">
                      <CInput
                        type="password"
                        placeholder="Mật khẩu mới cho EzTeam..."
                        onChange={onChange}
                        name="password"
                        autoComplete="new-password"
                      />
                      <RiLockPasswordLine className="icon-right-input" />
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <div className="input-top-label">Xác nhận mật khẩu</div>
                    <div className="input-row">
                      <CInput
                        type="password"
                        name="confirmPassword"
                        onChange={onChange}
                        placeholder="Nhập lại mật khẩu..."
                        autoComplete="new-password"
                      />
                      <RiLockPasswordLine className="icon-right-input" />
                    </div>
                  </CInputGroup>
                  <CButton
                    className="register-btn"
                    color="success"
                    onClick={onRegisterClick}
                    block
                  >
                    Tạo tài khoản
                  </CButton>
                  <div className="forgot-password-label-group">
                    Bạn đang quên mật khẩu?
                    <div
                      className="label-forgot-password"
                      onClick={() => history.push("/forgotpassword")}
                    >
                      Lấy lại mật khẩu
                    </div>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <DialogModalRegister
        onClose={closeDialog}
        showDialogModal={showDialogModal}
        dialogTitle={dialogTitle}
        dialogMessage={dialogMessage}
        dialogType={dialogType}
      />
    </div>
  );
};

export default Register;
