import React, { useEffect, useRef, useState } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import notiApi from "src/api/notiApi";

import { useDispatch, useSelector } from "react-redux";
import "./notification.scss";
import { useHistory } from "react-router";
import "./TheHeaderDropdownMssg.scss";
import { HiOutlineBan } from "react-icons/hi";
import moment from "moment";
import "moment/locale/vi";
import meetingApi from "src/api/meetingApi";
import { setMeeting } from "src/appSlice";
import { connection } from "src/utils/signalr/appService";

moment.locale("vi");

const TheHeaderDropdownMssg = () => {
  const dispatch = useDispatch();
  const [notis, setNotis] = useState([]);
  const newNoti = useSelector((state) => state.app.newNotfication);
  const [itemsCount, setItemsCount] = useState(0);
  const user = useSelector((state) => state.auth.currentUser);
  const [triggerLoad, setTriggerLoad] = useState(0);

  useEffect(() => {
    const params = {
      UserId: user.id,
      PageSize: 5,
      SkipItems: notis.length,
    };

    notiApi
      .getNoti({ params })
      .then((res) => {
        console.log(res.data);
        const notissss = [...notis].concat(res.data.items);
        setNotis(notissss);
        setItemsCount(
          [...notissss].filter((x) => !!!x.notificationStatus).length
        );
      })
      .catch((err) => { });
  }, [triggerLoad]);

  useEffect(() => {
    if (!newNoti) return;
    const clone = [...notis];

    setItemsCount(itemsCount + 1);
    clone.splice(0, 0, { ...newNoti });
    setNotis(clone);
    console.log(newNoti);
  }, [newNoti]);

  const history = useHistory();
  const onClick = (noti, index) => {
    setShow(false);
    console.log("onclick: ", noti);
    if (!noti.notificationStatus) {
      const payload = {
        groupId: noti.notificationGroup,
        userId: user.id,
      };

      notiApi
        .readNoti(payload)
        .then((res) => { })
        .catch((err) => { });
      const cloneNotis = [...notis];

      cloneNotis[index].notificationStatus = true;
      setNotis(cloneNotis);
      setItemsCount(itemsCount - 1);
    }

    if (noti.notificationLink) {
      const data = JSON.parse(noti.notificationLink);
      if (data && data.MeetingId && data.TeamId) {
        window.open(`http://localhost:3000/meetingvideo?id=${data.MeetingId}&tid=${data.TeamId}`, 'sharer', 'height=550,width=750');
      } else {
        history.push({
          pathname: noti.notificationLink.split("?")[0],
          search: noti.notificationLink.split("?")[1]
            ? noti.notificationLink.split("?")[1]
            : null,
        });
      }
    }

  };

  // function getNotiContent(noti) {
  //   switch (noti.notiType) {
  //     case "mention-in-post":
  //       return "đã nhắc đến bạn trong một bài đăng";
  //     case "mention-in-comment":
  //       return "đã nhắc đến bạn trong một bình luận";
  //     case "assigned-task":
  //       return "đã giao một công việc mới cho bạn";
  //     case "unassigned-task":
  //       return "đã giao một công việc của bạn cho người khác";
  //     case "invited-to-team":
  //       return "đã mời bạn vào một nhóm mới";
  //     default:
  //       return "";
  //   }
  // }

  const bellRef = useRef(null);

  function convertTimeNoti(notiDate) {
    const date = new Date(notiDate);
    const today = new Date(Date.now());
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      //cùng ngày
      var hour = date.getHours();
      if (hour < 10) hour = "0" + hour;
      var minute = date.getMinutes();
      if (minute < 10) minute = "0" + minute;
      //return hour + ":" + minute;
      return moment(notiDate).format("HH:mm");
    }

    var dateStr = date.getDate().toString();
    if (dateStr.length === 1) dateStr = "0" + dateStr;
    var monthStr = (date.getMonth() + 1).toString();
    if (monthStr.length === 1) monthStr = "0" + monthStr;

    if (date.getFullYear() === today.getFullYear()) {
      //cùng năm khác ngày
      //return dateStr + "/" + monthStr;
      return moment(notiDate).format("DD/MM");
    } else {
      //khác năm
      //return dateStr + "/" + monthStr + "/" + yearStr;
      return moment(notiDate).format("dd/MM/yyyy");
    }
    //debugger;
  }

  const [show, setShow] = useState(false);

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2 header-message-dropdown"
      direction="down"
    >
      <CDropdownToggle
        ref={bellRef}
        className="c-header-nav-link"
        caret={false}
        onClick={() => setShow(true)}
      >
        <CIcon name="cil-bell" />
        {itemsCount > 0 && (
          <CBadge shape="pill" color="danger">
            {itemsCount}
          </CBadge>
        )}
      </CDropdownToggle>
      <div>
        <CDropdownMenu
          show={show}
          className="pt-0 fixedsize"
          placement="bottom-end"
        >
          <CDropdownItem header tag="div" color="transparent">
            <div className="header-noti-list">
              <div className="title">Thông báo</div>
            </div>
          </CDropdownItem>

          {notis.length > 0 && (
            <div className="noti-list">
              {notis.map((noti, index) => {
                return (
                  <div
                    onClick={() => onClick(noti, index)}
                    className={`noti-item ${noti.notificationStatus ? "seen" : ""
                      }`}
                  >
                    <div className="seen-signal"></div>
                    <img alt="" src={noti.notificationActionAvatar} />
                    <div className="noti-content">
                      <strong>{noti.notificationActionFullName}</strong>
                      {noti.notificationContent}
                    </div>
                    <div className="noti-time">
                      {/* <TimeAgo
                        locale="vi"
                        datetime={noti.notificationCreatedAt}
                      ></TimeAgo> */}
                      {convertTimeNoti(noti.notificationCreatedAt)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {notis.length === 0 && (
            <div className="no-noti-view">
              <HiOutlineBan className="icon-speaker" />
              Bạn chưa có thông báo mới
            </div>
          )}
          <div
            className="load-more-noti-btn"
            onClick={() => setTriggerLoad(triggerLoad + 1)}
          >
            Xem thêm
          </div>
        </CDropdownMenu>
      </div>
    </CDropdown>
  );
};

export default TheHeaderDropdownMssg;
