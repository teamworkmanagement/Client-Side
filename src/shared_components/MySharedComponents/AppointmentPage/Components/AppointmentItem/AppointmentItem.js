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
import { useSelector } from "react-redux";

function AppointmentItem({
  index,
  appointment,
  onDelete,
  onShowDetail,
  onEdit,
}) {
  const user = useSelector((state) => state.auth.currentUser);

  function getHourMinuteText(originDate) {
    //debugger;
    const date = new Date(originDate);
    var hour = date.getHours() + "";
    var minute = date.getMinutes() + "";
    if (hour.length === 1) {
      hour = "0" + hour;
    }
    if (minute.length === 1) {
      minute = "0" + minute;
    }
    return hour + ":" + minute;
  }
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
                  <CDropdownItem
                    disabled={user.id !== appointment.userCreateId}
                    className="first"
                    onClick={() => onEdit()}
                  >
                    <FiEdit className="icon-edit-appointment" />
                    Chỉnh sửa
                  </CDropdownItem>
                  <CDropdownItem
                    disabled={user.id !== appointment.userCreateId}
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
            <div className="time">{getHourMinuteText(appointment.date)}</div>
            <div className="team-name">Lịch hẹn: {appointment.name}</div>
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
