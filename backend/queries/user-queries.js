const insertNewUser =
  "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id";

module.exports = {
  insertNewUser,
};
