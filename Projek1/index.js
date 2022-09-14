const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("Ini Halaman About!");
});

app.get("/biodata/:name/:id", function (req, res) {
  res.send(
    `Nama anda adalah ${req.params.name}, id anda adalah ${req.params.id}`
  );
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
