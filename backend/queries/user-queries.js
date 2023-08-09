const insertNewUser =
  "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

module.exports = {
  insertNewUser,
};
