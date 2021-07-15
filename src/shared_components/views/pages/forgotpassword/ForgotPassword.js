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
import "./ForgotPassword.scss";

import { HiOutlineMail } from "react-icons/hi";
import { BiKey } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "src/shared_components/MySharedComponents/CustomToast/CustomToast";
import { validateEmail } from "src/utils/common";

const ForgotPassword = () => {
  const history = useHistory();
  const [currentForm, setCurrentForm] = useState(1); //1:page send code, 2:page confirm code, 3: page reset password, 4: page success
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [resetObj, setResetObj] = useState({});

  function SendCode() {
    if (!validateEmail(email)) {
      toast(
        <CustomToast type="error" title="Lỗi" message="Email không hợp lệ" />
      );
      return;
    }
    authApi
      .forgotPassword({
        email,
      })
      .then((res) => {
        console.log(res.data);
        setCurrentForm(2);
      })
      .catch((err) => {
        console.log(err);

        if (err.ErrorCode === "404")
          toast(
            <CustomToast
              type="error"
              title="Lỗi"
              message="Email không tồn tại trong hệ thống"
            />
          );
      });
  }
  function GoBackSendCode() {
    setCurrentForm(1);
  }
  function GoToReSetPassword() {
    console.log(resetObj);
    console.log(email);
    const payload = {
      ...resetObj,
      email,
    };

    console.log(resetObj);
    if (!resetObj.confirmPassword || !resetObj.password || !resetObj.token) {
      toast(
        <CustomToast
          type="error"
          title="Lỗi"
          message="Bạn vui lòng nhập dữ liệu"
        />
      );

      return;
    }

    if (resetObj.confirmPassword !== resetObj.password) {
      toast(
        <CustomToast
          type="error"
          title="Lỗi"
          message="Bạn vui lòng kiểm tra mật khẩu"
        />
      );
      return;
    }

    authApi
      .resetPassword(payload)
      .then((res) => {
        console.log(res);
        setCurrentForm(4);
      })
      .catch((err) => {
        console.log(err);
        if (
          err.Message?.includes("Error occured while reseting the password")
        ) {
          toast(
            <CustomToast
              type="error"
              title="Lỗi"
              message="Bạn vui lòng kiểm tra lại OTP"
            />
          );
        }
      });
  }
  function GotoResetSuccess() {
    setCurrentForm(4);
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setResetObj({
      ...resetObj,
      [name]: value,
    });
  };

  const goToLogin = () => {
    history.push("/login");
  };

  return (
    <div className="forgot-password-container c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="5" sm="11">
            <CCard
              style={{ display: currentForm === 1 ? "flex" : "none" }}
              className="mx-4 card1"
            >
              <CCardBody className="p-4">
                <CForm>
                  <img
                    alt=""
                    src="../images/forgotpassword/forgotpassword.svg"
                    className="image-forgotpassword"
                  />
                  <div className="label-infor">
                    Đầu tiên, bạn hãy nhập Email của tài khoản
                  </div>
                  <CInputGroup className="mb-3">
                    <div className="input-row">
                      <CInput
                        type="email"
                        name="fullName"
                        placeholder="Email của tài khoản..."
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <HiOutlineMail className="icon-right-input" />
                    </div>
                  </CInputGroup>

                  <CButton
                    className="forgot-password-btn"
                    color="success"
                    block
                    onClick={SendCode}
                  >
                    Gửi mã xác nhận
                  </CButton>
                  <div className="go-back-label-group">
                    Trở về trang
                    <div className="actions-group">
                      <div
                        className="go-login-label"
                        onClick={() => history.push("/login")}
                      >
                        Đăng nhập
                      </div>
                      <div className="divider"></div>
                      <div
                        className="go-register-label"
                        onClick={() => history.push("/register")}
                      >
                        Tạo tài khoản
                      </div>
                    </div>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              style={{ display: currentForm === 2 ? "flex" : "none" }}
              className="mx-4 card2"
            >
              <CCardBody className="p-4">
                <CForm>
                  <img
                    alt=""
                    src="../images/forgotpassword/confirmcode.svg"
                    className="image-forgotpassword"
                  />
                  <div className="label-infor">
                    <div className="label2">
                      Mã xác nhận đã được gửi đến Email
                    </div>

                    <div className="label2">
                      Hãy kiểm tra và điền lại bên dưới
                    </div>
                  </div>
                  <CInputGroup className="mb-3">
                    <div className="input-row">
                      <CInput
                        type="text"
                        name="token"
                        placeholder="Nhập mã xác nhận..."
                        onChange={onChange}
                        //autoComplete="username"
                      />
                      <BiKey className="icon-right-input" />
                    </div>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <div className="input-top-label">Mật khẩu mới</div>
                    <div className="input-row">
                      <CInput
                        type={showNewPassword ? "text" : "password"}
                        name="password"
                        placeholder="Nhập mật khẩu mới..."
                        onChange={onChange}
                      />
                      {showNewPassword && (
                        <BsEye
                          className="icon-viewpassword"
                          onClick={() => setShowNewPassword(false)}
                        />
                      )}
                      {!showNewPassword && (
                        <BsEyeSlash
                          className="icon-viewpassword"
                          onClick={() => setShowNewPassword(true)}
                        />
                      )}
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <div className="input-top-label">Xác nhận mật khẩu mới</div>
                    <div className="input-row">
                      <CInput
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu..."
                        onChange={onChange}
                      />
                      {showConfirmPassword && (
                        <BsEye
                          className="icon-viewpassword"
                          onClick={() => setShowConfirmPassword(false)}
                        />
                      )}
                      {!showConfirmPassword && (
                        <BsEyeSlash
                          className="icon-viewpassword"
                          onClick={() => setShowConfirmPassword(true)}
                        />
                      )}
                    </div>
                  </CInputGroup>

                  <CButton
                    className="forgot-password-btn"
                    color="success"
                    block
                    onClick={GoToReSetPassword}
                  >
                    Xác nhận mã
                  </CButton>
                  <div className="go-back-label-group">
                    <div className="go-back-label" onClick={GoBackSendCode}>
                      <IoIosArrowBack className="icon-back" />
                      Trở lại trang trước
                    </div>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              style={{ display: currentForm === 3 ? "flex" : "none" }}
              className="mx-4 card2"
            >
              <CCardBody className="p-4">
                <CForm>
                  <CInputGroup className="mb-3">
                    <div className="input-top-label">Mật khẩu mới</div>
                    <div className="input-row">
                      <CInput
                        type={showNewPassword ? "text" : "password"}
                        name="fullName"
                        placeholder="Nhập mật khẩu mới..."
                      />
                      {showNewPassword && (
                        <BsEye
                          className="icon-viewpassword"
                          onClick={() => setShowNewPassword(false)}
                        />
                      )}
                      {!showNewPassword && (
                        <BsEyeSlash
                          className="icon-viewpassword"
                          onClick={() => setShowNewPassword(true)}
                        />
                      )}
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <div className="input-top-label">Xác nhận mật khẩu mới</div>
                    <div className="input-row">
                      <CInput
                        type={showConfirmPassword ? "text" : "password"}
                        name="fullName"
                        placeholder="Nhập lại mật khẩu..."
                      />
                      {showConfirmPassword && (
                        <BsEye
                          className="icon-viewpassword"
                          onClick={() => setShowConfirmPassword(false)}
                        />
                      )}
                      {!showConfirmPassword && (
                        <BsEyeSlash
                          className="icon-viewpassword"
                          onClick={() => setShowConfirmPassword(true)}
                        />
                      )}
                    </div>
                  </CInputGroup>

                  <CButton
                    className="forgot-password-btn"
                    color="success"
                    block
                    onClick={GotoResetSuccess}
                  >
                    Reset Mật khẩu
                  </CButton>
                  <div className="go-back-label-group">
                    <div className="go-back-label" onClick={GoBackSendCode}>
                      <IoIosArrowBack className="icon-back" />
                      Trở lại trang trước
                    </div>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              style={{ display: currentForm === 4 ? "flex" : "none" }}
              className="mx-4 card4"
            >
              <CCardBody className="p-4">
                <CForm>
                  <img
                    alt=""
                    src="../images/forgotpassword/resetpasswordsuccess.svg"
                    className="image-forgotpassword"
                  />
                  <div className="label-infor">
                    <div className="success-label">
                      <div className="child-label">{`Chúc mừng! `} </div>
                      <div className="child-label">
                        {" "}
                        Bạn đã đổi Mật khẩu thành công.{" "}
                      </div>
                    </div>
                  </div>

                  <CButton
                    className="forgot-password-btn"
                    color="success"
                    block
                    onClick={goToLogin}
                  >
                    Trở lại màn hình đăng nhập
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;
