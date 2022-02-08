import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { PATHS } from "./utils/constants";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          exact
          path={PATHS.LOGIN}
          component={Login}
          restricted={true}
        />
        <PrivateRoute
          exact
          path={PATHS.SIGNUP}
          component={Signup}
          restricted={true}
        />
        <PrivateRoute exact path={PATHS.HOME} component={Home} />
        <Route exact path={PATHS.RESET_PASSWORD} component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
