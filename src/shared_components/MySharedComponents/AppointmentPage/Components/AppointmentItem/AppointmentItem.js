import React from "react";
import "./AppointmentItem.scss";
import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { BsAlarm } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

function AppointmentItem({
  index,
  appointment,
  onDelete,
  onShowDetail,
  onEdit,
}) {
  return (
    <CCol
      sm="6"
      lg="3"
      key={index}
      style={{ animationDelay: `${index / 20}s` }}
      className="grid-item-container"
    >
      <div className="item-content">
        <div className="team-top-info">
          <div className="team-header">
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
                  <CDropdownItem className="first" onClick={() => onEdit()}>
                    <FiEdit className="icon-edit-appointment" />
                    Chỉnh sửa
                  </CDropdownItem>
                  <CDropdownItem
                    className="last item-delete"
                    onClick={() => onDelete(index)}
                  >
                    <AiOutlineDelete className="icon-delete-appointment" />
                    Xóa lịch hẹn
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </div>

          <div className="team-infor">
            <BsAlarm className="icon-alarm" />
            <div className="team-name">{appointment.name}</div>
            <div className="team-description">{appointment.description}</div>
          </div>
        </div>

        <div className="team-bottom-info">
          <div className="team-detail-infor">
            <div className="leader-infor">
              <div className="owner-title">Đặt bởi:</div>
              <CTooltip placement="top" content={appointment.userCreateName}>
                <div className="leader-name">
                  <img
                    className="leader-avatar"
                    alt=""
                    src={appointment.userCreateAvatar}
                  />
                  {appointment.userCreateName}
                </div>
              </CTooltip>
            </div>
          </div>
          <div className="team-action" onClick={() => onShowDetail()}>
            Xem chi tiết
          </div>
        </div>
      </div>
    </CCol>
  );
}

export default AppointmentItem;
