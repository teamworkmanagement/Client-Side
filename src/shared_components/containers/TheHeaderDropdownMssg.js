import React, { useEffect, useRef, useState } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import notiApi from "src/api/notiApi";

import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import vi from "timeago.js/lib/lang/vi";

import classNames from "classnames";
import { useSelector } from "react-redux";
import uuid from "src/utils/file/uuid";
import "./notification.scss";
import { useHistory } from "react-router";
import "./TheHeaderDropdownMssg.scss";
import { AiOutlineNotification } from "react-icons/ai";
import { HiOutlineBan } from "react-icons/hi";
import { VscArrowUp } from "react-icons/vsc";
// register it.
timeago.register("vi", vi);

const TheHeaderDropdownMssg = () => {
  const [notis, setNotis] = useState([]);
  const newNoti = useSelector((state) => state.app.newNotfication);
  const [itemsCount, setItemsCount] = useState(0);
  const user = useSelector((state) => state.auth.currentUser);
  const [triggerLoad, setTriggerLoad] = useState(0);
  const listNoti = [
    {
      notiOwnerName: "Dũng Nguyễn",
      notiOwnerImage: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
      notiType: "mention-in-post",
      notiTime: "7:57PM",
    },
    {
      notiOwnerName: "Phạm Khải",
      notiOwnerImage: "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
      notiType: "mention-in-comment",
      notiTime: "7:57PM",
    },
    {
      notiOwnerName: "Anthony Trần",
      notiOwnerImage: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
      notiType: "assigned-task",
      notiTime: "06/11",
    },
    {
      notiOwnerName: "Johnny Đặng",
      notiOwnerImage: "https://emilus.themenate.net/img/avatars/thumb-4.jpg",
      notiType: "unassigned-task",
      notiTime: "21/06",
    },
    {
      notiOwnerName: "Thế Thức",
      notiOwnerImage: "https://emilus.themenate.net/img/avatars/thumb-5.jpg",
      notiType: "invited-to-team",
      notiTime: "7:57PM",
    },
  ];
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
      .catch((err) => {});
  }, [triggerLoad]);

  useEffect(() => {
    if (!newNoti) return;
    const clone = [...notis];

    setItemsCount(itemsCount + 1);
    clone.splice(0, 0, newNoti);
    setNotis(clone);
    console.log(newNoti);
    //alert(`${newNoti.notificationGroup} --------- ${newNoti.notificationContent}`);
  }, [newNoti]);

  const history = useHistory();
  const onClick = (noti) => {
    setShow(false);
    console.log("onclick: ", noti);
    const payload = {
      groupId: noti.notificationGroup,
      userId: user.id,
    };
    //notiApi.readNoti(payload).then(res => { }).catch(err => { });
    const cloneNotis = [...notis];

    const obj = cloneNotis.find(
      (n) => n.notificationGroup === noti.notificationGroup
    );

    /*if (obj.notificationStatus === false) {
      obj.notificationStatus = true;
      setNotis(cloneNotis);
      setItemsCount(itemsCount - 1);
    }*/

    if (obj.notificationLink)
      history.push({
        pathname: obj.notificationLink.split("?")[0],
        search: obj.notificationLink.split("?")[1]
          ? obj.notificationLink.split("?")[1]
          : null,
      });
    console.log(obj.notificationLink.split("?")[0]);
    console.log(obj.notificationLink.split("?")[1]);
  };

  function getNotiContent(noti) {
    switch (noti.notiType) {
      case "mention-in-post":
        return "đã nhắc đến bạn trong một bài đăng";
      case "mention-in-comment":
        return "đã nhắc đến bạn trong một bình luận";
      case "assigned-task":
        return "đã giao một công việc mới cho bạn";
      case "unassigned-task":
        return "đã giao một công việc của bạn cho người khác";
      case "invited-to-team":
        return "đã mời bạn vào một nhóm mới";
      default:
        return "";
    }
    return noti.notiType;
  }

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
      return hour + ":" + minute;
    }

    var dateStr = date.getDate().toString();
    if (dateStr.length === 1) dateStr = "0" + dateStr;
    var monthStr = (date.getMonth() + 1).toString();
    if (monthStr.length === 1) monthStr = "0" + monthStr;
    const yearStr = date.getFullYear();

    if (date.getFullYear() === today.getFullYear()) {
      //cùng năm khác ngày
      return dateStr + "/" + monthStr;
    } else {
      //khác năm
      return dateStr + "/" + monthStr + "/" + yearStr;
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
              <div className="clear-btn">Xóa tất cả</div>
            </div>
          </CDropdownItem>

          {notis.length > 0 && (
            <div className="noti-list">
              {notis.map((noti) => {
                return (
                  <div
                    onClick={() => onClick(noti)}
                    className={`noti-item ${
                      noti.notificationStatus ? "seen" : ""
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
