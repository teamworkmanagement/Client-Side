import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MyLogin.scss";
import { CCol, CInput, CRow } from "@coreui/react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

MyLogin.propTypes = {};

function MyLogin(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page-container">
      <CRow className="row-header">
        <div xl="2" md="1" sm="0"></div>
        <CCol className="col-image1" sm="12" md="5" xl="4">
          <img alt="" src="../images/login/chat.svg" />
        </CCol>
        <CCol className="col-image2" sm="12" md="6" xl="6">
          <img alt="" src="../images/login/task.svg" />
        </CCol>
      </CRow>
      <CRow className="row-content">
        <CCol className="col1" sm="12" lg="7" xl="8">
          <div className="title">
            Trải nghiệm
            <div>
              <label className="title-teamwork">Teamwork</label>{" "}
              <label>hiệu quả</label> và <label>nhanh chóng với</label>
            </div>
            <div className="app-name">
              <strong>ezTeam</strong>
            </div>
          </div>
          <img alt="" src="../images/login/teamwork.svg" />
        </CCol>
        <CCol className="col2" xs="12" sm="10" lg="5" xl="4">
          <CInput className="input-email" placeholder="Email tài khoản" />
          <div className="password-group">
            <CInput
              className="input-password"
              placeholder="Mật khẩu"
              type={showPassword ? "text" : "password"}
            />
            {showPassword && (
              <BsEye
                onClick={() => setShowPassword(false)}
                className="icon-password icon-showpassword"
              />
            )}
            {!showPassword && (
              <BsEyeSlash
                onClick={() => setShowPassword(true)}
                className=" icon-password icon-hidepassword"
              />
            )}
          </div>

          <div className="label-forgot">
            <label>Quên mật khẩu?</label>
          </div>
          <div className="login-btn">Đăng nhập</div>
          <div className="label-social">
            <div className="line1 line"></div>
            <div className="label"> Đăng nhập nhanh với</div>
            <div className="line2 line"></div>
          </div>
          <div className="social-group">
            <FcGoogle className="google-icon social-icon" />
            <SiFacebook className="fb-icon social-icon" />
          </div>
          <div className="register-group">
            Bạn chưa có tài khoản? Hãy <strong>Tạo mới</strong> tại đây!
          </div>
        </CCol>
      </CRow>
    </div>
  );
}

export default MyLogin;
