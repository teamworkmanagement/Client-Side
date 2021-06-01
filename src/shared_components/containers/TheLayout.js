import React, { useState } from "react";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
import ForgotPassword from "../views/pages/forgotpassword/ForgotPassword";
import MyLogin from "../views/pages/login/MyLogin/MyLogin";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import MySideBar from "./MySideBar";

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <MySideBar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
      </div>
      {/* <ForgotPassword /> */}
    </div>
  );
};

export default TheLayout;
