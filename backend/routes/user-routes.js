const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/user-controllers");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkAdmin = require("../middleware/check-admin");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.use(checkAuth);

router.get(
  "/cart/:uid",
  [check("uid").isNumeric()],
  userController.getUserCart
);
router.post("/addToCart", userController.addProductToCart);
router.delete("/:pid", userController.removeProductFromCart);
router.patch("/updateCart", userController.editProductAmount);

router.post("/checkAdmin", userController.checkAdmin);

router.use(checkAdmin);

router.get("/getAll", userController.getAllUsers);

module.exports = router;
