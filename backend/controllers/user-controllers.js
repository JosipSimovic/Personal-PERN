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
    return next(new HttpError("Could not encrypt password", 500));
  }

  let userId;
  try {
    const result = await pool.query(queries.insertNewUser, [
      username,
      email,
      hashedPassword,
    ]);
    userId = result.rows[0].user_id;
  } catch (e) {
    return next(new HttpError("Could not create new user.", 500));
  }

  res.status(201);
  res.json({
    message: `User successfully created.`,
    createdUser: {
      userId,
      username,
      email,
    },
  });
};

exports.signup = signup;
