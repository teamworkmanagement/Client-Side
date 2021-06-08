import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./DashBoardPage.scss";
import {
  CRow,
  CCol,
  CCard,
  CWidgetDropdown,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCardBody,
  CButton,
  CButtonGroup,
  CCardFooter,
  CProgress,
  CCardHeader,
  CCallout,
  CBadge,
} from "@coreui/react";
import { GiSandsOfTime, GiPencilRuler, GiAlarmClock } from "react-icons/gi";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "src/shared_components/views/charts/ChartLineSimple";
import ChartBarSimple from "src/shared_components/views/charts/ChartBarSimple";
import MainChartExample from "src/shared_components/views/charts/MainChartExample";
import WidgetsBrand from "src/shared_components/views/widgets/WidgetsBrand";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getTeamByUserId } from "../ListTeamPage/teamSlice.js";
import { unwrapResult } from "@reduxjs/toolkit";
import AvatarList from "src/shared_components/MySharedComponents/AvatarList/AvatarList";
DashBoardPage.propTypes = {};

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";

function DashBoardPage(props) {
  const [progressTimeMode, setProgressTimeMode] = useState(1); //1:week, 2:month, 3:year
  const teams = useSelector((state) => state.team.teams);
  const members = useSelector((state) => state.app.users);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const [loadone, setLoadone] = useState(false);
  const myPosts = [
    {
      content:
        "Ngày 26/05 Việt Nam đã có thêm 15 ca mắc bệnh, hiện nay các bệnh viện đang rất đông.",
      groupName: "Báo thanh niên",
      groupImage:
        "https://tse3.mm.bing.net/th?id=OIP.MBeaaevjEVQjyE93pTQY4gHaHa&pid=Api&P=0&w=300&h=300",
      commentCount: 5,
      loveCount: 0,
    },
    {
      content:
        "Hôm nay sẽ có seminar môn giao tiếp người máy, các nhóm chuẩn bị đầy đủ slide thuyết trình",
      groupName: "Giao tiếp người máy",
      groupImage:
        "https://tse2.mm.bing.net/th?id=OIP.uRrU36votkTU0oKOx9GIDQHaHa&pid=Api&P=0&w=300&h=300",
      commentCount: 0,
      loveCount: 1,
    },
    {
      content: "Thầy Hoan thông báo chiều nay nghỉ, ai đi học thì nhớ về nhà.",
      groupName: "Giao tiếp người máy",
      groupImage:
        "https://tse2.mm.bing.net/th?id=OIP.uRrU36votkTU0oKOx9GIDQHaHa&pid=Api&P=0&w=300&h=300",
      commentCount: 3,
      loveCount: 2,
    },
    {
      content:
        "Khoa phần mềm thông báo khẩn: khóa luận sẽ nộp sớm và báo cáo sớm do tình hình dịch covid-19.",
      groupName: "SE UIT",
      groupImage: "http://se.uit.edu.vn/templates/mimety/images/logo.png",
      commentCount: 5,
      loveCount: 0,
    },
    {
      content:
        "Những sinh viên không làm cccd và không bầu cử sẽ bị trừ đrl ở học kỳ 2.",
      groupName: "UIT K12",
      groupImage:
        "https://scontent-xsp1-3.xx.fbcdn.net/v/t1.6435-9/s960x960/153095261_3707730942652752_5902696253193716869_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=825194&_nc_ohc=-Kiu577rPhwAX8fwpdb&_nc_ht=scontent-xsp1-3.xx&tp=7&oh=d88b0b99586fc0467d47c450f74de02b&oe=60D5FF4E",
      commentCount: 5,
      loveCount: 0,
    },
  ];
  const currentChats = [];
  const modeProgressList = [
    {
      name: "Tuần",
      value: 1,
    },
    {
      name: "Tháng",
      value: 2,
    },
    {
      name: "Năm",
      value: 3,
    },
  ];
  const defaultDatasets = (() => {
    let elements = 7;
    switch (progressTimeMode) {
      case 2:
        elements = 30;
        break;
      default:
        elements = 12;
    }
    const data1 = [];
    const data2 = [];
    const data3 = [];
    for (let i = 0; i <= elements; i++) {
      data1.push(random(50, 200));
      data2.push(random(80, 100));
      data3.push(random(20, 90));
    }
    return [
      {
        label: "Fix dashboard layout",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1,
      },
      {
        label: "Phân quyền leader nhóm",
        backgroundColor: hexToRgba(brandSuccess, 20),
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: data2,
      },
      {
        label: "Điền form khảo sát",
        backgroundColor: hexToRgba(brandDanger, 10),
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5],
        data: data3,
      },
    ];
  })();
  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: true,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 250,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  function getProgressChartLabels() {
    const labels = [];
    var length = 7;
    if (progressTimeMode === 2) {
      length = 30;
    }
    if (progressTimeMode === 3) {
      length = 12;
    }
    for (let i = 1; i <= length; i++) {
      if (length === 7) {
        labels.push("0" + i);
      } else {
        labels.push(i);
      }
    }
    return labels;
  }
  const navigateToTeam = (teamId) => {
    history.push(`/team/${teamId}`);
  };

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      dispatch(getTeamByUserId(user.id))
        .then(unwrapResult)
        .then((res) => {
          setLoadone(true);
        })
        .catch((err) => {
          setLoadone(true);
        });

      setIsLoading(false);
    }

    loadData();
  }, []);
  console.log(teams);

  return (
    <div className="dash-board-container">
      <CRow className="counting-group">
        <CCol className="counting-group-col" sm="12" lg="6">
          <div className="panel">
            <div className="panel-title">Công việc cá nhân</div>
            <CRow>
              <CCol className="inner-col" xs="12" sm="6" lg="6">
                <div className="counting-card user-card todo-card">
                  <div className="image-icon">
                    <GiSandsOfTime className="icon" />
                  </div>
                  <div className="title">Đang chờ</div>
                  <div className="count">15 công việc</div>
                  <div className="view-btn">Xem tất cả</div>
                </div>
              </CCol>

              <CCol className="inner-col" xs="12" sm="6" lg="6">
                <div className="counting-card user-card deadline-card">
                  <div className="image-icon">
                    <GiAlarmClock className="icon" />
                  </div>
                  <div className="title">Sắp tới hạn</div>
                  <div className="count">2 công việc</div>
                  <div className="view-btn">Xem tất cả</div>
                </div>
              </CCol>
            </CRow>
          </div>
        </CCol>
        <CCol className="counting-group-col" sm="12" lg="6">
          <div className="panel">
            <div className="panel-title">Công việc nhóm</div>
            <CRow>
              <CCol className="inner-col" xs="12" sm="6" lg="6">
                <div className="counting-card team-card todo-card">
                  <div className="image-icon">
                    <GiSandsOfTime className="icon" />
                  </div>
                  <div className="title">Đang chờ</div>
                  <div className="count">15 công việc</div>
                  <div className="view-btn">Xem tất cả</div>
                </div>
              </CCol>

              <CCol className="inner-col" xs="12" sm="6" lg="6">
                <div className="counting-card team-card deadline-card">
                  <div className="image-icon">
                    <GiAlarmClock className="icon" />
                  </div>
                  <div className="title">Sắp tới hạn</div>
                  <div className="count">2 công việc</div>
                  <div className="view-btn">Xem tất cả</div>
                </div>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>
      <div className="chart-progress-container">
        <div className="chart-header">
          <div className="chart-name">Tiến độ công việc</div>
          <div className="timeline-mode">
            <CButtonGroup className="float-right mr-3">
              {modeProgressList.map((item) => (
                <CButton
                  color="outline-secondary"
                  key={item.value}
                  className="mx-0"
                  onClick={() => setProgressTimeMode(item.value)}
                  active={item.value === progressTimeMode}
                >
                  {item.name}
                </CButton>
              ))}
            </CButtonGroup>
          </div>
          <div className="export-btn">
            Xuất Excel
            <CIcon name="cil-share-boxed" />
          </div>
        </div>
        <CChartLine
          datasets={defaultDatasets}
          labels={getProgressChartLabels()}
          options={defaultOptions}
          style={{ height: "350px", marginTop: "10px" }}
        />
      </div>
      <div className="table-view-container">
        <div className="table-content">
          <table className="table table-hover  mb-0 d-none d-sm-table">
            <thead className="thead-light">
              <tr>
                <th className="text-center">
                  <CIcon name="cil-people" />
                </th>
                <th>Tên nhóm</th>
                <th>Trưởng nhóm</th>

                <th>Tiến độ</th>
                <th className="text-center">Thành viên</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => {
                return (
                  <tr
                    onClick={() => navigateToTeam(team.teamId)}
                    style={{ animationDelay: `${index / 20}s` }}
                  >
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={team.teamImageUrl}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                      </div>
                    </td>
                    <td>
                      <div>{team.teamName}</div>
                      <div className="small text-muted">
                        {team.teamDescription}
                      </div>
                    </td>
                    <td>
                      <div className="leader-cell">
                        <img
                          className="team-leader-avatar"
                          alt=""
                          src={team.teamLeaderImageUrl}
                        />
                        <div className="">{team.teamLeaderName}</div>
                      </div>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            11/01/2021 - 20/04/2021
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="50"
                      />
                    </td>
                    <td className="text-center">
                      <AvatarList users={members} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashBoardPage;
