const express = require("express");
const { check } = require("express-validator");
const webshopController = require("../controllers/webshop-controller");
const checkAuth = require("../middleware/check-auth");
const checkAdmin = require("../middleware/check-admin");

const router = express.Router();

router.post("/", webshopController.getProductsWithFilters);
router.get("/getAll", webshopController.getAllProducts);

// Needs auth
router.use(checkAuth);

// Needs admin rights
router.use(checkAdmin);

router.post("/createProduct", webshopController.insertNewProduct);
router.patch("/updateProduct", webshopController.updateProduct);

module.exports = router;
