import React, { useEffect } from "react";
import { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BarLoader } from "react-spinners";
import { loginAction } from "../redux/actions/userActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.collections);
  // console.log(loading, error, user, isAuth);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (username && password) {
      dispatch(loginAction(username, password));
    }
  };

  useEffect(() => {
    error && NotificationManager.error(error);
  }, [error]);
  return loading ? (
    <div className="text-center">
      <BarLoader loading color="blue" size={150} />
    </div>
  ) : (
    <React.Fragment>
      <NotificationContainer />
      <form onSubmit={submitHandler} className="container">
        <h3 className="p-3 text-center">Topcoder - Login</h3>
        <div className="form-group">
          <label for="username">Email address/Username</label>
          <input
            type="email"
            className="form-control"
            id="userame"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </React.Fragment>
  );
};

export default Login;
