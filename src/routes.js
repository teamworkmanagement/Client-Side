import React from "react";
import DashBoardPage from "./features/DashBoardPage/DashBoardPage";
import ChatPage from "./features/ChatPage/ChatPage";
import TeamPage from "./features/TeamPage/TeamPage";
import NewsFeedPage from "./features/NewsFeedPage/NewsFeedPage";
import KanbanBoard from "./features/KanbanBoard/KanbanBoard";
import MyToaster from "./features/ToastTest/ToastTest";
import ListTeamPage from "./features/ListTeamPage/ListTeamPage";

const Toaster = React.lazy(() =>
  import("./shared_components/views/notifications/toaster/Toaster")
);
const Tables = React.lazy(() =>
  import("./shared_components/views/base/tables/Tables")
);

const Breadcrumbs = React.lazy(() =>
  import("./shared_components/views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() =>
  import("./shared_components/views/base/cards/Cards")
);
const Carousels = React.lazy(() =>
  import("./shared_components/views/base/carousels/Carousels")
);
const Collapses = React.lazy(() =>
  import("./shared_components/views/base/collapses/Collapses")
);
const BasicForms = React.lazy(() =>
  import("./shared_components/views/base/forms/BasicForms")
);

const Jumbotrons = React.lazy(() =>
  import("./shared_components/views/base/jumbotrons/Jumbotrons")
);
const ListGroups = React.lazy(() =>
  import("./shared_components/views/base/list-groups/ListGroups")
);
const Navbars = React.lazy(() =>
  import("./shared_components/views/base/navbars/Navbars")
);
const Navs = React.lazy(() =>
  import("./shared_components/views/base/navs/Navs")
);
const Paginations = React.lazy(() =>
  import("./shared_components/views/base/paginations/Pagnations")
);
const Popovers = React.lazy(() =>
  import("./shared_components/views/base/popovers/Popovers")
);
const ProgressBar = React.lazy(() =>
  import("./shared_components/views/base/progress-bar/ProgressBar")
);
const Switches = React.lazy(() =>
  import("./shared_components/views/base/switches/Switches")
);

const Tabs = React.lazy(() =>
  import("./shared_components/views/base/tabs/Tabs")
);
const Tooltips = React.lazy(() =>
  import("./shared_components/views/base/tooltips/Tooltips")
);
const BrandButtons = React.lazy(() =>
  import("./shared_components/views/buttons/brand-buttons/BrandButtons")
);
const ButtonDropdowns = React.lazy(() =>
  import("./shared_components/views/buttons/button-dropdowns/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() =>
  import("./shared_components/views/buttons/button-groups/ButtonGroups")
);
const Buttons = React.lazy(() =>
  import("./shared_components/views/buttons/buttons/Buttons")
);
const Charts = React.lazy(() =>
  import("./shared_components/views/charts/Charts")
);
const Dashboard = React.lazy(() =>
  import("./shared_components/views/dashboard/Dashboard")
);
const CoreUIIcons = React.lazy(() =>
  import("./shared_components/views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() =>
  import("./shared_components/views/icons/flags/Flags")
);
const Brands = React.lazy(() =>
  import("./shared_components/views/icons/brands/Brands")
);
const Alerts = React.lazy(() =>
  import("./shared_components/views/notifications/alerts/Alerts")
);
const Badges = React.lazy(() =>
  import("./shared_components/views/notifications/badges/Badges")
);
const Modals = React.lazy(() =>
  import("./shared_components/views/notifications/modals/Modals")
);
const Colors = React.lazy(() =>
  import("./shared_components/views/theme/colors/Colors")
);
const Typography = React.lazy(() =>
  import("./shared_components/views/theme/typography/Typography")
);
const Widgets = React.lazy(() =>
  import("./shared_components/views/widgets/Widgets")
);
const Users = React.lazy(() => import("./shared_components/views/users/Users"));
const User = React.lazy(() => import("./shared_components/views/users/User"));

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/chat", name: "Tin nhắn", component: ChatPage, exact: true },
  { path: "/team", name: "Nhóm", component: TeamPage, exact: true },
  { path: "/newsfeed", name: "Bản tin", component: NewsFeedPage, exact: true },
  { path: "/kanban", name: "Kanban", component: KanbanBoard, exact: true },
  { path: "/toast", name: "Kanban", component: MyToaster, exact: true },
  {
    path: "/teams",
    name: "Danh sách nhóm",
    component: ListTeamPage,
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
