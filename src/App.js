import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./shared_components/scss/style.scss";
import PublicRoute from "./shared_components/team_route/PublicRoute";
import ForgotPassword from "./shared_components/views/pages/forgotpassword/ForgotPassword";
import { islogin } from "./shared_components/views/pages/login/authSlice";
import MyLogin from "./shared_components/views/pages/login/MyLogin/MyLogin";
import { disconnectAppService, startAppService } from "./utils/signalr/appService";
import {
  disconnectChatService,
  startChatService,
} from "./utils/signalr/chatService";
import {
  disconnectKanbanService,
  startKanbanService,
} from "./utils/signalr/kanbanService";
import { disconnectNoti, startNotiService } from "./utils/signalr/notiService";
import {
  disconnectPostService,
  startPostService,
} from "./utils/signalr/postService";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() =>
  import("./shared_components/containers/TheLayout")
);

// Pages
const Register = React.lazy(() =>
  import("./shared_components/views/pages/register/Register")
);
const Page404 = React.lazy(() =>
  import("./shared_components/views/pages/page404/Page404")
);
const Page500 = React.lazy(() =>
  import("./shared_components/views/pages/page500/Page500")
);

function App() {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  useEffect(() => {
    const cloneStatus = !!loginStatus;

    if (!cloneStatus) {
      console.log("check login");
      dispatch(islogin());
    }
  }, []);

  useEffect(() => {
    if (loginStatus === true) {
      startChatService();
      startKanbanService();
      startPostService();
      startNotiService();
      startAppService();
    } else {
      disconnectNoti();
      disconnectChatService();
      disconnectKanbanService();
      disconnectPostService();
      disconnectAppService();
    }
  }, [loginStatus]);
  return (
    <BrowserRouter
      getUserConfirmation={(message, callback) => {
        // this is the default behavior
        const allowTransition = window.confirm(message);
        callback(allowTransition);
      }}
    >
      <React.Suspense fallback={loading}>
        <Switch>
          <PublicRoute
            restricted={true}
            component={Register}
            path="/register"
            exact
          />

          <PublicRoute
            restricted={true}
            component={MyLogin}
            path="/login"
            exact
          />

          <PublicRoute
            restricted={true}
            component={ForgotPassword}
            path="/forgotpassword"
            exact
          />

          {/*<Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />*/}
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <Route
            path="/"
            name="Home"
            render={(props) => <TheLayout {...props} />}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}
export default App;
