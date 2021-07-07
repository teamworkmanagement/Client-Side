import React, { useEffect, useState } from "react";
import "./UserInfoModal.scss";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import { FiCalendar } from "react-icons/fi";
import { HiOutlineHome, HiOutlineMail } from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import userApi from "src/api/userApi";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import { setUserModal } from "src/appSlice";
moment.locale("vi");

function UserInfoModal(props) {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  function handleOnClose() {
    dispatch(
      setUserModal({
        show: false,
        userId: null,
      })
    );
    if (props.onClose) {
      props.onClose();
    }
  }

  useEffect(() => {
    if (props.userId) {
      console.log(props.userId);
      userApi
        .getById(props.userId)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {});
    }
  }, [props.userId]);

  useEffect(() => {
    if (props.userInfo) {
      setUser(props.userInfo);
    }
  }, [props.userInfo]);

  return (
    <CModal
      className="user-info-modal"
      show={props.show}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader closeButton></CModalHeader>
      <CModalBody className="modal-body">
        <div className="overview-info">
          <img alt="" src={user.userImageUrl} />
          <div className="user-name">
            {user.userFullname ? user.userFullname : "..."}
          </div>
        </div>
        <div className="divider"></div>
        <div className="detail-info">
          <div className="label">Chi tiết</div>
          <div className="user-description">
            {user.userDescription ? user.userDescription : "..."}
          </div>
          <div className="user-birthdate-item info-item">
            <FiCalendar className="info-item-icon" />
            {user.userDateOfBirth
              ? moment(user.userDateOfBirth).format("DD-MM-YYYY")
              : "..."}
          </div>
        </div>
        <div className="divider notshow"></div>
        <div className="contact-info">
          <div className="label">Liên lạc</div>
          <div className="user-email-item info-item">
            <HiOutlineMail className="info-item-icon" />
            {user.userEmail ? user.userEmail : "..."}
          </div>
          <div className="user-address-item info-item">
            <HiOutlineHome className="info-item-icon  icon-home" />
            {user.userAddress ? user.userAddress : "..."}
          </div>
        </div>
        <div className="divider notshow"></div>
        <div className="social-info">
          <div className="label">Liên kết</div>
          <div className="user-github-item info-item">
            <AiFillGithub className="info-item-icon github-icon" />
            <a
              href={user.userGithubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.userGithubLink ? user.userGithubLink : "..."}
            </a>
          </div>
          <div className="user-fb-item info-item">
            <FaFacebook className="info-item-icon " />

            <a
              href={user.userFacebookLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.userFacebookLink ? user.userFacebookLink : "..."}
            </a>
          </div>
        </div>

        <div className="divider"></div>
      </CModalBody>
    </CModal>
  );
}

export default UserInfoModal;
