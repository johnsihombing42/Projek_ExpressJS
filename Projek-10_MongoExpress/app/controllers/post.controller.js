const db = require("../models");
const Post = db.posts;

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const exist = await Post.find();
      if (exist)
        return res.status(201).json({
          status: true,
          data: exist,
        });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { title, body, publisher } = req.body;
      const data = await Post.create({
        title,
        body,
        publisher,
      });
      return res.status(201).json({
        status: true,
        message: "Success create data",
        data: data,
      });
    } catch (err) {
      console.log(err);
    }
  },

  findById: async (req, res, next) => {
    // try {
    //   const { _id } = req.params;
    //   const exist = await Post.findOne({ _id });
    //   if (!exist)
    //     return res.status(404).json({
    //       status: false,
    //       message: "Data not found",
    //     });
    //   return res.status(201).json({
    //     status: true,
    //     data: exist,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  },
};
