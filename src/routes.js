//eslint-disable-next-line
import React from "react";
import DashBoardPage from "./features/DashBoardPage/DashBoardPage";
import ChatPage from "./features/ChatPage/ChatPage";
import TeamPage from "./features/TeamPage/TeamPage";
import NewsFeedPage from "./features/NewsFeedPage/NewsFeedPage";
import MyToaster from "./features/ToastTest/ToastTest";
import ListTeamPage from "./features/ListTeamPage/ListTeamPage";
import UserProfilePage from "./shared_components/MySharedComponents/UserProfilePage/UserProfilePage";
import MyFilesPage from "./features/MyFilesPage/MyFilesPage";
import ManageMyTasksPage from "./features/ManageMyTasksPage/ManageMyTasksPage";
import ManageTeamTasksPage from "./features/ManageTeamTasksPage/ManageTeamTasksPage";
import AccountSettingsPage from "./features/AccountSettingsPage/AccountSettingsPage";
import NotFoundPage from "./shared_components/MySharedComponents/NotFoundPage/NotFoundPage";
import NoInternetPage from "./shared_components/MySharedComponents/NoInternetPage/NoInternetPage";
import FeedbackPage from "./features/FeedbackPage/FeedbackPage";
import SearchResultsPage from "./features/SearchResultsPage/SearchResultsPage.js";

const routes = [
  { path: "/notfound", name: "Không tồn tại", component: NotFoundPage },
  { path: "/search", name: "Tìm kiếm", component: SearchResultsPage },
  { path: "/testtoaster", name: "Test Toaster", component: MyToaster },
  {
    path: "/connectionerror",
    name: "Không có kết nối mạng",
    component: NoInternetPage,
  },
  { path: "/dashboard", name: "Tổng quan", component: DashBoardPage },
  { path: "/newsfeed", name: "Bản tin", component: NewsFeedPage, exact: true },
  { path: "/chat", name: "Tin nhắn", component: ChatPage, exact: true },
  {
    path: "/teams",
    name: "Danh sách nhóm",
    component: ListTeamPage,
    exact: true,
  },
  {
    path: "/team/:teamId",
    name: "Nhóm",
    component: TeamPage,
    exact: true,
  },
  {
    path: "/managetask/mytasks",
    name: "Công việc của tôi",
    component: ManageMyTasksPage,
    exact: true,
  },
  {
    path: "/managetask/teamtasks",
    name: "Công việc trong nhóm được giao",
    component: ManageTeamTasksPage,
    exact: true,
  },
  {
    path: "/myfiles",
    name: "Tệp của tôi",
    component: MyFilesPage,
    exact: true,
  },
  {
    path: "/userprofile",
    name: "Thông tin",
    component: UserProfilePage,
    exact: true,
  },
  {
    path: "/myaccount",
    name: "Tài khoản",
    component: AccountSettingsPage,
    exact: true,
  },
  {
    path: "/feedbacks",
    name: "Góp ý cải thiện ứng dụng",
    component: FeedbackPage,
    exact: true,
  },
  {
    path: "/test",
    name: "test",
    component: MyToaster,
    exact: true,
  },
];

export default routes;
