import { CButton, CToast, CToastBody, CToaster } from "@coreui/react";
import React, { useState } from "react";
import AvatarComponent from "src/shared_components/MySharedComponents/AvatarComponent/AvatarComponent";
import AvatarImage from "src/shared_components/MySharedComponents/AvatarComponent/Components/AvatarImage/AvatarImage";
import AvatarName from "src/shared_components/MySharedComponents/AvatarComponent/Components/AvatarName/AvatarName";
import TaskHistoryModal from "src/shared_components/MySharedComponents/TaskHistoryModal/TaskHistoryModal";

const MyToaster = () => {
  const [showTaskHistoryModal, setShowTaskHistoryModal] = useState(false);
  function onCloseTaskHistoryModal() {
    setShowTaskHistoryModal(false);
  }
  return (
    <div style={{ padding: "1.5rem" }}>
      <AvatarComponent
        userName="Dũng Nguyễn"
        userImage="https://emilus.themenate.net/img/avatars/thumb-2.jpg"
        userId="f3997f78-4723-4332-8171-add514ae91cd"
      />
      <AvatarImage
        userName="Dũng Nguyễn"
        userImage=""
        userId="f3997f78-4723-4332-8171-add514ae91cd"
      />
      <AvatarName
        userName="Dũng Nguyễn"
        userId="f3997f78-4723-4332-8171-add514ae91cd"
      />
      <div className="divider" style={{ marginTop: "5rem" }}></div>
      <CButton color="info" onClick={() => setShowTaskHistoryModal(true)}>
        Xem lịch sử công việc
      </CButton>
      <TaskHistoryModal
        show={showTaskHistoryModal}
        onClose={onCloseTaskHistoryModal}
      />
    </div>
  );
};

export default MyToaster;
