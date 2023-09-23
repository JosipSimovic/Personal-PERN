const HttpError = require("../models/http-error");
const pool = require("../database");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.headers.admin_id) {
    throw new HttpError("Missing admin header.", 500);
  }
  const admin_id = req.headers.admin_id;

  try {
    const result = await pool.query(
      "SELECT * FROM admins WHERE admin_id = $1",
      [admin_id]
    );

    if (result.rowCount <= 0) {
      throw new HttpError("Authorization failed!", 401);
    }

    req.userData.isAdmin = true;
    next();
  } catch (error) {
    return next(new HttpError(error, 401));
  }
};
