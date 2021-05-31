import React, { useState } from "react";
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
DashBoardPage.propTypes = {};

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";

function DashBoardPage(props) {
  const [progressTimeMode, setProgressTimeMode] = useState(1); //1:week, 2:month, 3:year
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

      <WidgetsBrand withCharts />

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Traffic {" & "} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="info">
                        <small className="text-muted">New Clients</small>
                        <br />
                        <strong className="h4">9,123</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="danger">
                        <small className="text-muted">Recurring Clients</small>
                        <br />
                        <strong className="h4">22,643</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Monday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="34"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="78"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Tuesday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="56"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="94"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Wednesday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="12"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="67"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Thursday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="43"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="91"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Friday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="22"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="73"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Saturday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="53"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="82"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Sunday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="9"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="69"
                      />
                    </div>
                  </div>
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1">
                        <CBadge shape="pill" color="info">
                          &nbsp;
                        </CBadge>
                      </sup>
                      New clients &nbsp;
                      <sup className="px-1">
                        <CBadge shape="pill" color="danger">
                          &nbsp;
                        </CBadge>
                      </sup>
                      Recurring clients
                    </small>
                  </div>
                </CCol>

                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small className="text-muted">Pageviews</small>
                        <br />
                        <strong className="h4">78,623</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="success">
                        <small className="text-muted">Organic</small>
                        <br />
                        <strong className="h4">49,123</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">Male</span>
                      <span className="ml-auto font-weight-bold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="43"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon
                        className="progress-group-icon"
                        name="cil-user-female"
                      />
                      <span className="title">Female</span>
                      <span className="ml-auto font-weight-bold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="37"
                      />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        className="progress-group-icon"
                        name="cil-globe-alt"
                      />
                      <span className="title">Organic Search</span>
                      <span className="ml-auto font-weight-bold">
                        191,235 <span className="text-muted small">(56%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="56"
                      />
                    </div>
                  </div>

                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        name="cib-facebook"
                        className="progress-group-icon"
                      />
                      <span className="title">Facebook</span>
                      <span className="ml-auto font-weight-bold">
                        51,223 <span className="text-muted small">(15%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="15"
                      />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        name="cib-twitter"
                        className="progress-group-icon"
                      />
                      <span className="title">Twitter</span>
                      <span className="ml-auto font-weight-bold">
                        37,564 <span className="text-muted small">(11%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="11"
                      />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        name="cib-linkedin"
                        className="progress-group-icon"
                      />
                      <span className="title">LinkedIn</span>
                      <span className="ml-auto font-weight-bold">
                        27,319 <span className="text-muted small">(8%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="8"
                      />
                    </div>
                  </div>
                  <div className="divider text-center">
                    <CButton color="link" size="sm" className="text-muted">
                      <CIcon name="cil-options" />
                    </CButton>
                  </div>
                </CCol>
              </CRow>

              <br />

              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">
                      <CIcon name="cil-people" />
                    </th>
                    <th>User</th>
                    <th className="text-center">Country</th>
                    <th>Usage</th>
                    <th className="text-center">Payment Method</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/1.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Yiorgos Avraamu</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-us" title="us" id="us" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
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
                      <CIcon height={25} name="cib-cc-mastercard" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>10 sec ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/2.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Avram Tarasios</div>
                      <div className="small text-muted">
                        <span>Recurring</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-br" title="br" id="br" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>10%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="10"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-visa" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>5 minutes ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/3.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-warning"></span>
                      </div>
                    </td>
                    <td>
                      <div>Quintin Ed</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-in" title="in" id="in" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>74%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="74"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-stripe" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>1 hour ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/4.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-secondary"></span>
                      </div>
                    </td>
                    <td>
                      <div>Enéas Kwadwo</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-fr" title="fr" id="fr" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>98%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="98"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-paypal" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last month</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/5.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Agapetus Tadeáš</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-es" title="es" id="es" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>22%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="22"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-google-pay" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last week</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/6.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Friderik Dávid</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-pl" title="pl" id="pl" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>43%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="43"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-amex" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Yesterday</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default DashBoardPage;
