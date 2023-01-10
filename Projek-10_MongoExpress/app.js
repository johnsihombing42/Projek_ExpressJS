require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT } = process.env;
const router = require("./app/routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.get("/", (req, res) => {
  return res.status(404).json({
    status: true,
    message: "Welcome folks",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
