import React, { useEffect, useState } from "react";
import "./InviteMemberModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";

function InviteMemberModal(props) {
  const [email, setEmail] = useState("");

  function handleOnClose() {
    if (props.onClose) {
      setEmail("");
      props.onClose(false);
    }
  }

  async function onCreateCard() {
    try {
      props.onClose(null);
    } catch (err) {
      console.log(err);
      props.onClose(err.Message);
    } finally {
    }
  }

  useEffect(() => {}, []);

  return (
    <CModal
      className="modal-invite-member"
      show={props.showAddInvite}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader closeButton>Mời thành viên</CModalHeader>
      <CModalBody className="new-card-form">
        <div className="name-label">Nhập email:</div>
        <CInput
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email người được mời..."
        />
        <CButton onClick={onCreateCard} className="add-card-btn">
          Mời
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default InviteMemberModal;
