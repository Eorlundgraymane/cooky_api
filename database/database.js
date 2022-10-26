const { Sequelize } = require("sequelize");

const database = new Sequelize("cooky", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

// const database = new Sequelize(
//   "rtuah3x8s0df08v4",
//   "m1vbx24mz5q3h2in",
//   "ahrh2yxo8arv441u",
//   {
//     dialect: "mysql",
//     host: "qvti2nukhfiig51b.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//     port: 3306,
//   }
// );

module.exports = database;
