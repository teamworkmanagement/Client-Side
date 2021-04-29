import React, { useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CForm,
  CInput,
  CInputCheckbox,
  CButton,
  CContainer,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import { DocsLink } from "src/reusable";

const MyToaster = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = () => {
    setToasts([
      ...toasts,
      {
        position: "top-right",
        autohide: 1000,
        closeButton: false,
        fade: true,
      },
    ]);
  };

  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || [];
      toasters[toast.position].push(toast);
      return toasters;
    }, {});
  })();

  return (
    <div>
      <CButton className="mr-1 w-25" color="success" onClick={addToast}>
        Add toast
      </CButton>

      <div>
        {Object.keys(toasters).map((toasterKey) => (
          <CToaster position={toasterKey} key={"toaster" + toasterKey}>
            {toasters[toasterKey].map((toast, key) => {
              return (
                <CToast show={true} autohide={2000} fade={true}>
                  <CToastBody>Tên Công việc không được rỗng</CToastBody>
                </CToast>
              );
            })}
          </CToaster>
        ))}
      </div>
    </div>
  );
};

export default MyToaster;
