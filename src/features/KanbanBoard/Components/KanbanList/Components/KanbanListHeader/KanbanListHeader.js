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
import { AiOutlineDelete } from "react-icons/ai";
import kanbanApi from "src/api/kanbanApi";

KanbanListHeader.propTypes = {};

function KanbanListHeader(props) {
  const clone = { ...props };
  const [showForm, setShowForm] = useState(false);
  const [headerName, setHeaderName] = useState(clone.title);
  const [value, setValue] = useState(clone.title)
  const [showAddCard, setShowAddCard] = useState(false);
  function HandleEditHeader() {
    setShowForm(true);
  }
  function HandleCloseEditHeader() {
    setShowForm(false);
    setValue(props.title);
  }

  const onKeyUp = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      console.log(value);
      if (value) {
        kanbanApi.renameKanbanList({
          kanbanListId: props.kanbanListId,
          kanbanListName: value
        }).then(res => {
          setShowForm(false);
          setValue(value);
        }).catch(err => {
          setShowForm(false);
          setValue(props.title);
        })
      }
      else {
        console.log(props.headerName)
        //setHeaderName(props.headerName);
      }
    }
  }

  return (
    <div className="kanbanlist-header-container" {...props.dragHandleProps}>
      {showForm ? (
        <div className="form-header">
          <CInput
            autoFocus
            value={value}
            class="input-field"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={onKeyUp}
          />
          <div className="input-actions-group" onClick={HandleCloseEditHeader}>
            <CIcon name="cil-x" />
          </div>
        </div>
      ) : (
        <div className="normal-header">
          <div className="lane-title">
            <div className="title">{props.title}</div>
          </div>
          <div className="cards-count">{props.cardCount}</div>
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
                  onClick={() => props.handleShowCreateCard()}
                >
                  <CIcon name="cil-plus" />
                  Thêm thẻ
                </CDropdownItem>

                <CDropdownItem
                  className="last"
                  onClick={() => props.removeList()}
                >
                  <AiOutlineDelete className="delete-icon" />
                  Xóa danh sách
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </div>
      )}
      {/*<CreateCardModal
        showAddCard={showAddCard}
        setShowAddCard={setShowAddCard}
        kblistId={props.data}
      />*/}
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
