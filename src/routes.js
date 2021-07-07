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

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: "/notfound", name: "Không tồn tại", component: NotFoundPage },
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
  //{ path: "/team", name: "mychat", component: ChatPage, exact: true },
  // { path: '/base', name: 'Base', component: Cards, exact: true },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', component: Cards },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/forms', name: 'Forms', component: BasicForms },
  // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navbars', name: 'Navbars', component: Navbars },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  // { path: '/base/switches', name: 'Switches', component: Switches },
  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/base/tabs', name: 'Tabs', component: Tabs },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  // { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/brands', name: 'Brands', component: Brands },
  // { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
