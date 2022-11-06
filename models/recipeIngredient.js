const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const RecipeIngredient = sequelize.define("RecipeIngredient", {});

module.exports = RecipeIngredient;
