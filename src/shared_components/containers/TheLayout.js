import React, { useEffect, useState } from "react";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
import ForgotPassword from "../views/pages/forgotpassword/ForgotPassword";
import MyLogin from "../views/pages/login/MyLogin/MyLogin";
import ChatListSideBar from "./ChatListSideBar";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import TeamTabsSideBar from "./TeamTabsSideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingOptionsSidebar from "./SettingOptionsSidebar";
import CustomToast from "../MySharedComponents/CustomToast/CustomToast";
import { useSelector } from "react-redux";

const TheLayout = () => {
  const newNoti = useSelector((state) => state.app.newNotfication);
  useEffect(() => {
    if (!newNoti) return;

    toast(
      <CustomToast
        type="success"
        title="Thông báo"
        message="Bạn có thông báo mới" />
    );
    //alert(`${newNoti.notificationGroup} --------- ${newNoti.notificationContent}`);
  }, [newNoti]);
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <TeamTabsSideBar />
      <ChatListSideBar />
      <SettingOptionsSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        progressClassName="toastProgress"
      />
      {/* <ForgotPassword /> */}
    </div>
  );
};

export default TheLayout;
