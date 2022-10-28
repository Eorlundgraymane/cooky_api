const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const User = require("../models/user");
const Recipe = require("../models/recipe");
const SubRecipe = require("../models/subRecipe");
const Ingredient = require("../models/ingredient");
const e = require("express");

exports.createUser = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log("***************REQUEST***********");
  console.log(req.body);
  console.log(req.query);
  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (user == null) {
        User.create({
          username: username,
          password: password,
        })
          .then((newUser) => {
            res.status(200).send(newUser);
          })
          .catch((error) => {
            res.status(500).send("Something went wrong!");
          });
      } else {
        console.log(user);
        res.status(403).send("User Already Exists!\n" + JSON.stringify(user));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong!");
    });
};

exports.createRecipe = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let title = req.body.title;
  let description = req.body.description;

  console.log("***************REQUEST***********");
  console.log(req.body);
  console.log(req.query);
  User.findOne({
    where: {
      username: username,
      password: password,
    },
  })
    .then((user) => {
      if (user != null) {
        Recipe.create({
          title: title,
          description: description,
        })
          .then((newRecipe) => {
            user
              .addRecipe(newRecipe)
              .then((newUser) => {
                console.log("*******************RECIPE CREATED**************");
                console.log(newUser);
                res.status(200).send(newRecipe);
              })
              .catch((error) => {
                console.log(error);
                res
                  .status(500)
                  .send("Something went wrong while creating the recipe!");
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(user);
        res.status(403).send("Username or Password Incorrect!\n");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong!");
    });
};

exports.removeRecipe = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let recipeId = req.body.recipeId;

  console.log("***************REQUEST***********");
  console.log(req.body);
  console.log(req.query);
  User.findOne({
    where: {
      username: username,
      password: password,
    },
  })
    .then((user) => {
      if (user != null) {
        user
          .getRecipes({ where: { id: recipeId } })
          .then((recipes) => {
            if (recipes.length > 0) {
              console.log("*************RECIPES*************");
              console.log(recipes[0]);
              user
                .removeRecipe(recipes[0])
                .then((removedRecipe) => {
                  console.log("REMOVED RECIPE");
                  console.log(removedRecipe);
                  res
                    .status(200)
                    .send("Removed Recipe!\n");
                })
                .catch((error) => {
                  console.log(error);
                  res
                    .status(500)
                    .send(
                      "Something went wrong while deleting Recipe from User!"
                    );
                });
            } else {
              res
                .status(500)
                .send("Recipe does not belong to User or Does not Exist!");
            }
          })
          .catch((error) => {
            res
              .status(500)
              .send("Something went wrong while fetching Recipe from User!");
          });
      } else {
        console.log(user);
        res.status(403).send("Username or Password Incorrect!\n");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong!");
    });
};

exports.deleteRecipe = (req, res, next) => {
  let recipeId = parseInt(req.body.recipeId);

  Recipe.destroy({ where: { id: recipeId } })
    .then((result) => {
      if (result == 1) {
        console.log(result);
        res.sendStatus(200);
      } else {
        console.log("Recipe does not Exist!");
        res.status(500).send("Recipe Does not Exist!");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong when deleting the Recipes!");
    });
};

exports.deleteUser = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log("***************REQUEST***********");
  console.log(req.body);
  console.log(req.query);
  User.findOne({
    where: {
      username: username,
      password: password,
    },
  })
    .then((user) => {
      if (user != null && user.id != 1) {
        user
          .destroy()
          .then((deletedUser) => {
            res.status(200).send(deletedUser);
          })
          .catch((error) => {
            res.status(500).send("Something went wrong!");
          });
      } else {
        let errorMsg = "Username or Password Incorrect!\n";
        if (user != null && user.id == 1) {
          errorMsg = "Cannot Delete Admin Account!!!\n";
        }
        res.status(403).send(errorMsg);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong!");
    });
};
