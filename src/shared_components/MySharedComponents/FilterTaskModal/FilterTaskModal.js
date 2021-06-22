import React, { useState } from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import "./FilterTaskModal.scss";
import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CInputCheckbox,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

FilterTaskModal.propTypes = {};

const ValueOption = (props) => (
  <components.SingleValue {...props}>
    <div
      style={{
        display: "flex",
        padding: "0.2rem 0rem",
        marginTop: "auto",
        marginBottom: "auto",
      }}
    >
      <img
        src={props.data.img}
        style={{ width: 30, borderRadius: "500rem", marginRight: "0.5rem" }}
        alt=""
      />
      <span style={{ marginTop: "auto", marginBottom: "auto" }}>
        {props.data.label}
      </span>
    </div>
  </components.SingleValue>
);

export const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div
        className="select-option"
        style={{
          display: "flex",
          marginTop: "auto",
          marginBottom: "auto",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div className="option-content">
          <img
            style={{ borderRadius: "500rem" }}
            alt=""
            height={20}
            width={20}
            src={props.data.img}
          />
          <label>{props.data.label}</label>
        </div>
        {props.data.selected && <label>&#10003;</label>}
      </div>
    </components.Option>
  );
};

function FilterTaskModal(props) {
  const TODO_COLOR = "#FF5454";
  const DOING_COLOR = "#EE8434";
  const DONE_COLOR = "#2ABB7D";
  const TODO_BACKGROUNDCOLOR = "#FBEAEA";
  const DOING_BACKGROUNDCOLOR = "#FEF5EE";
  const DONE_BACKGROUNDCOLOR = "#ECF5EA";
  const [taskStatus, setTaskStatus] = useState("todo");

  const [chooseName, setChooseName] = useState(false);
  const [chooseDescription, setChooseDescription] = useState(false);
  const [chooseStatus, setChooseStatus] = useState(false);
  const [chooseDate, setChooseDate] = useState(false);
  const [chooseAssignedUser, setChooseAssignedUser] = useState(false);
  const [memberList, setMemberList] = useState([
    {
      id: "1",
      label: "Dũng Nguyễn",
      img: "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      selected: false,
    },
    {
      id: "2",
      label: "Hồng Khoa",
      img: "https://emilus.themenate.net/img/avatars/thumb-7.jpg",
      selected: false,
    },
    {
      id: "3",
      label: "Ngọc Huy",
      img: "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
      selected: false,
    },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const onChange = (e) => {
    setSelectedUser(e);
    console.log(e);

    const clonedMembers = [...memberList];
    for (let i = 0; i < memberList.length; i++) {
      if (e === null) {
        clonedMembers[i] = {
          ...memberList[i],
          selected: false,
        };
      } else {
        if (clonedMembers[i].id === e.id) {
          clonedMembers[i] = {
            ...memberList[i],
            selected: true,
          };
        } else {
          clonedMembers[i] = {
            ...memberList[i],
            selected: false,
          };
        }
      }
    }
    console.log(clonedMembers);
    setMemberList(clonedMembers);
  };

  function onChooseStatus(status) {
    setTaskStatus(status);
  }

  function getStatusBackgroundColor() {
    switch (taskStatus) {
      case "todo":
        return TODO_BACKGROUNDCOLOR;
      case "doing":
        return DOING_BACKGROUNDCOLOR;
      default:
        return DONE_BACKGROUNDCOLOR;
    }
  }
  function getStatusColor() {
    switch (taskStatus) {
      case "todo":
        return TODO_COLOR;
      case "doing":
        return DOING_COLOR;
      default:
        return DONE_COLOR;
    }
  }
  function getStatusText() {
    switch (taskStatus) {
      case "todo":
        return "Đang chờ";
      case "doing":
        return "Đang thực hiện";
      case "done":
        return "Hoàn thành";
      default:
        return "Đang chờ";
    }
  }
  function getStatusColorFormText(status) {
    switch (status) {
      case "todo":
        return TODO_COLOR;
      case "doing":
        return DOING_COLOR;
      default:
        return DONE_COLOR;
    }
  }
  function onChooseStatus(e) {
    const newStatus = e.target.classList[0];
    let status = "";
    switch (newStatus) {
      case "todo-status":
        status = "todo";
        break;
      case "doing-status":
        status = "doing";
        break;
      default:
        status = "done";
        break;
    }

    setTaskStatus(status);
  }

  function handleClose() {
    if (props.onClose) {
      props.onClose();
    }
  }
  function onFilter() {
    if (props.applyFilter) {
      props.applyFilter();
    }
    handleClose();
  }
  function removeFiltering() {
    if (props.removeFilter) {
      props.removeFilter();
    }
  }
  return (
    <CModal
      className="filter-task-modal-container"
      show={props.show}
      onClose={handleClose}
      size="md"
    >
      <CModalHeader closeButton>Lọc công việc</CModalHeader>
      <CModalBody>
        {props.applyingFilter && (
          <div className="label-remove-filter" onClick={removeFiltering}>
            <CIcon name="cil-x" />
            Xóa bộ lọc đang áp dụng
          </div>
        )}
        <div className="filter-option-group">
          <div
            className="choose-label"
            onClick={() => setChooseName(!chooseName)}
          >
            <CInputCheckbox checked={chooseName} />
            Lọc theo tên:
          </div>
          <CInput
            disabled={!chooseName}
            type="text"
            placeholder="Nhập tên..."
          />
        </div>
        <div className="filter-option-group">
          <div
            className="choose-label"
            onClick={() => setChooseDescription(!chooseDescription)}
          >
            <CInputCheckbox checked={chooseDescription} />
            Lọc theo mô tả:
          </div>
          <CInput
            disabled={!chooseDescription}
            type="text"
            placeholder="Nhập mô tả..."
          />
        </div>
        <div className="filter-option-group">
          <div
            className="choose-label"
            onClick={() => setChooseStatus(!chooseStatus)}
          >
            <CInputCheckbox checked={chooseStatus} />
            Lọc theo trạng thái:
          </div>
          <div className="task-status-dropdown status-infor">
            <CDropdown>
              <CDropdownToggle
                id="dropdownMenuButton"
                className="my-btn"
                style={{
                  backgroundColor: getStatusBackgroundColor(),
                  color: getStatusColor(),
                  fontWeight: "bold",
                }}
                disabled={!chooseStatus}
              >
                {getStatusText()}
              </CDropdownToggle>
              <CDropdownMenu
                aria-labelledby="dropdownMenuButton"
                placement="bottom-end"
                onClick={onChooseStatus}
              >
                {taskStatus !== "todo" && (
                  <CDropdownItem className="todo-status">
                    <div
                      className="color-dot"
                      style={{
                        backgroundColor: getStatusColorFormText("todo"),
                      }}
                    ></div>
                    Đang chờ
                  </CDropdownItem>
                )}

                {taskStatus !== "doing" && (
                  <CDropdownItem className="doing-status">
                    <div
                      className="color-dot"
                      style={{
                        backgroundColor: getStatusColorFormText("doing"),
                      }}
                    ></div>
                    Đang thực hiện
                  </CDropdownItem>
                )}
                {taskStatus !== "done" && (
                  <CDropdownItem className="done-status">
                    <div
                      className="color-dot"
                      style={{
                        backgroundColor: getStatusColorFormText("done"),
                      }}
                    ></div>
                    Hoàn thành
                  </CDropdownItem>
                )}
              </CDropdownMenu>
            </CDropdown>
          </div>
        </div>

        <div className="filter-option-group date-option">
          <div
            className="choose-label"
            onClick={() => setChooseDate(!chooseDate)}
          >
            <CInputCheckbox checked={chooseDate} />
            Lọc theo ngày:
          </div>
          <div className="date-group">
            <div className="from-date date-item">
              <div className="date-label">Từ ngày</div>
              <CInput
                type="date"
                id="date-from"
                name="date-input"
                placeholder="date"
                disabled={!chooseDate}
              />
            </div>
            <div className="to-date date-item">
              <div className="date-label">Đến ngày</div>
              <CInput
                type="date"
                id="date-to"
                name="date-input"
                placeholder="date"
                disabled={!chooseDate}
              />
            </div>
          </div>
        </div>
        <div className="filter-option-group">
          <div
            className="choose-label"
            onClick={() => setChooseAssignedUser(!chooseAssignedUser)}
          >
            <CInputCheckbox checked={chooseAssignedUser} />
            Lọc theo thành viên đảm nhận:
          </div>
          <div style={{ width: "15rem" }}>
            <Select
              isDisabled={!chooseAssignedUser}
              className="basic-single"
              value={selectedUser}
              isClearable="true"
              isSearchable="true"
              name="member"
              options={memberList}
              placeholder="Chọn thành viên..."
              components={{
                Option: CustomOption,
                SingleValue: ValueOption,
              }}
              noOptionsMessage={() => "Không tìm thấy"}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="apply-filter-btn" onClick={onFilter}>
          Lọc
        </div>
      </CModalBody>
    </CModal>
  );
}

export default FilterTaskModal;