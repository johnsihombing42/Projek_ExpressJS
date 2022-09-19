const data = require("../data.json");
const fs = require("fs");

module.exports = {
  index: (req, res) => {
    const { query } = req.query;

    let users = data.users;

    if (query) {
      users = data.users.filter((el) => el.name == query);
    }

    return res.status(200).json({
      status: "success",
      message: "success get all data!",
      data: users,
    });
  },
  show: (req, res) => {
    const { userId } = req.params;

    const user = data.users.filter((el) => el.id == userId);

    if (user.length == 0) {
      return res.status(404).json({
        status: "failed",
        message: "not found!",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "success get detail data!",
      data: user[0],
    });
  },
  create: (req, res) => {
    const { name, email } = req.body;
    let users = data.users;

    const user = {
      id: users[users.length - 1].id + 1,
      name,
      email,
    };
    users.push(user);

    fs.writeFileSync("./data.json", JSON.stringify(data));

    return res.status(201).json({
      status: "success",
      message: "success create data!",
      data: user,
    });
  },
  update: (req, res) => {
    const { name, email } = req.body;
    const { userId } = req.params;

    const foundIndex = data.users.findIndex((el) => el.id == userId);
    if (foundIndex < 0) {
      return res.status(404).json({
        status: "failed",
        message: "not found!",
        data: null,
      });
    }

    if (name) {
      data.users[foundIndex].name = name;
    }

    if (email) {
      data.users[foundIndex].email = email;
    }

    fs.writeFileSync("./data.json", JSON.stringify(data));

    return res.status(201).json({
      status: "success",
      message: "success create data!",
      data: data.users[foundIndex],
    });
  },

  delete: (req, res) => {
    const { userId } = req.params;
    let users = data.users;
    const foundIndex = users.findIndex((el) => el.id == userId);
    if (foundIndex < 0) {
      return res.status(404).json({
        status: "failed",
        message: "not found!",
        data: null,
      });
    }
    users.splice(foundIndex, 1);

    fs.writeFileSync("./data.json", JSON.stringify(data));

    return res.status(200).json({
      status: "success",
      message: "success delete data!",
      data: data.users,
    });
  },
};
