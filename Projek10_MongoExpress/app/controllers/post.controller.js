const db = require("../models");
const Post = db.posts;
exports.findALL = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
exports.create = (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    publisher: req.body.publisher,
  });
  post
    .save(post)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
