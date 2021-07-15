import React, { useEffect, useState } from "react";
import "./TeamStatistics.scss";
import Select, { components } from "react-select";
import { CButton, CButtonGroup, CCol } from "@coreui/react";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import teamApi from "src/api/teamApi";
import { useParams } from "react-router";
import statisticsApi from "src/api/statisticsApi";
import { saveAs } from "file-saver";

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div className="option-board-item">
        <div>{props.data.label}</div>
        <div className="divider"></div>
        <div>{props.data.tasksCount}</div>
      </div>
    </components.Option>
  );
};

const brandInfo = getStyle("info") || "#20a8d8";

function TeamStatistics(props) {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [progressTimeMode, setProgressTimeMode] = useState(1); //1:week, 2:month, 3:year
  const [contributeMode, setContributeMode] = useState(1); //1:number, 2:score
  const [listBoards, setListBoards] = useState([]);

  const [filterTeamObject, setFilterTeamObject] = useState(null);
  const [filterMembersObject, setFilterMembersObject] = useState(null);

  const [boardTaskDone, setBoardTaskDone] = useState([]);
  const [requestModels, setRequestModels] = useState([]);

  /*const defaultDatasets = (() => {
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
  })();*/
  /*const defaultOptions = (() => {
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
  })();*/

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

  const defaultOptionsBar = (() => {
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

  const onChangeSelectedBoard = (e) => {
    setSelectedBoard(e);
  };

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

  const modeContributeList = [
    {
      name: "Số lượng công việc",
      value: 1,
    },
    {
      name: "Tổng điểm công việc",
      value: 2,
    },
  ];

  const smallModeContributeList = [
    {
      name: "Số lượng",
      value: 1,
    },
    {
      name: "Tổng điểm",
      value: 2,
    },
  ];

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

  useEffect(() => {
    if (filterTeamObject) {
      console.log("team filter", filterTeamObject);
      const params = {
        ...filterTeamObject,
      };
      statisticsApi
        .getBoardTaskDone({
          params,
        })
        .then((res) => {
          setBoardTaskDone(res.data);
          const max = res.data.reduce(function (a, b) {
            return Math.max(a, b);
          });

          const maxValue = Math.ceil(max / 10) * 10;
          if (maxValue !== 0) {
            const optionsClone = { ...defaultOptions };
            optionsClone.scales.yAxes[0].ticks.stepSize = Math.ceil(
              maxValue / 5
            );
            optionsClone.scales.yAxes[0].ticks.max = maxValue;

            setDefaultOptions(optionsClone);
          }

          setDefaultDatasets([
            {
              label: "Công việc nhóm",
              backgroundColor: hexToRgba(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: brandInfo,
              borderWidth: 2,
              data: res.data,
            },
          ]);
        })
        .catch((err) => {});
    }
  }, [filterTeamObject]);

  useEffect(() => {
    if (filterMembersObject) {
      console.log("member filter", filterMembersObject);

      const params = {
        ...filterMembersObject,
      };
      statisticsApi
        .getUserTaskDoneAndPoint({ params })
        .then((res) => {
          setRequestModels(res.data);

          const lbls = [];
          const dataBar = [];
          const bgColor = [];
          const bdColor = [];
          res.data.forEach((ele) => {
            lbls.push(ele.userFullName);
            dataBar.push(contributeMode === 1 ? ele.taskDoneCount : ele.point);
            bgColor.push(hexToRgba(ele.colorCode, 10));
            bdColor.push(ele.colorCode);
          });

          setLabels(lbls);

          setBarDataSet([
            {
              label: contributeMode === 1 ? "Số công việc" : "Tổng điểm",
              backgroundColor: bgColor,
              data: dataBar,
              borderColor: bdColor,
              borderWidth: 1,
              barThickness: 30,
            },
          ]);
        })
        .catch((err) => {});
    }
  }, [filterMembersObject]);

  const { teamId } = useParams();
  useEffect(() => {
    teamApi
      .getBoardsByTeam(teamId)
      .then((res) => {
        const boards = res.data.map((x) => {
          return {
            value: x.kanbanBoardId,
            label: x.kanbanBoardName,
            tasksCount: x.tasksCount,
          };
        });

        setListBoards(boards);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      setFilterMembersObject({
        ...filterMembersObject,
        boardId: selectedBoard.value,
      });

      setFilterTeamObject({
        ...filterTeamObject,
        boardId: selectedBoard.value,
        filter: filterTeamObject ? filterTeamObject.filter : "week",
      });
    }
  }, [selectedBoard]);

  useEffect(() => {
    if (!selectedBoard) return;

    if (progressTimeMode) {
      setFilterTeamObject({
        ...filterTeamObject,
        filter:
          progressTimeMode === 1
            ? "week"
            : progressTimeMode === 2
            ? "month"
            : "year",
        boardId: selectedBoard.value,
      });
    }
  }, [progressTimeMode]);

  useEffect(() => {
    if (!selectedBoard) return;

    if (contributeMode) {
      setFilterMembersObject({
        ...filterMembersObject,
        boardId: selectedBoard.value,
        type: contributeMode === 1 ? "task" : "score",
      });
    }
  }, [contributeMode]);

  /*
    [
                  "#FF4016",
                  "#77D90C",
                  "#FF8918",
                  "#77D90C",
                  "#2EC6AC",
                  "#DB8739",
                  "#F6CB61",
                  "#EC2C7E",
                  "#05B6F7",
                  "#47DA64",
                  "#EF73A7",
                  "#55E4AD",
                  "#0EA6C3",
                  "blue",
                ]
  */
  //const [borderColor, setBorderClor] = useState([]);

  /*[
                  hexToRgba("#FF4016", 10),
                  hexToRgba("#77D90C", 10),
                  hexToRgba("#FF8918", 10),
                  hexToRgba("#77D90C", 10),
                  hexToRgba("#2EC6AC", 10),
                  hexToRgba("#DB8739", 10),
                  hexToRgba("#F6CB61", 10),
                  hexToRgba("#EC2C7E", 10),
                  hexToRgba("#05B6F7", 10),
                  hexToRgba("#47DA64", 10),
                  hexToRgba("#EF73A7", 10),
                  hexToRgba("#55E4AD", 10),
                  hexToRgba("#0EA6C3", 10),
                ] */

  //const [backgroundColor, setBackgroundColor] = useState([]);

  //const [barChartData, setBarChartData] = useState([]);

  const [labels, setLabels] = useState([]);

  /*[
              {
                label: contributeMode === 1 ? "Số công việc" : "Tổng điểm",
                backgroundColor: { backgroundColor },
                data: { barChartData },
                borderColor: { borderColor },
                borderWidth: 1,
                barThickness: 30,
              },
            ] */
  const [barDataSets, setBarDataSet] = useState([]);

  const exportBoardExcel = () => {
    console.log("click 1");
    /*statisticsApi
      .exportTeamDoneBoard({
        boardTaskDone: boardTaskDone,
      })
      .then((blob) => {
        saveAs(blob, "boardTaskDone.xlsx");
      })
      .catch((err) => {
        console.log(err);
      });
      */

    const canvasSave = document.getElementsByClassName(
      "chartjs-render-monitor"
    )[0];
    canvasSave.toBlob(function (blob) {
      let fdata = new FormData();
      fdata.append("image", blob);
      fdata.append("boardTaskDone", JSON.stringify(boardTaskDone));
      fdata.append("boardName", selectedBoard.label);
      //saveAs(blob, "testing.png");

      statisticsApi
        .exportTeamDoneBoard(fdata)
        .then((blob) => {
          saveAs(blob, "Tiến độ công việc nhóm.xlsx");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const exportGroupByUserExcel = () => {
    console.log("click 2");
    /*statisticsApi
      .exportTeamUserPointTask({
        requestModels: requestModels,
      })
      .then((blob) => {
        saveAs(blob, "pointandtaskgroupbyuser.xlsx");
      })
      .catch((err) => {
        console.log(err);
      });*/

    const canvasSave = document.getElementsByClassName(
      "chartjs-render-monitor"
    )[1];
    canvasSave.toBlob(function (blob) {
      //saveAs(blob, "testing.png");

      let fdata = new FormData();
      fdata.append("image", blob);
      fdata.append("requestModels", JSON.stringify(requestModels));
      fdata.append("boardName", selectedBoard.label);

      statisticsApi
        .exportTeamUserPointTask(fdata)
        .then((blob) => {
          saveAs(blob, "Thống kê đóng góp thành viên.xlsx");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <div className=" team-statistics-container">
      <div className="header-label">Thống kê công việc nhóm</div>
      <div className="board-select-group">
        {/* <div className="label">Chọn Bảng công việc</div> */}
        <CCol lg="6" sm="12" className="col-select">
          <Select
            value={selectedBoard}
            closeMenuOnSelect={true}
            components={{ Option: Option }}
            placeholder="Chọn bảng công việc..."
            options={listBoards}
            onInputChange={() => {}}
            onChange={onChangeSelectedBoard}
          />
        </CCol>
      </div>
      {selectedBoard && (
        <div className="chart-progress-container">
          <div className="chart-header">
            <div className="chart-name">Tiến độ công việc nhóm</div>
            <div className="chart-btn-group">
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
              <div className="export-btn" onClick={exportBoardExcel}>
                Xuất Excel
                <CIcon name="cil-share-boxed" />
              </div>
            </div>
          </div>
          <CChartLine
            datasets={defaultDatasets}
            labels={getProgressChartLabels()}
            options={defaultOptions}
            style={{ height: "350px", marginTop: "10px" }}
          />
        </div>
      )}
      {selectedBoard && (
        <div className="chart-contribute-container">
          <div className="chart-header">
            <div className="chart-name">Đóng góp của thành viên</div>
            <div className="chart-btn-group">
              <div className="timeline-mode">
                <CButtonGroup className="float-right normal-group mr-3">
                  {modeContributeList.map((item) => (
                    <CButton
                      color="outline-secondary"
                      key={item.value}
                      className="mx-0"
                      onClick={() => setContributeMode(item.value)}
                      active={item.value === contributeMode}
                    >
                      {item.name}
                    </CButton>
                  ))}
                </CButtonGroup>
                <CButtonGroup className="float-right small-group mr-3">
                  {smallModeContributeList.map((item) => (
                    <CButton
                      color="outline-secondary"
                      key={item.value}
                      className="mx-0"
                      onClick={() => setContributeMode(item.value)}
                      active={item.value === contributeMode}
                    >
                      {item.name}
                    </CButton>
                  ))}
                </CButtonGroup>
              </div>
              <div className="export-btn" onClick={exportGroupByUserExcel}>
                Xuất Excel
                <CIcon name="cil-share-boxed" />
              </div>
            </div>
          </div>
          <CChartBar
            datasets={barDataSets}
            labels={labels}
            options={defaultOptionsBar}
            style={{ height: "350px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default TeamStatistics;
