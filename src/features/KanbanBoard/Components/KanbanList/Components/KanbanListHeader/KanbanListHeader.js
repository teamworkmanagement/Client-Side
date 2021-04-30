import React, { useState } from "react";
import PropTypes from "prop-types";
import "./KanbanListHeader.scss";
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import CreateCardModal from "../CreateCardModal/CreateCardModal";

KanbanListHeader.propTypes = {};

function KanbanListHeader(props) {
  const [showForm, setShowForm] = useState(false);
  const [headerName, setHeaderName] = useState(props.title);
  const [showAddCard, setShowAddCard] = useState(false);
  function HandleEditHeader() {
    setShowForm(true);
  }
  function HandleCloseEditHeader() {
    setShowForm(false);
  }
  return (
    <div className="kanbanlist-header-container" {...props.dragHandleProps}>
      {showForm ? (
        <div className="form-header">
          <CInput
            autoFocus
            defaultValue={headerName}
            class="input-field"
            type="text"
          />
          <div className="input-actions-group" onClick={HandleCloseEditHeader}>
            <CIcon name="cil-x" />
          </div>
        </div>
      ) : (
        <div className="normal-header">
          <div className="lane-title">
            <div className="title">{headerName}</div>
            <div className="divider"></div>
            <div className="cards-count">{props.cardCount}</div>
          </div>
          <div className="header-actions-dropdown">
            <CDropdown>
              <CDropdownToggle id="dropdownMenuButton" caret>
                <div className="lane-actions">
                  <CIcon name="cil-options" />
                </div>
              </CDropdownToggle>
              <CDropdownMenu
                aria-labelledby="dropdownMenuButton"
                placement="bottom-end"
              >
                <CDropdownItem className="first" onClick={HandleEditHeader}>
                  <CIcon name="cil-pencil" />
                  Đổi tên
                </CDropdownItem>
                <CDropdownItem
                  className="last"
                  onClick={() => setShowAddCard(true)}
                >
                  <CIcon name="cil-plus" />
                  Thêm thẻ
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </div>
      )}
      <CreateCardModal
        showAddCard={showAddCard}
        setShowAddCard={setShowAddCard}
      />
      {/* <CModal
        show={showAddCard}
        onClose={() => setShowAddCard(!showAddCard)}
        size="sm"
      >
        <CModalHeader closeButton>Thẻ mới</CModalHeader>
        <CModalBody className="new-card-form">
          <div className="name-label">Nhập tên:</div>
          <CInput type="text" placeholder="Tên công việc..." />
          <CButton
            onClick={() => setShowAddCard(false)}
            className="add-card-btn"
          >
            Tạo
          </CButton>
        </CModalBody>
      </CModal> */}
    </div>
  );
}

export default KanbanListHeader;
