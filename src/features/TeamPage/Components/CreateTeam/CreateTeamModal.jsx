import CIcon from '@coreui/icons-react';
import {
    CButton, CCard,
    CCardBody,

    CCol,
    CContainer,
    CForm, CInput, CInputGroup,
    CInputGroupPrepend,
    CInputGroupText, CModal,
    CModalBody,
    CModalHeader, CRow
} from "@coreui/react";
import React from "react";

CreateTeamModal.propTypes = {};

function CreateTeamModal(props) {

    const handleOnClose = () => {
        props.onClose();
    }

    const onChange = (e) => {

    }

    const onAddTeamClick = () => {

    }

    return (
        <CModal show={props.showAddTeam} onClose={handleOnClose} size="md">
            <CModalHeader closeButton>Tạo nhóm mới</CModalHeader>
            <CModalBody className="new-card-form">
                <div className="name-label">Nhập tên nhóm:</div>
                <CInput type="text" placeholder="Tên nhóm..." />
                <CButton className="add-card-btn">
                    Tạo
            </CButton>
            </CModalBody>
        </CModal>
    );
}

export default CreateTeamModal;
