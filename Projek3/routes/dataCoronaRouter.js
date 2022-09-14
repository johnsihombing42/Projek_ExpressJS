const express = require("express");
const router = express.Router();
const dataCoronaController = require("../controller/dataCoronaController");

router.get("/", dataCoronaController.index);
router.get("/create", dataCoronaController.create);
router.post("/", dataCoronaController.store);
router.get("/:id/edit", dataCoronaController.edit);
router.put("/:id", dataCoronaController.update);

module.exports = router;
