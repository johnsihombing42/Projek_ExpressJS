module.exports = (app) => {
  const posts = require("../controllers/post.controller");
  const router = require("express").Router();

  router.get("/", posts.findALL);
  router.post("/", posts.create);
  router.get("/:id", posts.findOne);
  app.use("/api/posts", router);
};
