import {
    CButton, CInput, CModal,
    CModalBody,
    CModalHeader
} from "@coreui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import teamApi from "src/api/teamApi";
import { addTeam } from "../teamSlice";


JoinTeamModal.propTypes = {};

function JoinTeamModal(props) {

    const dispatch = useDispatch();
    const [teamCode, setTeamCode] = useState('');
    const userId = useSelector(state => state.auth.currentUser.id);
    const handleOnClose = () => {
        props.onClose();
    }

    const onJoinTeamClick = () => {
        teamApi.joinTeam({
            "userId": userId,
            "teamCode": teamCode,
        }).then(res => {
            const data = res.data;
            setTeamCode('');
            if (!data) {
                alert('Team không tồn tại');
                return;
            }

            if (data?.teamName === null) {
                alert('Bạn đã tham gia nhóm này trước đó');
                return;
            }

            alert('Tham gia nhóm thành công');
            dispatch(addTeam(data));
        }).catch(err => {

        });
    }

    return (
        <CModal show={props.showJoinTeam} onClose={handleOnClose} size="md">
            <CModalHeader closeButton>Tham gia nhóm</CModalHeader>
            <CModalBody className="new-card-form">
                <div className="name-label">Nhập mã code của nhóm:</div>
                <CInput type="text" name="teamName" value={teamCode} placeholder="Mã code..." onChange={(e) => setTeamCode(e.target.value)} />
                <CButton className="add-card-btn" onClick={onJoinTeamClick}>
                    Tham gia nhóm
        </CButton>
            </CModalBody>
        </CModal>
    );
}

export default JoinTeamModal;