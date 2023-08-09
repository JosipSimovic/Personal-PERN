const express = require("express");
const webshopController = require("../controllers/webshop-controller");

const router = express.Router();

router.post("/", webshopController.getProductsWithFilters);

router.post("/createProduct", webshopController.insertNewProduct);

module.exports = router;
