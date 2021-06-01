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
import { addTeam } from "../teamSlice";
import "./CreateTeamModal.scss";

CreateTeamModal.propTypes = {};

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
    if (!teamObj?.teamName || !teamObj?.teamDescription) {
      alert("Không được để trống thông tin");
    } else {
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
        <div className="name-label">Tên nhóm</div>
        <CInput
          type="text"
          name="teamName"
          placeholder="Nhập tên nhóm..."
          onChange={onChange}
        />
        <div className="name-label label-description">Mô tả nhóm</div>
        <CInput
          type="text"
          name="teamDescription"
          placeholder="Nhập mô tả chi tiết nhóm..."
          onChange={onChange}
        />
        <CButton className="create-team-btn" onClick={onAddTeamClick}>
          Tạo nhóm
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default CreateTeamModal;
