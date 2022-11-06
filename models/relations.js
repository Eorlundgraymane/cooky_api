const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const User = require("./user");
const Recipe = require("./recipe");
const SubRecipe = require("./subRecipe");
const Ingredient = require("./ingredient");
const RecipeIngredient = require("./recipeIngredient");

User.hasMany(Recipe);
Recipe.belongsTo(User);
Recipe.belongsToMany(Recipe, { as: "Dishes", through: SubRecipe });
Recipe.hasMany(Ingredient);
Ingredient.belongsToMany(Recipe, { as: "Ingredients", through: RecipeIngredient});

module.exports = this;
