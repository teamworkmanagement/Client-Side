import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Breadcrumbs.scss";
import { useHistory } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { RiHome3Line } from "react-icons/ri";

Breadcrumbs.propTypes = {};

function Breadcrumbs(props) {
  const history = useHistory();
  const [currentBreadcrumbs, setCurrentBreadcrumbs] = useState([]);
  const availableBreadcrumbs = [
    {
      path: "/dashboard",
      name: "Trang chủ",
    },
    {
      path: "/newsfeed",
      name: "Bản tin",
    },

    {
      path: "/chat",
      name: "Tin nhắn",
    },
    {
      path: "/myfiles",
      name: "Tài liệu của tôi",
    },
    {
      path: "/teams",
      name: "Danh sách nhóm",
    },
    {
      path: "/managetask/mytasks",
      name: "Quản lý công việc cá nhân",
    },
    {
      path: "/managetask/teamtasks",
      name: "Quản lý công việc nhóm",
    },
    {
      path: "/myaccount",
      name: "Cài đặt",
    },
    {
      path: "/feedbacks",
      name: "Đóng góp cho ứng dụng",
    },
  ];

  function getBreadcrumbByName(path) {
    for (let i = 0; i < availableBreadcrumbs.length; i++) {
      if (path === availableBreadcrumbs[i].path) {
        return availableBreadcrumbs[i];
      }
    }
  }

  useEffect(() => {
    console.log(history.location);
    const pathname = history.location.pathname;
    const pathParts = pathname.split("/");
    console.log(pathParts);
    const search = history.location.search;
    const currents = [];
    currents.push(getBreadcrumbByName("/dashboard"));
    switch (pathParts[1]) {
      case "dashboard":
        break;
      case "newsfeed":
        if (search === "") {
          currents.push(getBreadcrumbByName("/newsfeed"));
        } else {
          currents.push({
            path: "",
            name: "Bài viết",
          });
        }
        break;
      case "teams":
        currents.push(getBreadcrumbByName("/teams"));
        break;

      case "chat":
        currents.push(getBreadcrumbByName("/chat"));
        break;
      case "myfiles":
        currents.push(getBreadcrumbByName("/myfiles"));
        break;
      case "team":
        currents.push(getBreadcrumbByName("/teams"));
        currents.push({
          name: "Nhóm",
          path: "",
        });
        break;
      case "managetask":
        if (pathParts[2] === "mytasks") {
          currents.push(getBreadcrumbByName("/managetask/mytasks"));
        } else {
          currents.push(getBreadcrumbByName("/managetask/teamtasks"));
        }

        break;
      case "myaccount":
        currents.push(getBreadcrumbByName("/myaccount"));
        break;
      case "feedbacks":
        currents.push(getBreadcrumbByName("/feedbacks"));
        break;
      default:
        break;
    }
    setCurrentBreadcrumbs(currents);
  }, [history.location]);

  function routeTo(index) {
    history.push({
      pathname: currentBreadcrumbs[index].path,
    });
  }

  return (
    <div className="breadcrumbs-container">
      {currentBreadcrumbs.map((item, index) => {
        return (
          <div className="breadcrumb-item">
            <div
              className="breadcrumb-content"
              onClick={() => {
                if (item.path !== "") {
                  routeTo(index);
                }
              }}
            >
              {item.name === "Trang chủ" && (
                <RiHome3Line className="home-icon" />
              )}
              {item.name}
            </div>
            <FaChevronRight className="arrow-icon" />
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
