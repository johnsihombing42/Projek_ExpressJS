const express = require("express");
const router = express.Router();
const user = require("./user");
const product = require("./product");
router.use("/users", user);
router.use("/products", product);

module.exports = router;
