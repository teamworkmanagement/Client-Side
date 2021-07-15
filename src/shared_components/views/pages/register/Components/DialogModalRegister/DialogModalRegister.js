import React from "react";
import "./DialogModalRegister.scss";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";

import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function DialogModalRegister({
  onClose,
  showDialogModal,
  dialogTitle,
  dialogMessage,
  dialogType,
}) {
  //dialogTitle, dialogMessage, dialogType
  //const dialogLevel = useSelector((state) => state.app.dialogLevel);
  function handleOnClose() {
    onClose();
  }

  function getClassByDialogType() {
    switch (dialogType) {
      case 0:
        return "info";
      case 1:
        return "confirm";
      default:
        return "error";
    }
  }

  return (
    <CModal
      className={`dialog-modal  ${getClassByDialogType()}`}
      show={showDialogModal}
      onClose={() => handleOnClose()}
      size="sm"
    >
      <CModalHeader>{dialogTitle}</CModalHeader>
      <CModalBody>{dialogMessage}</CModalBody>
      <CModalFooter>
        {/* <CButton onClick={() => handleOnClose(false)} className="cancel-button">
          Đóng
        </CButton> */}
        <CButton onClick={handleOnClose} className="ok-button">
          OK
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default DialogModalRegister;
