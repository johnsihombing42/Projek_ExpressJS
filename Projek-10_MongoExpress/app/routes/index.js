const express = require("express");
const router = express.Router();
const post = require("./post.route");

router.use("/api", post);

module.exports = router;
