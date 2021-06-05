import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./InviteMemberModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
  CToast,
  CToastBody,
  CToaster,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import teamApi from "src/api/teamApi";
import { useParams } from "react-router";
import MyToaster from "src/features/ToastTest/ToastTest";

InviteMemberModal.propTypes = {};

function InviteMemberModal(props) {
  const { teamId } = useParams();
  const [email, setEmail] = useState("");

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
      email: "email",
      participationTeamId: teamId,
    };

    try {
      const response = await teamApi.inviteUser(obj);
    } catch (err) {
      console.log(err);
      props.onClose(err.data.Message);
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
