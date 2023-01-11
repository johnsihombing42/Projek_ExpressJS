const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/posts", controller.post.findAll);
router.post("/posts", controller.post.create);
router.get("/posts/:id", controller.post.findById);
router.put("/posts/:id", controller.post.update);
router.delete("/posts/:id", controller.post.delete);
module.exports = router;
