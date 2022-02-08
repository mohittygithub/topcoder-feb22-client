import jwt from "jsonwebtoken";

// method to check if jwt token expired.
export const authVerify = (token) => {
  let verification = {};
  jwt.verify(token, process.env.REACT_APP_SECRET_KEY, (err, decoded) => {
    if (err) verification.error = err;
    else verification.tokenDetails = decoded;
  });
  return verification;
};
