const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Ingredient = sequelize.define("Ingredient", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Ingredient;