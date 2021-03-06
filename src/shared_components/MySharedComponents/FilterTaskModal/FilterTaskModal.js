import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import "./FilterTaskModal.scss";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CInputCheckbox,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
import userApi from "src/api/userApi";

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
      label: "D??ng Nguy???n",
      img: "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      selected: false,
    },
    {
      id: "2",
      label: "H???ng Khoa",
      img: "https://emilus.themenate.net/img/avatars/thumb-7.jpg",
      selected: false,
    },
    {
      id: "3",
      label: "Ng???c Huy",
      img: "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
      selected: false,
    },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentBoard = useSelector(
    (state) => state.kanban.kanbanBoard.currentBoard
  );

  const [filterObj, setFilterObj] = useState({});

  useEffect(() => {
    if (currentBoard) {
      console.log("current board: ", currentBoard);
      const params = {
        boardId: currentBoard,
      };
      userApi
        .searchUsersKanban({ params })
        .then((res) => {
          const listUsers = res.data?.map((x) => {
            return {
              value: x.userId,
              label: x.userFullname,
              img: x.userImageUrl,
              selected: false,
            };
          });
          setMemberList(listUsers);
        })
        .catch((err) => {});
    }
  }, [currentBoard]);
  const onChange = (e) => {
    setSelectedUser(e);
    setFilterObj({ ...filterObj, userId: e?.value ? e.value : null });
    console.log(e);

    if (!e) return;

    const clonedMembers = [...memberList];
    for (let i = 0; i < memberList.length; i++) {
      if (e === null) {
        clonedMembers[i] = {
          ...memberList[i],
          selected: false,
        };
      } else {
        if (clonedMembers[i].value === e.value) {
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
        return "??ang ch???";
      case "doing":
        return "??ang th???c hi???n";
      case "done":
        return "Ho??n th??nh";
      default:
        return "??ang ch???";
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
  //eslint-disable-next-line
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

  useEffect(() => {
    setFilterObj({
      ...filterObj,
      taskStatus: taskStatus,
    });
  }, [taskStatus]);

  function handleClose() {
    if (props.onClose) {
      props.onClose();
    }
  }
  function onFilter() {
    const cloneFilter = {
      ...filterObj,
      taskName: !filterObj.taskName ? null : filterObj.taskName,
      taskDescription: !filterObj.taskDescription
        ? null
        : filterObj.taskDescription,
      startRange: !filterObj.startRange ? null : filterObj.startRange,
      endRange: !filterObj.endRange ? null : filterObj.endRange,
      userId: !filterObj.userId ? null : filterObj.userId,
    };

    if (!chooseName) cloneFilter.taskName = null;

    if (!chooseDescription) cloneFilter.taskDescription = null;

    if (!chooseStatus) cloneFilter.taskStatus = null;

    if (!chooseDate) {
      cloneFilter.startRange = null;
      cloneFilter.endRange = null;
    } else {
      if (!cloneFilter.startRange) cloneFilter.startRange = null;
      else cloneFilter.startRange = new Date(cloneFilter.startRange);

      if (!cloneFilter.endRange) cloneFilter.endRange = null;
      else cloneFilter.endRange = new Date(cloneFilter.endRange);
    }

    if (!chooseAssignedUser) {
      cloneFilter.userId = null;
    }

    console.log(cloneFilter);
    if (props.applyFilter) {
      props.applyFilter(cloneFilter);
    }
    //handleClose();
  }
  function removeFiltering() {
    if (props.removeFilter) {
      props.removeFilter();
      setFilterObj({
        taskStatus: "todo",
        startRange: "",
        endRange: "",
        taskName: "",
        taskDescription: "",
        userId: "",
      });

      setSelectedUser(null);
      setTaskStatus("todo");

      setChooseName(false);
      setChooseDescription(false);
      setChooseStatus(false);
      setChooseDate(false);
      setChooseAssignedUser(false);
    }
  }
  return (
    <CModal
      className="filter-task-modal-container"
      show={props.show}
      onClose={handleClose}
      size="md"
    >
      <CModalHeader closeButton>L???c c??ng vi???c</CModalHeader>
      <CModalBody>
        {props.applyingFilter && (
          <div className="label-remove-filter" onClick={removeFiltering}>
            <CIcon name="cil-x" />
            X??a b??? l???c ??ang ??p d???ng
          </div>
        )}
        <div className="filter-option-group">
          <div
            className="choose-label"
            onClick={() => setChooseName(!chooseName)}
          >
            <CInputCheckbox checked={chooseName} />
            L???c theo t??n:
          </div>
          <CInput
            disabled={!chooseName}
            type="text"
            placeholder="Nh???p t??n..."
            value={filterObj.taskName}
            onChange={(e) =>
              setFilterObj({ ...filterObj, taskName: e.target.value })
            }
          />
        </div>
        <div className="filter-option-group">
          <div
            className="choose-label"
            onClick={() => setChooseDescription(!chooseDescription)}
          >
            <CInputCheckbox checked={chooseDescription} />
            L???c theo m?? t???:
          </div>
          <CInput
            disabled={!chooseDescription}
            type="text"
            placeholder="Nh???p m?? t???..."
            onChange={(e) =>
              setFilterObj({ ...filterObj, taskDescription: e.target.value })
            }
            value={filterObj.taskDescription}
          />
        </div>
        <div className="filter-option-group">
          <div
            className="choose-label"
            onClick={() => setChooseStatus(!chooseStatus)}
          >
            <CInputCheckbox checked={chooseStatus} />
            L???c theo tr???ng th??i:
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
                    ??ang ch???
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
                    ??ang th???c hi???n
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
                    Ho??n th??nh
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
            L???c theo ng??y:
          </div>
          <div className="date-group">
            <div className="from-date date-item">
              <div className="date-label">T??? ng??y</div>
              <CInput
                type="date"
                id="date-from"
                name="date-input"
                placeholder="date"
                disabled={!chooseDate}
                onChange={(e) =>
                  setFilterObj({ ...filterObj, startRange: e.target.value })
                }
                value={filterObj.startRange}
              />
            </div>
            <div className="to-date date-item">
              <div className="date-label">?????n ng??y</div>
              <CInput
                type="date"
                id="date-to"
                name="date-input"
                placeholder="date"
                disabled={!chooseDate}
                onChange={(e) =>
                  setFilterObj({ ...filterObj, endRange: e.target.value })
                }
                value={filterObj.endRange}
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
            L???c theo th??nh vi??n ?????m nh???n:
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
              placeholder="Ch???n th??nh vi??n..."
              components={{
                Option: CustomOption,
                SingleValue: ValueOption,
              }}
              noOptionsMessage={() => "Kh??ng t??m th???y"}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="apply-filter-btn" onClick={onFilter}>
          L???c
        </div>
      </CModalBody>
    </CModal>
  );
}

export default FilterTaskModal;
