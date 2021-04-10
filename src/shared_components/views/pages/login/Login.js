import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import './Login.scss';
import socialMediaAuth from 'src/utils/firebase/authSocial';
import { facebookProvider, googleProvider } from 'src/utils/firebase/authMethods';
import authApi from 'src/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { login, socialLogin } from './authSlice';
import { setCurrentPostPage } from 'src/appSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authStatus = useSelector(state => state.auth.loginStatus);

  const [loginObject, setLoginObject] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setLoginObject({
      ...loginObject,
      [e.target.name]: e.target.value,
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(loginObject));
    if (authStatus)
      history.push('/dashboard');
  }

  const loginFacebook = async () => {
    const res = await socialMediaAuth(facebookProvider);
    console.log('res là: ', res);
    if (!res.additionalUserInfo) {
      console.log('email fb : ', res.email);
      if (res.email === undefined)//tắt popup
        return null;
      return {
        email: res.email,
        pic: null,
        id: null,
        name: null,
      }
    }

    const { email, id, name } = res.additionalUserInfo.profile;
    const picture = res.additionalUserInfo.profile.picture.data.url;
    return { email, id, name, picture };
  }

  const loginGoogle = async () => {
    const res = await socialMediaAuth(googleProvider);
    if (!res.additionalUserInfo)
      return null;//tắt popup

    const { email, id, name, picture } = res.additionalUserInfo.profile;

    return { email, id, name, picture };
    //console.log('google : ', { email, id, name, picture });
  }

  const loginSocial = async (type) => {
    let outPut = {};
    switch (type) {
      case 'gg':
        outPut = await loginGoogle();
        break;
      case 'fb':
        outPut = await loginFacebook();
      default:
        break;
    }

    if (outPut === null)
      return;

    const data = {
      id: outPut.id,
      fullName: outPut.name,
      imageUrl: outPut.picture,
      email: outPut.email,
    };

    /*try {
      const token = await authApi.socialLogin(data);
      console.log('token là: ', token);
    }
    catch (error) {
      console.log(error);
    }*/
    await dispatch(socialLogin(data));

    if (authStatus)

      history.push('/dashboard');
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>Đăng nhập</h1>
                    <p className="text-muted">Đăng nhập vào tài khoản của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" name="email" onChange={onChange} placeholder="Email" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" name="password" onChange={onChange} placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" type="submit" className="px-4">Đăng nhập</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Quên mật khẩu?</CButton>
                      </CCol>
                    </CRow>
                    <CRow className="mt-4">
                      <CCol>
                        <CButton shape="pill" onClick={() => loginSocial('fb')} color="primary">
                          <CIcon name="cil-lightbulb" />Facebook
                    </CButton>
                      </CCol>
                      <CCol>
                        <CButton shape="pill" onClick={() => loginSocial('gg')} color="warning">
                          <CIcon name="cib-google" />Google
                    </CButton>
                      </CCol>
                    </CRow>
                  </CForm>


                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Đăng ký</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Đăng ký ngay bây giờ!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
