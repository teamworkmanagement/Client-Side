import React from "react";
import "./UserProfilePage.scss";
import { CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CChartLine } from "@coreui/react-chartjs";

function UserProfilePage(props) {
  const recentTasks = [
    {
      taskName: "Fix dasboard layout",
      taskStatus: "todo",
    },
    {
      taskName: "Viết Test plan cho App",
      taskStatus: "doing",
    },
    {
      taskName: "API Chạy chậm trên Chrome",
      taskStatus: "doing",
    },
    {
      taskName: "Điền thông tin form",
      taskStatus: "done",
    },
    {
      taskName: "Update phiên bản mới nhất packages",
      taskStatus: "todo",
    },
    {
      taskName: "Phân quyền cho nhóm",
      taskStatus: "todo",
    },
    {
      taskName: "Fix dasboard layout",
      taskStatus: "todo",
    },
  ];

  function getLimitRecentTasks() {
    if (recentTasks.length <= 5) {
      return recentTasks;
    }
    return recentTasks.slice(0, 5);
  }

  function getStatusText(status) {
    switch (status) {
      case "todo":
        return "Đang chờ";
      case "doing":
        return "Đang thực hiện";
      default:
        return "Hoàn thành";
    }
  }
  function getStatusBackgroundColor(status) {
    switch (status) {
      case "todo":
        return "#FFEFF0";
      case "doing":
        return "#FCF0E4";
      default:
        return "#E5F0E8";
    }
  }
  function getStatusColor(status) {
    switch (status) {
      case "todo":
        return "#E52732";
      case "doing":
        return "#D86903";
      default:
        return "#0BA53D";
    }
  }

  return (
    <div className="user-profile-container">
      <CRow>
        <CCol md="sm" lg="6" className="user-infor-col">
          <CRow>
            <CCol className="col first-col" xs="12" md="6">
              <div className="overview-infor user-panel">
                <div className="user-avatar">
                  <img
                    alt=""
                    src="https://emilus.themenate.net/img/avatars/thumb-2.jpg"
                  />
                </div>
                <div className="infor">
                  <div className="user-fullname">Nguyễn Dũng</div>
                  <div className="user-email">dungnguyen@gmail.com</div>
                  <div className="user-social-group">
                    <CIcon name="cib-github" className="first" />
                    <CIcon name="cib-facebook" />
                  </div>
                </div>
              </div>
              <div className="detail-infor user-panel">
                <div className="label">Mô tả</div>
                <div className="user-description">
                  Siên viên đại học UIT, đã là thực tập sinh tại ELCA và đang
                  tham gia chương trình Momo Talents
                </div>
                <div className="user-phone infor-group">
                  <CIcon name="cil-screen-smartphone" />
                  0377337652
                </div>
                <div className="user-address infor-group">
                  <CIcon name="cil-house" className="house" />
                  Số 23/123 đường Phạm Văn Đồng, Thủ Đức
                </div>
                <div className="user-gender infor-group">
                  <img alt="" src="../images/gender.png" />
                  Nam
                </div>
              </div>
            </CCol>
            <CCol className="col" xs="12" md="6">
              <div className="user-panel recent-tasks">
                <div className="label">Công việc gần đây</div>
                <div className="list-tasks">
                  {getLimitRecentTasks().map((task, index) => {
                    return (
                      <div className="recent-task-item">
                        <div className="task-name">{task.taskName}</div>
                        <div
                          className="task-status"
                          style={{
                            backgroundColor: getStatusBackgroundColor(
                              task.taskStatus
                            ),
                            color: getStatusColor(task.taskStatus),
                          }}
                        >
                          {getStatusText(task.taskStatus)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CCol>
          </CRow>
        </CCol>
        <CCol md="sm" lg="6" className="user-tasks-col col">
          <div className="user-panel user-tasks">
            <div className="label">Công việc được giao</div>
            <div className="time">Từ ngày 20/02/2020 đến 31/03/2021</div>
            <div className="count-groups">
              <div className="group-item todo-group">
                <div className="group-name">Đang chờ</div>
                <div className="group-count">12</div>
                <div className="group-icon">
                  <div className="icon-container">
                    <CIcon name="cil-list-rich" />
                  </div>
                </div>
              </div>
              <div className="group-item doing-group">
                <div className="group-name">Đang làm</div>
                <div className="group-count">3</div>
                <div className="group-icon">
                  <div className="icon-container">
                    <CIcon name="cil-pen" />
                  </div>
                </div>
              </div>
              <div className="group-item done-group">
                <div className="group-name">Hoàn thành</div>
                <div className="group-count">10</div>
                <div className="group-icon">
                  <div className="icon-container">
                    <CIcon name="cil-check-circle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="user-panel user-task-analysis">
            <div className="label">Tiến độ thực hiện</div>
            <CChartLine
              datasets={[
                {
                  label: "Công việc hoàn thành",
                  backgroundColor: "#E5F0E8",
                  borderColor: "#0BA53D",
                  borderWidth: 1,
                  data: [3, 11, 4, 5, 3, 9],
                },
              ]}
              options={{
                tooltips: {
                  enabled: true,
                },
              }}
              labels={[
                "12/2020",
                "01/2021",
                "02/2021",
                "03/2021",
                "04/2021",
                "05/2021",
              ]}
            />
          </div>
        </CCol>
      </CRow>
    </div>
  );
}

export default UserProfilePage;
