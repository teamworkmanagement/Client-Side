import CIcon from "@coreui/icons-react";
import { CButton, CTooltip } from "@coreui/react";
import React, { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import AvatarComponent from "src/shared_components/MySharedComponents/AvatarComponent/AvatarComponent";
import AvatarImage from "src/shared_components/MySharedComponents/AvatarComponent/Components/AvatarImage/AvatarImage";
import AvatarName from "src/shared_components/MySharedComponents/AvatarComponent/Components/AvatarName/AvatarName";
import FilterTaskModal from "src/shared_components/MySharedComponents/FilterTaskModal/FilterTaskModal";
import TaskHistoryModal from "src/shared_components/MySharedComponents/TaskHistoryModal/TaskHistoryModal";

import "./ToastTest.scss";

const MyToaster = () => {
  const [showTaskHistoryModal, setShowTaskHistoryModal] = useState(false);
  const [details, setDetails] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [applyingFilter, setApplyingFilter] = useState(false);
  function onCloseTaskHistoryModal() {
    setShowTaskHistoryModal(false);
  }

  function openFilterModal() {
    setShowFilterModal(true);
  }

  function closeFilterModal() {
    setShowFilterModal(false);
  }

  function applyFilter() {
    setApplyingFilter(true);
  }
  function removeFilter() {
    setApplyingFilter(false);
  }

  const onClickDetail = () => {
    fetch(
      "https://localhost:9001/api/taskver/bytaskid/d17cfc16-1c59-4818-aa3e-ada5ee19a46f"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setDetails(res.data);
      })
      .catch((err) => {});
    setShowTaskHistoryModal(true);
  };
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
        applyingFilter={applyFilter}
      />
      <div className="divide"></div>

      <div className={`filter-btn ${applyingFilter ? "" : "no-filtering"}`}>
        <div className="filter-content" onClick={openFilterModal}>
          <BiFilterAlt className="icon-filter" />
          Lọc công việc
        </div>
        <CTooltip content="Xóa bộ lọc" placement="top">
          <div
            className="remove-filter-btn"
            onClick={() => setApplyingFilter(false)}
          >
            <CIcon name="cil-x" />
          </div>
        </CTooltip>
      </div>
      <FilterTaskModal
        show={showFilterModal}
        applyFilter={applyFilter}
        onClose={closeFilterModal}
        removeFilter={removeFilter}
        applyingFilter={applyingFilter}
      />
    </div>
  );
};

export default MyToaster;
