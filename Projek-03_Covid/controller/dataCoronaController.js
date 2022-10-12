const datacorona = require("../model/datacorona");

module.exports = {
  index: function (req, res) {
    datacorona.get(req.con, function (err, rows) {
      res.render("datacorona/index", { data: rows });
    });
  },

  create: function (req, res) {
    res.render("datacorona/create");
  },

  store: function (req, res) {
    datacorona.create(req.con, req.body, function (err) {
      res.redirect("/datacorona");
    });
  },

  edit: function (req, res) {
    datacorona.getById(req.con, req.params.id, function (err, rows) {
      res.render("datacorona/edit", { data: rows[0] });
    });
  },

  update: function (req, res) {
    datacorona.update(req.con, req.body, req.params.id, function (err) {
      res.redirect("/datacorona");
    });
  },

  destroy: function (req, res) {
    datacorona.destroy(req.con, req.params.id, function (err) {
      res.redirect("/datacorona");
    });
  },
};
