import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import authApi from 'src/api/authApi';
import { useHistory } from 'react-router';

const Register = () => {

  const [registerObj, setRegisterObj] = useState(null);
  const history = useHistory();

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegisterObj({
      ...registerObj,
      [name]: value,
    });
  }

  const onRegisterClick = () => {

    if (!registerObj.email || !registerObj.password || !registerObj.confirmPassword || !registerObj.fullName) {
      alert('Thông tin không được bỏ trống');
    }

    authApi.register(registerObj).then(res => {
      alert('Kiểm tra email và hoàn tất quá trình đăng ký');
      history.push('/login');
    }).catch(err => {
      console.log(err.data);
      alert('Vui lòng kiểm tra dữ liệu');
    });

  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="fullName" placeholder="Tên của bạn" onChange={onChange} autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" onChange={onChange} name="email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" onChange={onChange} name="password" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name="confirmPassword" onChange={onChange} placeholder="Repeat password" autoComplete="new-password" />
                  </CInputGroup>
                  <CButton color="success" onClick={onRegisterClick} block>Create Account</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
