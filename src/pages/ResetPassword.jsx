import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [retypePassword, setRetypePassword] = useState();
  const [code, setCode] = useState();
  const params = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === retypePassword) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      };
      fetch(
        `http://44.202.120.131:8080/api/v1/users/activate/${code}`,
        requestOptions
      )
        .then((response) => response.json())
        .then(
          NotificationManager.success(
            "You are active now. Please login with your username/email and password "
          )
        )
        .then(
          setTimeout(() => {
            window.close();
          }, 2000)
        );

      // dispatch(resetPasswordAction(password, code));
      // try {
      //   const response = await axios.put(
      //     `http://44.202.120.131:8080/api/v1/users/activate/${code}`,
      //     {
      //       password: password,
      //     }
      //   );
      //   console.log(response);
      //   if (response.data) {
      //     NotificationManager.success(
      //       "You are active now. Please login with your username/email and password "
      //     );
      //     setPassword("");
      //     setRetypePassword("");
      //   }
      // } catch (error) {
      //   if (error) {
      //     NotificationManager.error(error.message);
      //   }
      // }
    }
  };

  useEffect(() => {
    // error && NotificationManager.error(error);
    // console.log("params=>", params);
    params && setCode(params.code);
    // console.log(code);
  }, [code, params]);

  // loading ? (
  //   <div className="text-center">
  //     <h1>Loading...</h1>
  //   </div>
  // ) :
  return (
    <React.Fragment>
      <NotificationContainer />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="p-3 text-center">Topcoder - Create Password</h3>
        </div>
        <form onSubmit={submitHandler}>
          <div class="form-group">
            <label for="exampleInputEmail1">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="passwordHelp"
              placeholder="Enter password"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Retype-Password</label>
            <input
              type="retypePassword"
              class="form-control"
              id="retypePassword"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              placeholder="Retype-Password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
