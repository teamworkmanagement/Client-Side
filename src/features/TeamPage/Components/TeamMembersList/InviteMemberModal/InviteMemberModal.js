import React, { useState } from "react";
import "./InviteMemberModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import teamApi from "src/api/teamApi";
import { useSelector } from "react-redux";

function InviteMemberModal(props) {
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.auth.currentUser);

  function handleOnClose() {
    if (props.onClose) {
      setEmail("");
      props.onClose(false);
    }
  }

  function onCreateCard() {
    teamApi
      .inviteUser({
        isByEmail: true,
        email: email,
        participationTeamId: props.teamId,
        actionUserId: user.id,
      })
      .then((res) => {
        setEmail("");
        props.onClose(null);
      })
      .catch((err) => {
        console.log(err);
        setEmail("");
        props.onClose(err.Message);
      });
  }

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
