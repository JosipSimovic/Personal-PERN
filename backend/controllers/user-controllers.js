const { validationResult } = require("express-validator");
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

const getUserCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed.", 422));
  }

  const { uid } = req.params;

  try {
    const result = await pool.query(queries.getUserCart, [uid]);
    res.status(200);
    res.json({
      products: result.rows,
    });
  } catch (e) {
    return next(new HttpError("Someting went wrong: " + e, 500));
  }
};

const addProductToCart = async (req, res, next) => {
  const { uid, pid, amount } = req.body;

  try {
    const insertResult = await pool.query(queries.insertCartProduct, [
      uid,
      pid,
      amount,
    ]);

    res.status(201);
    res.json({
      message: "Product added to cart.",
    });
  } catch (e) {
    return next(new HttpError("An error ocurred: " + e));
  }
};

const editProductAmount = async (req, res, next) => {
  const { uid, pid, amount } = req.body;

  try {
    const updateResult = await pool.query(queries.updateCartProductAmount, [
      amount,
      uid,
      pid,
    ]);

    if (updateResult.rowCount <= 0) {
      return next(
        new HttpError("Could not find product with given values.", 404)
      );
    }

    res.status(201);
    res.json({
      message: "Product amount updated.",
    });
  } catch (e) {
    return next(new HttpError("An error ocurred: " + e));
  }
};

const checkAdmin = async (req, res, body) => {
  const { uid } = req.body;

  try {
    const result = await pool.query(queries.checkIfAdmin, [uid]);

    let isAdmin = false;
    if (result.rowCount > 0) {
      isAdmin = true;
    }

    res.status(200);
    res.json({
      isAdmin,
    });
  } catch (e) {
    return next(new HttpError("Something went wrong: " + e.message, 500));
  }
};

module.exports = {
  signup,
  login,
  getUserCart,
  addProductToCart,
  editProductAmount,
  checkAdmin,
};
