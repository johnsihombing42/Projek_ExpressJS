const data = require("../data.json");
const fs = require("fs");

module.exports = {
  index: (req, res) => {
    const { query } = req.query;

    let products = data.products;

    if (query) {
      products = data.products.filter((el) => el.name == query);
    }

    return res.status(200).json({
      status: "success",
      message: "success get all data!",
      data: products,
    });
  },
  show: (req, res) => {
    const { productId } = req.params;

    const product = data.products.filter((el) => el.id == productId);

    if (product.length == 0) {
      return res.status(404).json({
        status: "failed",
        message: "not found!",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "success get detail data!",
      data: product[0],
    });
  },
  create: (req, res) => {
    const { name, description, price } = req.body;
    let products = data.products;

    const product = {
      id: products[products.length - 1].id + 1,
      name,
      description,
      price,
    };
    products.push(product);

    fs.writeFileSync("./data.json", JSON.stringify(data));

    return res.status(201).json({
      status: "success",
      message: "success create data!",
      data: product,
    });
  },
  update: (req, res) => {
    const { name, description, price } = req.body;
    const { productId } = req.params;

    const foundIndex = data.products.findIndex((el) => el.id == productId);
    if (foundIndex < 0) {
      return res.status(404).json({
        status: "failed",
        message: "not found!",
        data: null,
      });
    }

    if (name) {
      data.products[foundIndex].name = name;
    }
    if (description) {
      data.products[foundIndex].description = description;
    }

    if (price) {
      data.products[foundIndex].price = price;
    }

    fs.writeFileSync("./data.json", JSON.stringify(data));

    return res.status(201).json({
      status: "success",
      message: "success create data!",
      data: data.products[foundIndex],
    });
  },

  delete: (req, res) => {
    const { productId } = req.params;
    let products = data.products;
    const foundIndex = products.findIndex((el) => el.id == productId);
    if (foundIndex < 0) {
      return res.status(404).json({
        status: "failed",
        message: "not found!",
        data: null,
      });
    }
    products.splice(foundIndex, 1);

    fs.writeFileSync("./data.json", JSON.stringify(data));

    return res.status(200).json({
      status: "success",
      message: "success delete data!",
      data: data.products,
    });
  },
};
