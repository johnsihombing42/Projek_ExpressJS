const express = require("express");
const router = express.Router();
const c = require("../controllers/kelas");

router.post("/regis", c.kelasCreate); //iniudah
router.get("/", c.kelasAll);
router.get("/:mentorId", c.kelasFind);

module.exports = router;
