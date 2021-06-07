import React from "react";
import PropTypes from "prop-types";
import "./UserInfoModal.scss";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import { FiCalendar } from "react-icons/fi";
import { HiOutlineHome, HiOutlineMail } from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

UserInfoModal.propTypes = {};

function UserInfoModal(props) {
  const user = {
    userName: "Nguyễn Dũng",
    userImage: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
    userDescription:
      "Siên viên đại học UIT, đã là thực tập sinh tại ELCA và đang tham gia chương trình Momo Talents",
    userEmail: "dungnguyen@gmail.com",
    userBirthDate: "12/09/1996",
    userPhoneNumber: "0376559828",
    userAddress: "Số 23/123 đường Phạm Văn Đồng, Thủ Đức",
    userGithubLink: "https://github.com/hkdung99",
    userFBLink:
      "https://www.facebook.com/nhkhoa99/jkhbgbijhgbgjeirbgeirgberigebrgeirgbsdfhgdhffdfffffffffffffffffffffffffffffffffffffffffff-fgnfn",
  };
  function handleOnClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

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
          <img alt="" src={user.userImage} />
          <div className="user-name">{user.userName}</div>
        </div>
        <div className="divider"></div>
        <div className="detail-info">
          <div className="label">Chi tiết</div>
          <div className="user-description">{user.userDescription}</div>
          <div className="user-birthdate-item info-item">
            <FiCalendar className="info-item-icon" />
            {user.userBirthDate}
          </div>
        </div>
        <div className="divider notshow"></div>
        <div className="contact-info">
          <div className="label">Liên lạc</div>
          <div className="user-email-item info-item">
            <HiOutlineMail className="info-item-icon" />
            {user.userEmail}
          </div>
          <div className="user-address-item info-item">
            <HiOutlineHome className="info-item-icon  icon-home" />
            {user.userAddress}
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
              {user.userGithubLink}
            </a>
          </div>
          <div className="user-fb-item info-item">
            <FaFacebook className="info-item-icon " />

            <a href={user.userFBLink} target="_blank" rel="noopener noreferrer">
              {user.userFBLink}
            </a>
          </div>
        </div>

        <div className="divider"></div>
      </CModalBody>
    </CModal>
  );
}

export default UserInfoModal;
