const express = require('express');
const webshopController = require('../controllers/webshop-controllers');

const router = express.Router();

router.post("/", webshopController.getWebshopByPage);

module.exports = router;