import React, { useState } from "react";
import KanbanBoard from "src/features/KanbanBoard/KanbanBoard";
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
    </div>
  );
};

export default TheLayout;
