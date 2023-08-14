const express = require("express");
const webshopController = require("../controllers/webshop-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/", webshopController.getProductsWithFilters);

// Needs auth
router.use(checkAuth);

router.post("/createProduct", webshopController.insertNewProduct);

module.exports = router;
