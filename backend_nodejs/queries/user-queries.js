const insertNewUser =
  "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id";

const findUserByEmail = "SELECT * FROM users WHERE email = $1";

module.exports = {
  insertNewUser,
  findUserByEmail,
};
