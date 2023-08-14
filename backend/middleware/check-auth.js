const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.headers.authorization) {
    throw new HttpError("Authorization header not valid.");
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("Authentication failed.");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (e) {
    throw new HttpError(e);
  }
};
