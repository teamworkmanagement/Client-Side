import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import teamApi from "src/api/teamApi";
import { setShowDialogModal } from "src/appSlice.js";
import { addTeam } from "../teamSlice";
import "./CreateTeamModal.scss";

function CreateTeamModal(props) {
  const dispatch = useDispatch();
  const [teamObj, setTeamObj] = useState();
  const user = useSelector((state) => state.auth.currentUser);

  const handleOnClose = () => {
    props.onClose();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setTeamObj({
      ...teamObj,
      [name]: value,
    });
  };

  const onAddTeamClick = () => {
    if (!teamObj?.teamName) {
      const data = {
        showDialogModal: true,
        dialogTitle: "Không hợp lệ",
        dialogMessage: "Tên nhóm không được để trống",
        dialogType: 2, //error
        dialogLevel: 1,
      };
      dispatch(setShowDialogModal(data));
    } else {
      if (!teamObj?.teamDescription) {
        teamObj.teamDescription = "";
      }
      const params = {
        ...teamObj,
        teamLeaderId: user.id,
      };
      teamApi
        .addTeam(params)
        .then((res) => {
          dispatch(addTeam(res.data));
          setTeamObj({});
          props.onClose();
        })
        .catch((err) => {});
    }
  };

  return (
    <CModal
      className="create-team-modal"
      show={props.showAddTeam}
      onClose={handleOnClose}
      size="md"
    >
      <CModalHeader closeButton>Tạo nhóm mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div className="name-label">
          <span>*</span>
          Tên nhóm
        </div>
        <CInput
          type="text"
          name="teamName"
          placeholder="Nhập tên nhóm..."
          onChange={onChange}
          className="team-name-input"
        />
        <div className="label-description">Mô tả nhóm</div>
        <CInput
          type="text"
          name="teamDescription"
          placeholder="Nhập mô tả chi tiết nhóm..."
          onChange={onChange}
          className="team-description-input"
        />
        <CButton className="create-team-btn" onClick={onAddTeamClick}>
          Tạo nhóm
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateTeamModal;
