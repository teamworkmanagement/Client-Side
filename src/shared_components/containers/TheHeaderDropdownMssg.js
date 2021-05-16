import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import notiApi from 'src/api/notiApi';

import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';

import classNames from "classnames";
import { useSelector } from 'react-redux';
import uuid from 'src/utils/file/uuid';
import './notification.scss';

// register it.
timeago.register('vi', vi);

const TheHeaderDropdownMssg = () => {

  const [notis, setNotis] = useState([]);
  const newNoti = useSelector(state => state.app.newNotfication);
  const [itemsCount, setItemsCount] = useState(0);
  const user = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    const params = {
      UserId: "f3997f78-4723-4332-8171-add514ae91cd",
      PageSize: 5,
      SkipItems: 0
    };

    notiApi.getNoti({ params }).then(res => {
      console.log(res.data);
      setNotis(res.data.items);

      setItemsCount([...res.data.items].filter(x => !!!x.notificationStatus).length);

    }).catch(err => { })
  }, [])


  useEffect(() => {
    if (!newNoti)
      return;
    const clone = [...notis];

    setItemsCount(itemsCount + 1);
    clone.splice(0, 0, {
      notificationId: uuid(),
      notificationCreatedAt: new Date(),
      notificationImage: 'https://firebasestorage.googleapis.com/v0/b/fir-fcm-5eb6f.appspot.com/o/notification_500px.png?alt=media&token=e68bc511-fdd4-4f76-90d9-11e86a143f21',
      notificationStatus: false,
      notificationContent: newNoti.notificationContent,
    })

    setNotis(clone);
    console.log(newNoti);
    //alert(`${newNoti.notificationGroup} --------- ${newNoti.notificationContent}`);
  }, [newNoti])


  const onClick = (noti) => {
    console.log('onclick: ', noti);
    const payload = {
      groupId: noti.notificationGroup,
      userId: user.id,
    }
    //notiApi.readNoti(payload).then(res => { }).catch(err => { });
    let cloneNotis = [...notis];
    let obj = cloneNotis.find(n => n.notificationId === noti.notificationId);
    obj.notificationStatus = true;

    setNotis(cloneNotis);
    setItemsCount(itemsCount - 1);
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
      style={{ left: '-450px' }}
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" /><CBadge shape="pill" color="info">{itemsCount}</CBadge>
      </CDropdownToggle>
      <div>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem
            header
            tag="div"
            color="transparent"

          >
            <strong>Bạn có {itemsCount} thông báo chưa đọc</strong>
          </CDropdownItem>

          <div className="fixed-noti">
            {
              notis.map(noti => {
                return <CDropdownItem
                  key={noti.notificationId}
                  className={classNames({ "bg-light": !!noti.notificationStatus === false })}
                  onClick={() => onClick(noti)}>
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
                          <span className="truncate">{noti.notificationContent}</span>
                        </div>
                        <small className="text-muted float-right mt-1">
                          <TimeAgo locale='vi'
                            datetime={noti.notificationCreatedAt}></TimeAgo>
                        </small>
                      </div>
                    </div>
                  </div>



                </CDropdownItem>

              })
            }
          </div>

          <CDropdownItem href="#" className="justify-content-center border-top"><strong>Xem thêm</strong></CDropdownItem>
        </CDropdownMenu>
      </div>
    </CDropdown>
  )
}

export default TheHeaderDropdownMssg