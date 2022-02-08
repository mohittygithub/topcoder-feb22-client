import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../redux/actions/userActions";
import { PATHS } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const { username, roleId } = useSelector((state) => state.collections);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to={PATHS.HOME}>
        TopCoder
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse container"
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to={PATHS.HOME}>
            Home
          </Link>
          {roleId && roleId !== 1 && (
            <Link className="nav-item nav-link" to={PATHS.SIGNUP}>
              Create+
            </Link>
          )}

          <Link to="" className="nav-item nav-link text-white">
            {username}
          </Link>
          <Link
            onClick={() => dispatch(logoutAction())}
            className="nav-item nav-link"
            to=""
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>

    // <div>
    //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //     <ul className="navbar-nav mr-auto">
    //       <li className="nav-item active">
    //         <Link>Home</Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link>Create+</Link>
    //       </li>
    //       <li>
    //         <Link
    //           className="nav-item"
    //           to=""
    //           onClick={() => dispatch(logoutAction())}
    //         >
    //           Logout
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
  );
};

export default Header;
