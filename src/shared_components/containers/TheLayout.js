import React, { useState } from "react";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
import MyLogin from "../views/pages/login/MyLogin/MyLogin";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
      </div>
      {/* <MyLogin /> */}
    </div>
  );
};

export default TheLayout;
