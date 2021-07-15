import React, { useState } from "react";
import "./MyLogin.scss";
import { CInput, CRow, CSpinner } from "@coreui/react";
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, socialLogin } from "../authSlice";
import socialMediaAuth from "src/utils/firebase/authSocial";
import {
  facebookProvider,
  googleProvider,
} from "src/utils/firebase/authMethods";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "src/shared_components/MySharedComponents/CustomToast/CustomToast";
import { FiLock, FiMail } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { validateEmail } from "src/utils/common";

function MyLogin(props) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [logining, setLogining] = useState(false);
  const [loginObject, setLoginObject] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const onCreateAccount = () => {
    history.push("/register");
  };

  const onForgotPassword = () => {
    history.push("/forgotpassword");
  };

  const onLoginClick = () => {
    if (logining) return;
    if (!loginObject.email || !loginObject.password) {
      toast(
        <CustomToast
          type="error"
          title="Lỗi"
          message="Vui lòng nhập thông tin!"
        />
      );
      return;
    }

    if (!validateEmail(loginObject.email) || loginObject.password.length < 6) {
      toast(
        <CustomToast
          type="error"
          title="Lỗi"
          message="Vui lòng xem lại thông tin!"
        />
      );
      return;
    }
    setLogining(true);
    dispatch(login(loginObject))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        setLogining(false);
      })
      .catch((err) => {
        setLogining(false);
        console.log("login err :", err);
        if (err.Message?.includes("Invalid Credentials")) {
          toast(
            <CustomToast
              type="error"
              title="Lỗi"
              message="Mật khẩu không chính xác!"
            />
          );
          return;
        }

        if (err.Message?.includes("No Accounts Registered")) {
          toast(
            <CustomToast
              type="error"
              title="Lỗi"
              message="Tài khoản không tồn tại!"
            />
          );
          return;
        }

        if (typeof err === "string" && err.includes("timeout")) {
          toast(
            <CustomToast type="error" title="Lỗi" message="Vui lòng thử lại!" />
          );
          return;
        }

        toast(
          <CustomToast type="error" title="Lỗi" message="Đã có lỗi xảy ra!" />
        );
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginObject({
      ...loginObject,
      [name]: value,
    });
  };

  const loginFacebook = async () => {
    const res = await socialMediaAuth(facebookProvider);
    console.log("res là: ", res);
    if (!res.additionalUserInfo) {
      console.log("email fb : ", res.email);
      if (res.email === undefined)
        //tắt popup
        return null;
      return {
        email: res.email,
        pic: null,
        id: null,
        name: null,
      };
    }

    const { email, id, name } = res.additionalUserInfo.profile;
    const picture = res.additionalUserInfo.profile.picture.data.url;
    return { email, id, name, picture };
  };

  const loginGoogle = async () => {
    const res = await socialMediaAuth(googleProvider);
    if (!res.additionalUserInfo) return null; //tắt popup

    const { email, id, name, picture } = res.additionalUserInfo.profile;

    return { email, id, name, picture };
    //console.log('google : ', { email, id, name, picture });
  };

  const loginSocial = async (type) => {
    let outPut = {};
    switch (type) {
      case "gg":
        outPut = await loginGoogle();
        break;
      case "fb":
        outPut = await loginFacebook();
        break;
      default:
        break;
    }

    if (outPut === null) return;

    const data = {
      id: outPut.id,
      fullName: outPut.name,
      imageUrl: outPut.picture,
      email: outPut.email,
    };
    dispatch(socialLogin(data))
      .then(unwrapResult)
      .then((originalPromiseResult) => { })
      .catch((err) => {
        if (typeof err === "string" && err.includes("timeout")) {
          toast(
            <CustomToast type="error" title="Lỗi" message="Vui lòng thử lại!" />
          );
          return;
        } else {
          toast(
            <CustomToast type="error" title="Lỗi" message="Đã có lỗi xảy ra!" />
          );
        }
      });
  };

  return (
    <div>
      <div className="new-login-page-container">
        <CRow>
          <div className="col-login">
            <div className="login-content">
              <img alt="" src="../images/app/logoteam.png" />
              <div className="title-login">Đăng nhập</div>
              <div className="sign-up-group">
                Bạn chưa có tài khoản?
                <div className="label-sign-up" onClick={onCreateAccount}>
                  Đăng ký
                </div>
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                <div className="remember-account"></div>
                <div onClick={onForgotPassword} className="forgot-password">
                  Quên mật khẩu?
                </div>
              </div>
              <div
                className={`btn-login ${logining ? "logining" : ""}`}
                onClick={onLoginClick}
              >
                <CSpinner color="success" size="sm" />
                Đăng nhập
              </div>
              <div className="label-other-media">
                <div className="line"></div>
                <div className="label">Hoặc đăng nhập với</div>
                <div className="line"></div>
              </div>
              <div className="social-btn-group">
                <div className="gg-btn" onClick={() => loginSocial("gg")}>
                  <FcGoogle className="icon-gg" />
                  Google
                </div>
                <div className="fb-btn" onClick={() => loginSocial("fb")}>
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
              thân thiện. EzTeam cam kết mang đến cho bạn một trải nghiệm hiệu
              quả và tuyệt vời nhất.
            </div>
          </div>
        </CRow>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
      />
    </div>
  );
}

export default MyLogin;
