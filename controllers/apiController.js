const express = require("express");
const app = express();

exports.serverCheck = (req, res) => {
  var responseJson = {
    data: "Server is Online",
  };
  res.send(responseJson);
};

const User = require("../models/user");
const Recipe = require("../models/recipe");
const SubRecipe = require("../models/subRecipe");
const Ingredient = require("../models/ingredient");

exports.ensureAdminAccount = (req, res) => {
  User.findOne()
    .then((user) => {
      if (user == null) {
        User.create({
          username: "Admin",
          password: "password",
        })
          .then((res) => {
            User.findOne({
              include: [
                {
                  model: Recipe,
                  as: "Recipes",
                  include: [
                    { model: Recipe, as: "Dishes" },
                    { model: Ingredient, as: "Ingredients" },
                  ],
                },
              ],
            }).then((user) => {
              console.log(user);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        User.findOne({
          include: [
            {
              model: Recipe,
              as: "Recipes",
              include: [
                { model: Recipe, as: "Dishes" },
                { model: Ingredient, as: "Ingredients" },
              ],
            },
          ],
        }).then((user) => {
          console.log(user);
          console.log(user.Recipes);
          if (user.Recipes.length > 0) {
            console.log(user.Recipes[0].Dishes);
          }    
          res.send(user);
        });
      }
    })
    .catch((err) => console.log(err));
};
