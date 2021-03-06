import React, { useState } from "react";
import "./KanbanListHeader.scss";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { AiOutlineDelete } from "react-icons/ai";
import kanbanApi from "src/api/kanbanApi";
import { useSelector } from "react-redux";

function KanbanListHeader(props) {
  const clone = { ...props };
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState(clone.title);
  const adminAction = useSelector((state) => state.kanban.adminAction);

  function HandleEditHeader() {
    setShowForm(true);
  }
  function HandleCloseEditHeader() {
    setShowForm(false);
    setValue(props.title);
  }

  const onKeyUp = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      console.log(value);
      if (value) {
        kanbanApi
          .renameKanbanList({
            kanbanListId: props.kanbanListId,
            kanbanListName: value,
          })
          .then((res) => {
            setShowForm(false);
            setValue(value);
          })
          .catch((err) => {
            setShowForm(false);
            setValue(props.title);
          });
      } else {
        console.log(props.headerName);
        //setHeaderName(props.headerName);
      }
    }
  };

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
        <div
          className={`normal-header ${props.defaultList ? "default-list" : ""}`}
        >
          <div className="lane-title">
            <div className="title">{props.title}</div>
          </div>
          <div className="cards-count">{props.cardCount}</div>
          {!props.defaultList && adminAction && (
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
                    ?????i t??n
                  </CDropdownItem>
                  <CDropdownItem
                    className="last"
                    onClick={() => props.handleShowCreateCard()}
                  >
                    <CIcon name="cil-plus" />
                    Th??m th???
                  </CDropdownItem>

                  <CDropdownItem
                    className="last"
                    onClick={() => props.removeList()}
                  >
                    <AiOutlineDelete className="delete-icon" />
                    X??a danh s??ch
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          )}
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
        <CModalHeader closeButton>Th??? m???i</CModalHeader>
        <CModalBody className="new-card-form">
          <div className="name-label">Nh???p t??n:</div>
          <CInput type="text" placeholder="T??n c??ng vi???c..." />
          <CButton
            onClick={() => setShowAddCard(false)}
            className="add-card-btn"
          >
            T???o
          </CButton>
        </CModalBody>
      </CModal> */}
    </div>
  );
}

export default KanbanListHeader;
