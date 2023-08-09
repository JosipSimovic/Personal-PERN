const pool = require("../database");
const HttpError = require("../models/http-error");
const queries = require("../queries/user-queries");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    next(new HttpError("Could not encrypt password", 500));
  }

  try {
    const result = pool.query(queries.insertNewUser, [
      username,
      email,
      hashedPassword,
    ]);
  } catch (e) {
    next(new HttpError("Could not create new user.", 500));
  }

  res.status(201);
  res.json({ message: "User successfully created: " + username });
};

exports.signup = signup;
