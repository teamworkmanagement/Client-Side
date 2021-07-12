import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { VscFeedback } from "react-icons/vsc";
import { MdHelpOutline } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import "./TheHeaderDropdown.scss";
import { useHistory } from "react-router";
import { delete_cookie } from "src/utils/auth";
import { setAuthF } from "../views/pages/login/authSlice";

const TheHeaderDropdown = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const history = useHistory();
  const dispatch = useDispatch();
  const goToAccountSetting = () => {
    history.push({
      pathname: "/myaccount",
      search: null,
    });
  };

  const goToFeedbacks = () => {
    history.push({
      pathname: "/feedbacks",
      search: null,
    });
  };

  const onLogout = () => {
    dispatch(setAuthF());
    delete_cookie("backup");
  };
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={user.userAvatar} className="c-avatar-img" alt="" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem> */}
        <CDropdownItem className="dropdown-item-user">
          <img alt="" src={user.userAvatar} />
          <div className="user-name">{user.fullName}</div>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => goToAccountSetting()}>
          <CIcon name="cil-user" className="mfe-2" />
          Cài đặt tài khoản
        </CDropdownItem>
        {/* <div className="darkmode-item">
          <div className="title">
            <CIcon name="cil-moon" className="mfe-2" />
            Chế độ tối
          </div>
          <CSwitch
            className={"mx-1"}
            shape={"pill"}
            color={"info"}
            variant={"opposite"}
            labelOn={"\u2713"}
            labelOff={"\u2715"}
            defaultValue="false"
          />
        </div> */}
        <CDropdownItem divider />
        <CDropdownItem onClick={() => goToFeedbacks()}>
          <VscFeedback className="mfe-2 icon-feedback" />
          Đóng góp cho ứng dụng
        </CDropdownItem>
        <CDropdownItem>
          <MdHelpOutline className="mfe-2 icon-help" />
          Trợ giúp
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => onLogout()}>
          <BiLogOut className="mfe-2 icon-logout" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
