import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashBoardPage from "./features/DashBoardPage/DashBoardPage";
import "./shared_components/scss/style.scss";
import PrivateRoute from "./shared_components/team_route/PrivateRoute";
import PublicRoute from "./shared_components/team_route/PublicRoute";

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
const Login = React.lazy(() =>
  import("./shared_components/views/pages/login/Login")
);
const Register = React.lazy(() =>
  import("./shared_components/views/pages/register/Register")
);
const Page404 = React.lazy(() =>
  import("./shared_components/views/pages/page404/Page404")
);
const Page500 = React.lazy(() =>
  import("./shared_components/views/pages/page500/Page500")
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <PublicRoute restricted={true} component={Register} path="/register" exact />
            <PublicRoute restricted={true} component={Login} path="/login" exact />
            
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
}

export default App;
