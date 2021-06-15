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
      .catch((err) => { });
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
    console.log("onclick: ", noti);
    const payload = {
      groupId: noti.notificationGroup,
      userId: user.id,
    };
    //notiApi.readNoti(payload).then(res => { }).catch(err => { });
    const cloneNotis = [...notis];
    const obj = cloneNotis.find((n) => n.notificationGroup === noti.notificationGroup);

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


  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2 header-message-dropdown"
      direction="down"
    >
      <CDropdownToggle ref={bellRef} className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        <CBadge shape="pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <div>
        <CDropdownMenu className="pt-0 fixedsize" placement="bottom-end">
          <CDropdownItem header tag="div" color="transparent">
            <div className="header-noti-list">
              <div className="title">Thông báo</div>
              <div className="clear-btn">Xóa tất cả</div>
            </div>
          </CDropdownItem>

          {/* <div className="fixed-noti">
            {notis.map((noti) => {
              return (
                <CDropdownItem
                  key={noti.notificationId}
                  className={classNames({
                    "bg-light": !!noti.notificationStatus === false,
                  })}
                  onClick={() => onClick(noti)}
                >
                  <div className="message">
                    <div className="pt-3 mr-3 float-left">
                      <div className="c-avatar">
                        <CImg
                          src={noti.notificationImage}
                          className="c-avatar-img"
                          alt="notiimg"
                        />
                        <span className="c-avatar-status bg-info"></span>
                      </div>
                    </div>

                    <div>
                      <div className="d-flex justify-content-start flex-column">
                        <div className="text-muted">
                          <span className="truncate">
                            {noti.notificationContent}
                          </span>
                        </div>
                        <small className="text-muted float-right mt-1">
                          <TimeAgo
                            locale="vi"
                            datetime={noti.notificationCreatedAt}
                          ></TimeAgo>
                        </small>
                      </div>
                    </div>
                  </div>
                </CDropdownItem>
              );
            })}
          </div> */}
          {notis.length > 0 && (
            <div className="noti-list">
              {notis.map((noti) => {
                return (
                  <div onClick={() => onClick(noti)} className="noti-item">
                    <img alt="" src={noti.notificationActionAvatar} />
                    <div className="noti-content">
                      <strong>{noti.notificationActionFullName}</strong>
                      {noti.notificationContent}
                    </div>
                    <div className="noti-time"><TimeAgo
                      locale="vi"
                      datetime={noti.notificationCreatedAt}
                    ></TimeAgo></div>
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
          <div className="load-more-noti-btn" onClick={() => setTriggerLoad(triggerLoad + 1)}>Xem thêm</div>
        </CDropdownMenu>
      </div>
    </CDropdown>
  );
};

export default TheHeaderDropdownMssg;
