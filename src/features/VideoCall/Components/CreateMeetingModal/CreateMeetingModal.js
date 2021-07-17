import React, { useEffect, useState } from "react";
import "./CreateMeetingModal.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";

import { useDispatch } from "react-redux";
import meetingApi from "src/api/meetingApi";
import { connection } from "src/utils/signalr/appService";

function CreateMeetingModal(props) {
  const [meetingName, setMeetingName] = useState("");
  const onCreateMeeting = () => {
    if (!meetingName)
      return;

    meetingApi.createMeeting({
      meetingName: meetingName,
      teamId: props.teamId,
      connectionId: connection.connectionId,
    }).then(res => {
      setMeetingName("");
      props.onClose(res.data);
    }).catch(err => {
      setMeetingName("");
      props.onClose(null);
    })

  }


  const handleOnClose = () => {
    setMeetingName("");
    props.onClose(null);
  };

  return (
    <CModal
      className="create-board-modal"
      show={props.showAddMeeting}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader closeButton>Tạo cuộc họp mới</CModalHeader>
      <CModalBody className="new-card-form">
        <CInput
          type="text"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
          placeholder="Nhập tên cuộc họp..."
        />
        <CButton onClick={onCreateMeeting} className="add-card-btn">
          Tạo
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateMeetingModal;
