const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const mid = require("../helpers/middleware");

//hit endpoint
router.post("/kelas/regis", controller.registKelas);
router.get("/kelas", controller.getKelas);
router.get("/kelas/:mentorId", controller.getKelasById);
router.post("/mentor", controller.registMentor);
router.get("/mentor", controller.getMentor);
router.get("/mentor/:mentorId", controller.getMentorById);
router.post("/kelasuser/create", mid.mustLogin, controller.registKelasUser);
router.get("/kelasuser/getall", mid.mustLogin, controller.getKelasUser);
router.get(
  "/kelasuser/getdetail/:id",
  mid.mustLogin,
  controller.getKelasUserById
);

//regis dan login user service
router.post("/userauth/register", controller.register);
router.post("/userauth/login", controller.login);
router.get("/user/read", controller.readAllData);
router.get("/user/read/:userId", controller.readDetailUser);
module.exports = router;
