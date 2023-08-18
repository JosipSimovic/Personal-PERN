const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/user-controllers");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.use(checkAuth);

router.post("/addToCart", userController.addProductToCart);
router.patch("/updateCart", userController.editProductAmount);

router.post("/checkAdmin", userController.checkAdmin);

router.get(
  "/cart/:uid",
  [check("uid").isNumeric()],
  userController.getUserCart
);

module.exports = router;
