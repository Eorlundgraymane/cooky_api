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

exports.ensureAdminAccount = (req, res, next) => {
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
              next();
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
          next();
        });
      }
    })
    .catch((err) => {
      console.log(err);
      req.sendStatus(500);
    });
};
