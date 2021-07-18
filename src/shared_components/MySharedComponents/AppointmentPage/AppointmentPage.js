import React from "react";
import "./AppointmentPage.scss";

function AppointmentPage(props) {
  const appointmentType = ["meeting", "chat", "task", "news"];

  const appointmentList = [
    {
      name: "Lorem ipsum dolor sit amet",
      userCreateName: "Khoa Nguyễn",
      userCreateAvatar: "",
      date: "18/07/2021",
      hour: "12",
      minute: "24",
      description:
        "Quisque volutpat diam tellus, sed pharetra odio mollis in. Integer bibendum sit amet massa nec vulputate. Phasellus et aliquam massa, nec dapibus nisl",
      type: "meeting",
    },
  ];
  return <div className="appointment-page"></div>;
}

export default AppointmentPage;
