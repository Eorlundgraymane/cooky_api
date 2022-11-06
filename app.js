const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const sequelize = require("sequelize");
const database = require("./database/database");
const relations = require("./models/relations");

// const path = require("path");
// const rootDir = path.dirname;

const mainRouter = require("./routers/mainRouter");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mainRouter);

const PORT = process.env.PORT || 3000;

database.sync().then(
  (result) => {
    console.log(result);
    console.log("DB Connected.");

    app.listen(PORT);
    console.log("Server is Online.");
  },
  (err) => {
    console.log(err);
    console.log("DB Failed");
  }
);
