const dataCorona = require("../model/dataCorona");

module.exports = {
  index: function (req, res) {
    dataCorona.get(req.con, function (err, rows) {
      res.render("datacorona/index", { data: rows });
    });
  },
  create: function (req, res) {
    dataCorona.get(req.con, function (err, rows) {
      res.render("datacorona/create", { data: rows });
    });
  },
  store: function (req, res) {
    dataCorona.create(req.con, req.body, function (err) {
      if (err) throw err;
      res.redirect("/datacorona");
    });
  },
  edit: function (req, res) {
    dataCorona.getById(req.con, req.params.id, function (err, rows) {
      res.render("datacorona/edit", { data: rows[0] });
    });
  },

  update: function (req, res) {
    dataCorona.update(req.con, req.body, req.params.id, function (err) {
      res.redirect("/datacorona");
    });
  },
};
