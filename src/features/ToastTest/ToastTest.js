import { CButton, CToast, CToastBody, CToaster } from "@coreui/react";
import React, { useState } from "react";
import AvatarComponent from "src/shared_components/MySharedComponents/AvatarComponent/AvatarComponent";
import AvatarImage from "src/shared_components/MySharedComponents/AvatarComponent/Components/AvatarImage/AvatarImage";
import AvatarName from "src/shared_components/MySharedComponents/AvatarComponent/Components/AvatarName/AvatarName";
import TaskHistoryModal from "src/shared_components/MySharedComponents/TaskHistoryModal/TaskHistoryModal";

const MyToaster = () => {
  const [showTaskHistoryModal, setShowTaskHistoryModal] = useState(false);
  const [details, setDetails] = useState([]);
  function onCloseTaskHistoryModal() {
    setShowTaskHistoryModal(false);
  }

  const onClickDetail = () => {
    fetch('https://localhost:9001/api/taskver/bytaskid/d17cfc16-1c59-4818-aa3e-ada5ee19a46f')
      .then(res => res.json())
      .then(res => {
        console.log(res.data);
        setDetails(res.data);
      }).catch(err => {

      })
    setShowTaskHistoryModal(true)
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
      <CButton color="info" onClick={onClickDetail}>
        Xem lịch sử công việc
      </CButton>
      <TaskHistoryModal
        details={details}
        show={showTaskHistoryModal}
        onClose={onCloseTaskHistoryModal}
      />
    </div>
  );
};

export default MyToaster;
