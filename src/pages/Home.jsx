// import { getMyteamAction } from "../redux/actions/userActions";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAllUsersAction,
  getByUsernameAction,
  deleteUserAction,
  removeCreatedUserAction,
} from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import { PATHS } from "../utils/constants";
import Header from "../components/Header";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Home = () => {
  const { loading, error, users, username, userId, roleId, deletedUser } =
    useSelector((state) => state.collections);

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteUserAction(id));
  };

  useEffect(() => {
    error && NotificationManager.error(error);
    dispatch(getByUsernameAction(username));
    dispatch(removeCreatedUserAction());
    dispatch(getAllUsersAction());
    if (deletedUser) {
      dispatch(getAllUsersAction());
    }
  }, [deletedUser, dispatch, error, username]);

  return loading ? (
    <div className="text-center">
      <h1>Loading...</h1>
    </div>
  ) : (
    <React.Fragment>
      <NotificationContainer />
      <Header />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="p-3 text-center">Topcoder - User Management</h3>
          {roleId && (roleId === 2 || roleId === 3) && (
            <Link className="btn btn-success" to={PATHS.SIGNUP}>
              Create New User
            </Link>
          )}
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              {roleId && roleId === 3 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={user.userId}>
                  <td className="text-center">{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.emailAddress}</td>
                  <td className="text-center">{user.role.name}</td>
                  <td className="text-center">{user.status}</td>
                  {roleId && roleId === 3 && user.userId !== userId && (
                    <td className="text-center">
                      <button
                        onClick={(e) => deleteHandler(user.userId)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Home;
