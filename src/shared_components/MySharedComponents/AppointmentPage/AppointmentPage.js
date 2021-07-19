import React, { useState } from "react";
import "./AppointmentPage.scss";
import { CRow } from "@coreui/react";
import AppointmentItem from "./Components/AppointmentItem/AppointmentItem.js";
import DeleteConfirmModal from "./Components/DeleleConfirmModal/DeleleConfirmModal.js";
import AppointmentDetailModal from "./Components/AppointmentDetailModal/AppointmentDetailModal.js";
import AppointmentCreateModal from "./Components/AppointmentCreateModal/AppointmentCreateModal.js";
import { AiOutlinePlus } from "react-icons/ai";
import AppointmentEditModal from "./Components/AppointmentEditModal/AppointmentEditModal.js";
function AppointmentPage(props) {
  const appointmentType = ["meeting", "chat", "task", "news", "normal"];

  const appointmentList = [
    {
      name: "Lorem ipsum dolor sit amet",
      userCreateName: "Khoa Nguyễn",
      userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
      date: "18/07/2021",
      hour: "12",
      minute: "24",
      description:
        "Quisque volutpat diam tellus, sed pharetra odio mollis in. Integer bibendum sit amet massa nec vulputate. Phasellus et aliquam massa, nec dapibus nisl",
      type: "normal",
      teamId: "",
    },
    {
      name: "Pellentesque at justo id enim sodales facilisis",
      userCreateName: "Dũng Nguyễn",
      userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
      date: "19/07/2021",
      hour: "9",
      minute: "11",
      description:
        "Suspendisse sapien metus, sodales id ipsum vel, gravida iaculis erat",
      type: "chat",
      teamId: "",
    },
    {
      name: "Phasellus in tellus ut mauris",
      userCreateName: "Tuấn Kiệt Ng",
      userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      date: "29/07/2021",
      hour: "10",
      minute: "8",
      description: "Curabitur quis mauris augue. Duis in blandit ligula",
      type: "task",
      teamId: "",
    },
    {
      name: "Vivamus sed mollis nunc",
      userCreateName: "Nguyễn Khoa",
      userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
      date: "29/07/2021",
      hour: "7",
      minute: "50",
      description:
        "Nunc feugiat efficitur orci a mattis. Donec lorem purus, suscipit sed ultricies et, dignissim et enim. Proin quis aliquam ligula",
      type: "normal",
      teamId: "",
    },
    {
      name: "Curabitur rutrum hendrerit turpis at viverra",
      userCreateName: "Ngọc Huy",
      userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
      date: "18/06/2021",
      hour: "11",
      minute: "45",
      description: "Quisque id odio nec quam tincidunt viverra vitae eget nisl",
      type: "chat",
      teamId: "",
    },
    {
      name: "Etiam tempor lorem dictum aliquam faucibus",
      userCreateName: "Dũng Nguyễn",
      userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
      date: "11/07/2021",
      hour: "14",
      minute: "15",
      description:
        "Nam nec neque finibus, cursus arcu et, vehicula leo. Etiam ac malesuada felis",
      type: "news",
      teamId: "",
    },
    {
      name: "Maecenas elementum turpis sapien",
      userCreateName: "Tuấn Kiệt Ng",
      userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      date: "20/03/2021",
      hour: "14",
      minute: "20",
      description:
        "Fusce pulvinar turpis quis sem vestibulum, ullamcorper aliquam velit congue",
      type: "meeting",
      teamId: "",
    },
    {
      name: "Mauris consectetur bibendum efficitur",
      userCreateName: "Ngọc Huy",
      userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
      date: "29/07/2021",
      hour: "20",
      minute: "30",
      description: "Integer consectetur ipsum tincidunt laoreet aliquam.",
      type: "task",
      teamId: "",
    },
    {
      name: "Nullam tristique urna purus",
      userCreateName: "Ngọc Huy",
      userCreateAvatar: "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
      date: "08/03/2021",
      hour: "21",
      minute: "0",
      description:
        "Nunc nec nibh aliquam odio molestie consequat. Fusce nec arcu nec justo luctus egestas a ac ante",
      type: "normal",
      teamId: "",
    },
  ];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [showingIndex, setShowingIndex] = useState(null);

  function confirmDelete(res) {
    if (res) {
      //call api delete appointment { appointmentList[deletingIndex] } here
      console.log("detete");
    }
    setShowDeleteModal(false);
    setDeletingIndex(null); //xóa hoặc không xóa vẫn reset delete index về null
  }

  function onDeleteAppointmentItem(index) {
    setDeletingIndex(index); //lưu lại index của item đang được confirm xóa
    setShowDeleteModal(true);
  }

  function onCreateAppointment(newAppointment) {
    //call api create new appointment here
  }
  function onUpdateAppointment(updatedAppointment) {
    //call api update appointment here
  }

  return (
    <div className="appointment-page">
      <div className="appointment-page-header">
        <div
          className="create-appointment-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <AiOutlinePlus className="icon-plus" />
          Đặt lịch hẹn
        </div>
      </div>
      <CRow className="grid-view">
        {appointmentList.map((appointment, index) => {
          return (
            <AppointmentItem
              onDelete={onDeleteAppointmentItem}
              appointment={appointment}
              index={index}
              onShowDetail={() => {
                setShowingIndex(index);
                setShowDetailModal(true);
              }}
              onEdit={() => {
                setEditingIndex(index);
                setShowEditModal(true);
              }}
            />
          );
        })}
      </CRow>
      <DeleteConfirmModal onClose={confirmDelete} show={showDeleteModal} />
      <AppointmentDetailModal
        show={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setShowingIndex(null);
        }}
        appointment={
          showingIndex !== null ? appointmentList[showingIndex] : null
        }
      />
      <AppointmentCreateModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={onCreateAppointment}
      />
      <AppointmentEditModal
        appointment={appointmentList[editingIndex]}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={onUpdateAppointment}
      />
    </div>
  );
}

export default AppointmentPage;
