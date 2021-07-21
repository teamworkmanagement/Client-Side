import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { BiCameraMovie, BiTask } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import { FcAlarmClock } from "react-icons/fc";
import { IoChatbubblesOutline, IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearAlarm, deleteAlarm } from "src/appSlice.js";
import { setActiveTab } from "src/features/ListTeamPage/teamSlice.js";
import "./AlarmModal.scss";
const appointmentList = [
  {
    name: "Lorem ipsum dolor sit amet",
    userCreateName: "Khoa Nguyễn",
    userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
    date: new Date(),
    hour: "12",
    minute: "24",
    description:
      "Quisque volutpat diam tellus, sed pharetra odio mollis in. Integer bibendum sit amet massa nec vulputate. Phasellus et aliquam massa, nec dapibus nisl",
    type: "normal",
    teamId: "",
  },
  {
    name: "Pellentesque at justo id enim sodales facilisis",
    userCreateName: "Dũng Nguyễn",
    userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
    date: new Date(),
    hour: "9",
    minute: "11",
    description:
      "Suspendisse sapien metus, sodales id ipsum vel, gravida iaculis erat",
    type: "chat",
    teamId: "",
  },
  {
    name: "Phasellus in tellus ut mauris",
    userCreateName: "Tuấn Kiệt Ng",
    userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
    date: new Date(),
    hour: "10",
    minute: "8",
    description: "Curabitur quis mauris augue. Duis in blandit ligula",
    type: "task",
    teamId: "",
  },
  {
    name: "Vivamus sed mollis nunc",
    userCreateName: "Nguyễn Khoa",
    userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
    date: new Date(),
    hour: "7",
    minute: "50",
    description:
      "Nunc feugiat efficitur orci a mattis. Donec lorem purus, suscipit sed ultricies et, dignissim et enim. Proin quis aliquam ligula",
    type: "normal",
    teamId: "",
  },
  {
    name: "Curabitur rutrum hendrerit turpis at viverra",
    userCreateName: "Ngọc Huy",
    userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
    date: new Date(),
    hour: "11",
    minute: "45",
    description: "Quisque id odio nec quam tincidunt viverra vitae eget nisl",
    type: "chat",
    teamId: "",
  },
  {
    name: "Etiam tempor lorem dictum aliquam faucibus",
    userCreateName: "Dũng Nguyễn",
    userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
    date: new Date(),
    hour: "09",
    minute: "36",
    description:
      "Nam nec neque finibus, cursus arcu et, vehicula leo. Etiam ac malesuada felis",
    type: "news",
    teamId: "",
  },
];
function AlarmModal(props) {
  const alarmList = useSelector((state) => state.app.alarmList);
  const dispatch = useDispatch();
  const history = useHistory();
  function removeAlarm(index) {
    dispatch(deleteAlarm(index));
  }

  function onClose() {
    dispatch(clearAlarm());
  }

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

  function getTypeLabel(type) {
    switch (type) {
      case "news":
        return (
          <div className="type">
            Cuộc hẹn:
            <FaRegNewspaper className="type-icon icon-news" />
            <div className="type-name">Bản tin</div>
          </div>
        );
      case "chat":
        return (
          <div className="type">
            Cuộc hẹn:
            <IoChatbubblesOutline className="type-icon icon-chat" />
            <div className="type-name">Nhắn tin</div>
          </div>
        );
      case "task":
        return (
          <div className="type">
            Cuộc hẹn:
            <BiTask className="type-icon icon-task" />
            <div className="type-name">Công việc</div>
          </div>
        );
      default:
        return (
          <div className="type">
            Cuộc hẹn:
            <BiCameraMovie className="type-icon icon-meeting" />
            <div className="type-name">Họp nhóm</div>
          </div>
        );
    }
  }
  ///team/44e3a085-9608-48fa-8453-73e728764e54?tab=appointment

  function gotoAlarm(alarm) {
    var link = "/team/" + alarm.teamId + "?tab=";

    switch (alarm.type) {
      case "task":
        link += "task";
        dispatch(setActiveTab(2));
        break;
      case "chat":
        link += "message";
        dispatch(setActiveTab(3));
        break;
      case "meeting":
        link += "meeting";
        dispatch(setActiveTab(4));
        break;
      default:
        link += "feed";
        dispatch(setActiveTab(1));
        break;
    }
    history.push(link);
    dispatch(clearAlarm());
  }

  return (
    <CModal
      className="create-team-modal"
      show={alarmList.length > 0}
      onClose={onClose}
      size="md"
    >
      <CModalBody className="new-card-form">
        {alarmList.map((alarm, index) => {
          return (
            <div className="alarm-item">
              <div className="header">
                {alarm.type !== "normal" && getTypeLabel(alarm.type)}
                {alarm.type === "normal" && <div></div>}

                <div className="close-btn" onClick={() => removeAlarm(index)}>
                  <IoCloseSharp className="icon-close" />
                </div>
              </div>
              <div class="ring">
                <div class="coccoc-alo-phone coccoc-alo-green coccoc-alo-show">
                  <div class="coccoc-alo-ph-circle"></div>
                  <div class="coccoc-alo-ph-circle-fill"></div>
                  <div class="coccoc-alo-ph-img-circle">
                    <FcAlarmClock className="icon-alarm" />
                  </div>
                </div>
              </div>
              <div className="time">{getHourMinuteText(alarm.date)}</div>
              <div className="alarm-name">Cuộc hẹn: {alarm.name}</div>
              {alarm.description !== null && alarm.description !== "" && (
                <div className="alarm-description">{alarm.description}</div>
              )}
              {alarm.type !== "normal" && (
                <div className="goto-btn" onClick={() => gotoAlarm(alarm)}>
                  Đến cuộc hẹn
                </div>
              )}
              {alarm.type === "normal" && (
                <div className="goto-btn" onClick={() => removeAlarm(index)}>
                  Đóng
                </div>
              )}
            </div>
          );
        })}
      </CModalBody>
    </CModal>
  );
}

export default AlarmModal;
