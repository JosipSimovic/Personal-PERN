const insertNewUser =
  "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id";

const findUserByEmail = "SELECT * FROM users WHERE email = $1";

const getUserCart =
  "SELECT p.*, c.amount, col.color_name, col.hex FROM products p " +
  "JOIN cart c ON p.id = c.product_id " +
  "JOIN product_colors col ON col.id = p.color " +
  "WHERE c.user_id = $1";

const insertCartProduct =
  "INSERT INTO cart(user_id, product_id, amount) VALUES ($1, $2, $3)";

const updateCartProductAmount =
  "UPDATE cart SET amount = $1 WHERE user_id = $2 AND product_id = $3";

const checkIfAdmin = "SELECT * FROM admins WHERE admin_id = $1";

module.exports = {
  insertNewUser,
  findUserByEmail,
  getUserCart,
  insertCartProduct,
  updateCartProductAmount,
  checkIfAdmin,
};
