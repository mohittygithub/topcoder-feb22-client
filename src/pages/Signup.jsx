import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../components/Header";
import { createUserAction, getRolesAction } from "../redux/actions/userActions";
import { PATHS } from "../utils/constants";

const Signup = () => {
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [roleId, setRoleId] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const { roles, error, createdUser, loading } = useSelector(
    (state) => state.collections
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (!roleId) NotificationManager.error("Please choose role.");
    // if (!roleId) setRoleId(1);
    // console.log("role=>", email, fullName, roleId);
    if (email && fullName && roleId) {
      dispatch(createUserAction(email, fullName, roleId));
    }
    error && NotificationManager.error(error);
  };

  useEffect(() => {
    // error && NotificationManager.error(error);
    createdUser && history.push(PATHS.HOME);
    dispatch(getRolesAction());
    // error && NotificationManager.error(error);
  }, [createdUser, dispatch, error, history]);

  return loading ? (
    <div className="text-center">
      <h1>Loading...</h1>
    </div>
  ) : (
    <React.Fragment>
      <Header />
      <NotificationContainer />
      <form onSubmit={submitHandler} className="container">
        <h3 className="p-3 text-center">Topcoder - Create New User</h3>
        <div className="form-group">
          <label htmlFor="username">Email address</label>
          <input
            type="email"
            className="form-control"
            id="userame"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="custom-select"
          >
            <option>choose one</option>
            {roles &&
              roles.map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {role.name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </React.Fragment>
  );
};

export default Signup;
