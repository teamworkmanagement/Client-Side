import {
    CModal,
    CModalBody,
    CModalHeader
} from "@coreui/react";
import React from "react";
import Select from 'react-select';

JoinTeamModal.propTypes = {};

function JoinTeamModal(props) {

    const handleOnClose = () => {
        props.onClose();
    }

    return (
        <CModal show={props.showJoinTeam} onClose={handleOnClose} size="md">
            <CModalHeader closeButton>Thẻ mới</CModalHeader>
            <CModalBody className="new-card-form">
                <div>
                    <Select />
                </div>
            </CModalBody>
        </CModal>
    );
}

export default JoinTeamModal;
