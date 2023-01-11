const db = require("../models");
const Post = db.posts;
const mongoose = require("mongoose");

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
      next(err);
    }
  },

  findById: async (req, res, next) => {
    const _id = req.params.id;
    const data = mongoose.isValidObjectId(_id);
    if (!data) {
      res.status(404).json({
        status: false,
        message: "Invalid Params, data not found",
      });
    }
    try {
      const exist = await Post.findById({ _id });
      if (exist)
        return res.status(201).json({
          status: true,
          data: exist,
        });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    const _id = req.params.id;
    const data = mongoose.isValidObjectId(_id);
    if (!data) {
      res.status(404).json({
        status: false,
        message: "Invalid Params, data not found",
      });
    }
    try {
      const updatedData = await Post.findByIdAndUpdate(_id, req.body);

      if (!updatedData) {
        return res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Success update data",
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    const _id = req.params.id;
    const data = mongoose.isValidObjectId(_id);
    if (!data) {
      res.status(404).json({
        status: false,
        message: "Invalid Params, data not found",
      });
    }
    try {
      const deleteData = await Post.findByIdAndRemove(_id);
      if (!deleteData) {
        return res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Success delete data",
      });
    } catch (err) {
      next(err);
    }
  },
};
