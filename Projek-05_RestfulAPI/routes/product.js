const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.product.index);
router.get("/:productId", controller.product.show);
router.post("/", controller.product.create);
router.put("/:productId", controller.product.update);
router.delete("/:productId", controller.product.delete);

module.exports = router;
