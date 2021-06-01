import {
  CButton, CToast,
  CToastBody,
  CToaster
} from "@coreui/react";
import React, { useState } from "react";

const MyToaster = () => {
  const [toasts, setToasts] = useState([]);
  const [content, setContent] = useState('');

  const addToast = () => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(res => {
        setContent(res.content);
      }).catch(err => {

      })
    setToasts([
      ...toasts,
      {
        position: "top-right",
        autohide: 1000,
        closeButton: true,
        fade: true,
        color: "info"
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

  console.log(toasters);


  return (
    <div>
      <CButton className="mr-1 w-25" color="info" onClick={addToast}>
        Add toast
      </CButton>

      <div>
        {Object.keys(toasters).map((toasterKey) => (
          <CToaster position={toasterKey} key={"toaster" + toasterKey}>
            {toasters[toasterKey].map((toast, key) => {
              return (
                <CToast color={["info"]} show={true} autohide={2000} fade={true}>
                  <CToastBody>{content}</CToastBody>
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
