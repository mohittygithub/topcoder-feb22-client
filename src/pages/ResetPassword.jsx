import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { resetPasswordAction } from "../redux/actions/userActions";

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [retypePassword, setRetypePassword] = useState();
  const [code, setCode] = useState();
  const dispatch = useDispatch();
  const params = useParams();

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === retypePassword) {
      dispatch(resetPasswordAction(password, code));
    }
  };

  useEffect(() => {
    // console.log("params=>", params);
    params && setCode(params.code);
    // console.log(code);
  }, [code, params]);

  return (
    <React.Fragment>
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