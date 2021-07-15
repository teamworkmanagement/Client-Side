import React from "react";
import "./DialogModal.scss";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";

import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { setDialogResult, setShowDialogModal } from "src/appSlice";
moment.locale("vi");

function DialogModal(props) {
  //dialogTitle, dialogMessage, dialogType

  const dispatch = useDispatch();
  const showDialogModal = useSelector((state) => state.app.showDialogModal);
  const dialogTitle = useSelector((state) => state.app.dialogTitle);
  const dialogMessage = useSelector((state) => state.app.dialogMessage);
  const dialogType = useSelector((state) => state.app.dialogType);
  const dialogLevel = useSelector((state) => state.app.dialogLevel);
  function handleOnClose(result) {
    dispatch(setDialogResult(result));
    const data = {
      showDialogModal: false,
    };
    dispatch(setShowDialogModal(data));
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
      className={`dialog-modal ${
        dialogLevel === 1 ? "high-level" : ""
      } ${getClassByDialogType()}`}
      show={showDialogModal}
      onClose={() => handleOnClose(false)}
      size="sm"
    >
      <CModalHeader>{dialogTitle}</CModalHeader>
      <CModalBody>{dialogMessage}</CModalBody>
      <CModalFooter>
        <CButton onClick={() => handleOnClose(false)} className="cancel-button">
          Đóng
        </CButton>
        <CButton onClick={() => handleOnClose(true)} className="ok-button">
          OK
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default DialogModal;
