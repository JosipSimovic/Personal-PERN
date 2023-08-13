const pool = require("../database");
const HttpError = require("../models/http-error");
const queries = require("../queries/user-queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  let foundUser;
  try {
    foundUser = await pool.query(queries.findUserByEmail, [email]);
  } catch (e) {
    return next(new HttpError("Something went wrong.\n" + e));
  }

  if (foundUser.rowCount > 0) {
    return next(
      new HttpError("A user with the same e-mail already exists!", 400)
    );
  }

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

  let token;
  try {
    token = jwt.sign(
      {
        userId: userId,
        email: email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (e) {
    return next(new HttpError("Could not create JWT token. " + e, 500));
  }

  res.status(201);
  res.json({
    message: `User successfully created.`,
    createdUser: {
      userId,
      username,
      email,
      token,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(queries.findUserByEmail, [email]);

    if (result.rowCount <= 0) {
      return next(new HttpError("Could not find user for given e-mail.", 404));
    }

    let isPasswordValid;
    try {
      isPasswordValid = await bcrypt.compare(password, result.rows[0].password);
    } catch (e) {}

    if (!isPasswordValid) {
      return next(new HttpError("Invalid password. Please try again.", 401));
    }

    let token;
    try {
      token = jwt.sign(
        {
          userId: result.rows[0].user_id,
          email: email,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
    } catch (e) {
      return next(new HttpError("Could not create JWT token. " + e, 500));
    }

    res.status(200);
    res.json({
      message: "User succesfully authorized.",
      user: {
        userId: result.rows[0].user_id,
        username: result.rows[0].username,
        email,
        token,
      },
    });
  } catch (e) {
    return next(new HttpError("An error occurred.\n" + e));
  }
};

module.exports = {
  signup,
  login,
};
