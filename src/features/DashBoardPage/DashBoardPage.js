import React, { useEffect, useRef, useState } from "react";
import "./DashBoardPage.scss";
import { CRow, CCol, CButton, CButtonGroup } from "@coreui/react";
import { GiSandsOfTime, GiAlarmClock } from "react-icons/gi";
import CIcon from "@coreui/icons-react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import AvatarList from "src/shared_components/MySharedComponents/AvatarList/AvatarList";
import teamApi from "src/api/teamApi";
import statisticsApi from "src/api/statisticsApi";
import { saveAs } from "file-saver";
import CountTaskModal from "./Components/CountTaskModal/CountTaskModal.js";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

function DashBoardPage(props) {
  const [progressTimeMode, setProgressTimeMode] = useState(1); //1:week, 2:month, 3:year
  const [teams, setTeams] = useState([]);
  const history = useHistory();
  const user = useSelector((state) => state.auth.currentUser);
  const [filter, setFilter] = useState("week");
  const chartref = useRef(null);
  const [userStatistics, setUserStatistics] = useState([]);
  const [teamStatistics, setTeamStatistics] = useState([]);
  const [showCountTaskModal, setShowCountTaskModal] = useState(false);

  //0: cá nhân-đang chờ, 1: cá nhân-sắp tới hạn, 2: nhóm-đang chờ, 3: nhóm-sắp tới hạn
  const [countModalType, setCountModalType] = useState(0);

  function closeCountTaskModal() {
    setShowCountTaskModal(false);
  }

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

  const [defaultDatasets, setDefaultDatasets] = useState([]);

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
    history.push(`/team/${teamId}?tab=teaminfo`);
  };

  useEffect(() => {
    teamApi
      .getAllTeamByUser(user.id)
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => {});
  }, []);

  const changeMode = (value) => {
    setProgressTimeMode(value);
    if (value === 1) setFilter("week");
    if (value === 2) setFilter("month");
    if (value === 3) setFilter("year");
  };

  useEffect(() => {
    async function getStatistics() {
      console.log(filter);
      const params = {
        userId: user.id,
        filter,
      };

      const res1 = await statisticsApi.getPersonalTaskDone({ params });
      const res2 = await statisticsApi.getUserTaskDoneBoards({ params });

      setUserStatistics(res1.data);
      setTeamStatistics(res2.data);

      const max1 = res1.data.reduce(function (a, b) {
        return Math.max(a, b);
      });
      const max2 = res2.data.reduce(function (a, b) {
        return Math.max(a, b);
      });

      const max = Math.max(max1, max2);
      const maxValue = Math.ceil(max / 10) * 10;

      console.log(maxValue);

      const optionsClone = { ...defaultOptions };
      optionsClone.scales.yAxes[0].ticks.stepSize = Math.ceil(maxValue / 5);
      optionsClone.scales.yAxes[0].ticks.max = maxValue;
      setDefaultOptions(optionsClone);

      setDefaultDatasets([
        {
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
        },
      ]);
    }

    getStatistics();
  }, [filter]);

  useEffect(() => {
    console.log(defaultDatasets);
  }, [defaultDatasets]);

  const exportExcel = () => {
    //console.log("export");

    const canvasSave = document.getElementsByClassName(
      "chartjs-render-monitor"
    )[0];
    canvasSave.toBlob(function (blob) {
      //saveAs(blob, "testing.png");

      let fdata = new FormData();
      fdata.append("image", blob);
      fdata.append("userStatis", JSON.stringify(userStatistics));
      fdata.append("teamStatis", JSON.stringify(teamStatistics));

      statisticsApi
        .exportPersonalAndTeamStat(fdata)
        .then((blob) => {
          saveAs(blob, "abc.xlsx");
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return;
    /*axiosClient.get('https://localhost:9001/api/test/export-excel')
      .then(res => new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }))
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.click();
        //window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.log(err)
      })*/

    //eslint-disable-next-line
    statisticsApi
      .exportPersonalAndTeamStat({
        userStatis: userStatistics,
        teamStatis: teamStatistics,
      })
      .then((blob) => {
        saveAs(blob, "abc.xlsx");
        /*const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.click();
        window.URL.revokeObjectURL(url);*/
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [countObject, setCountObject] = useState([]);
  useEffect(() => {
    statisticsApi
      .getTasksStatusCount()
      .then((res) => {
        setCountObject(res.data);
      })
      .catch((err) => {});
  }, []);

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
                  <div className="count">{countObject[0]} công việc</div>
                  <div
                    className="view-btn"
                    onClick={() => {
                      setCountModalType(0);
                      setShowCountTaskModal(true);
                    }}
                  >
                    Xem tất cả
                  </div>
                </div>
              </CCol>

              <CCol className="inner-col" xs="12" sm="6" lg="6">
                <div className="counting-card user-card deadline-card">
                  <div className="image-icon">
                    <GiAlarmClock className="icon" />
                  </div>
                  <div className="title">Sắp tới hạn</div>
                  <div className="count">{countObject[1]} công việc</div>
                  <div
                    className="view-btn"
                    onClick={() => {
                      setCountModalType(1);
                      setShowCountTaskModal(true);
                    }}
                  >
                    Xem tất cả
                  </div>
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
                  <div className="count">{countObject[2]} công việc</div>
                  <div
                    className="view-btn"
                    onClick={() => {
                      setCountModalType(2);
                      setShowCountTaskModal(true);
                    }}
                  >
                    Xem tất cả
                  </div>
                </div>
              </CCol>

              <CCol className="inner-col" xs="12" sm="6" lg="6">
                <div className="counting-card team-card deadline-card">
                  <div className="image-icon">
                    <GiAlarmClock className="icon" />
                  </div>
                  <div className="title">Sắp tới hạn</div>
                  <div className="count">{countObject[3]} công việc</div>
                  <div
                    className="view-btn"
                    onClick={() => {
                      setCountModalType(3);
                      setShowCountTaskModal(true);
                    }}
                  >
                    Xem tất cả
                  </div>
                </div>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>
      <div className="chart-progress-container">
        <div className="chart-header">
          <div className="chart-name">Tiến độ công việc</div>
          <div className="chart-btn-group">
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
            <div className="export-btn" onClick={exportExcel}>
              Xuất Excel
              <CIcon name="cil-share-boxed" />
            </div>
          </div>
        </div>
        <CChartLine
          id="stackD"
          ref={chartref}
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
                          alt="avatar"
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
                    <td className="text-center">
                      <AvatarList teams={teams} teamId={team.teamId} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <CountTaskModal
        type={countModalType}
        onClose={closeCountTaskModal}
        show={showCountTaskModal}
      />
    </div>
  );
}

export default DashBoardPage;
