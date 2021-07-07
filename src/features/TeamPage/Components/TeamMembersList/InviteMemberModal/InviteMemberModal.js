import React, { useEffect, useState } from "react";
import "./InviteMemberModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";

import { useSelector } from "react-redux";
import teamApi from "src/api/teamApi";
import { useParams } from "react-router";

function InviteMemberModal(props) {
  const { teamId } = useParams();
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.auth.currentUser);

  function handleOnClose() {
    if (props.onClose) {
      setEmail("");
      props.onClose(false);
    }
  }

  async function onCreateCard() {
    console.log(email);
    const obj = {
      isByEmail: true,
      email: email,
      participationTeamId: teamId,
      actionUserId: user.id,
    };

    try {
      const response = await teamApi.inviteUser(obj);
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
