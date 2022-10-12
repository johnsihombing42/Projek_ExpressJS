const router = require("express").Router();
const {
  createMentor,
  findMentor,
  findAllMentor,
} = require("../controllers/mentor");

router.get("/:mentorId", findMentor);
router.post("/", createMentor); //ini udah
router.get("/", findAllMentor); //ini udah

module.exports = router;
