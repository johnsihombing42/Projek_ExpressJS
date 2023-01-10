const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/posts", controller.post.findAll);
router.post("/posts", controller.post.create);
module.exports = router;
