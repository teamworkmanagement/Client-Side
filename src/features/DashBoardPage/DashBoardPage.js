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

import { unwrapResult } from "@reduxjs/toolkit";
import AvatarList from "src/shared_components/MySharedComponents/AvatarList/AvatarList";
import teamApi from "src/api/teamApi";
import statisticsApi from "src/api/statisticsApi";
DashBoardPage.propTypes = {};

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";

function DashBoardPage(props) {
  const [progressTimeMode, setProgressTimeMode] = useState(1); //1:week, 2:month, 3:year
  const [teams, setTeams] = useState([]);
  const members = useSelector((state) => state.app.users);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const [loadone, setLoadone] = useState(false);
  const [filter, setFilter] = useState('week');
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

  const [defaultDatasets, setDefaultDatasets] = useState([

  ]);

  const [defaultOptions, setDefaultOptions] = useState({
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
            maxTicksLimit: 10,
            stepSize: Math.ceil(50 / 10),
            max: 50,
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
  });

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
    teamApi.getAllTeamByUser(user.id)
      .then(res => {
        setTeams(res.data);
      }).catch(err => {

      })
  }, [])


  const changeMode = (value) => {
    setProgressTimeMode(value);
    if (value == 1)
      setFilter('week');
    if (value == 2)
      setFilter('month');
    if (value == 3)
      setFilter('year');
  }

  useEffect(() => {
    async function getStatistics() {
      console.log(filter);
      const params = {
        userId: user.id,
        filter,
      }
      const data1 = [];
      const data2 = [];

      const res1 = await statisticsApi.getPersonalTaskDone({ params });
      const res2 = await statisticsApi.getUserTaskDoneBoards({ params });

      const max1 = res1.data.reduce(function (a, b) {
        return Math.max(a, b);
      });
      const max2 = res2.data.reduce(function (a, b) {
        return Math.max(a, b);
      });

      const max = Math.max(max1, max2);
      const maxValue = Math.ceil(max / 10) * 10;

      console.log(maxValue)

      const optionsClone = { ...defaultOptions };
      optionsClone.scales.yAxes[0].ticks.stepSize = Math.ceil(maxValue / 5);
      optionsClone.scales.yAxes[0].ticks.max = maxValue;
      setDefaultOptions(optionsClone);

      setDefaultDatasets([{
        label: "Công việc cá nhân",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: res1.data,
      },
      {
        label: "Công việc nhóm",
        backgroundColor: hexToRgba(brandSuccess, 20),
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: res2.data,
      }]);
    }

    getStatistics();
  }, [filter])

  useEffect(() => {
    console.log(defaultDatasets);
  }, [defaultDatasets])

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
                  onClick={() => changeMode(item.value)}
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
