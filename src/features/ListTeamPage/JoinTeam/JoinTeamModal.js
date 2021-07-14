import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";
import teamApi from "src/api/teamApi";
import CustomToast from "src/shared_components/MySharedComponents/CustomToast/CustomToast";
import "./JoinTeamModal.scss";

function JoinTeamModal(props) {
  const [teamCode, setTeamCode] = useState("");
  const userId = useSelector((state) => state.auth.currentUser.id);
  const handleOnClose = () => {
    props.onClose();
  };

  const onJoinTeamClick = () => {
    if (!teamCode)
      return;
    teamApi
      .joinTeam({
        userId: userId,
        teamCode: teamCode,
      })
      .then((res) => {
        const data = res.data;
        setTeamCode("");
        if (!data) {
          toast(
            <CustomToast
              type="error"
              title="Lỗi"
              message="Team không tồn tại!"
            />
          );
          return;
        }

        if (data?.teamName === null) {
          toast(
            <CustomToast
              type="error"
              title="Lỗi"
              message="Bạn đã tham gia nhóm này trước đó!"
            />
          );
          return;
        }
      })
      .catch((err) => { })
      .finally(() => {
        props.onClose();
      });
  };

  return (
    <CModal
      className="join-team-modal"
      show={props.showJoinTeam}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader closeButton>Nhập mã code của nhóm</CModalHeader>
      <CModalBody className="modal-body">
        <CInput
          type="text"
          name="teamName"
          value={teamCode}
          placeholder="Mã code..."
          onChange={(e) => setTeamCode(e.target.value)}
          className="team-code-input"
        />
        <CButton className="join-team-btn" onClick={onJoinTeamClick}>
          Tham gia nhóm
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default JoinTeamModal;
