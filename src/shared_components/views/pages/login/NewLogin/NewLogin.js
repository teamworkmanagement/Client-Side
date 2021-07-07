import React, { useState } from "react";
import { CInput, CRow } from "@coreui/react";
import "./NewLogin.scss";
import { FiLock, FiMail } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

function NewLogin(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="new-login-page-container">
      <CRow>
        <div className="col-login">
          <div className="login-content">
            <img alt="" src="../images/app/logoteam.png" />
            <div className="title-login">Đăng nhập</div>
            <div className="sign-up-group">
              Bạn chưa có tài khoản?
              <div className="label-sign-up">Đăng ký</div>
            </div>
            <div className="email-group">
              <div className="label">
                <div className="required-icon">*</div> Email
              </div>
              <div className="email-input-group">
                <FiMail className="icon-email input-icon" />
                <CInput
                  className="input-email"
                  name="email"
                  placeholder="Email tài khoản"
                />
              </div>
            </div>
            <div className="password-group">
              <div className="label">
                <div className="required-icon">*</div> Mật khẩu
              </div>
              <div className="password-input-group">
                <FiLock className="icon-password input-icon" />
                <CInput
                  className="input-password"
                  placeholder="Mật khẩu"
                  name="password"
                  type={showPassword ? "text" : "password"}
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
            </div>
            <div className="sub-actions">
              <div className="forgot-password">Quên mật khẩu?</div>
            </div>
            <div className="btn-login">Đăng nhập</div>
            <div className="label-other-media">
              <div className="line"></div>
              <div className="label">Hoặc đăng nhập với</div>
              <div className="line"></div>
            </div>
            <div className="social-btn-group">
              <div className="gg-btn">
                <FcGoogle className="icon-gg" />
                Google
              </div>
              <div className="fb-btn">
                <FaFacebook className="icon-fb" />
                Facebook
              </div>
            </div>
          </div>
        </div>
        <div className="col-welcome">
          <img alt="" src="../images/login/teamworklogin.svg" />
          <div className="title">
            Chào mừng đến với <strong>EzTeam</strong>
          </div>
          <div className="description">
            Hãy cùng tham gia môi trường làm việc nhóm hiện đại, sáng tạo và
            thân thiện. EzTeam cam kết mang đến cho bạn một trải nghiệm hiệu quả
            và tuyệt vời nhất.
          </div>
        </div>
      </CRow>
    </div>
  );
}

export default NewLogin;
