const User = require("../models/user");
const Recipe = require("../models/recipe");
const SubRecipe = require("../models/subRecipe");
const Ingredient = require("../models/ingredient");

exports.getRecipe = (req, res, next) => {
  let recipeId = parseInt(req.body.recipeId);
  console.log(recipeId);
  Recipe.findByPk(recipeId, { include: ["Dishes", "Ingredients"] })
    .then((result) => {
      if (result != null) {
        console.log(result);
        res.status(200).send(result);
      } else {
        console.log("Recipe does not Exist!");
        res.status(500).send("Recipe Does not Exist!");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong when getting the Recipes!");
    });
};
exports.getUserRecipes = (req, res, next) => {
  let userId = parseInt(req.body.userId);
  let recipeId = parseInt(req.body.recipeId);
  console.log(recipeId);
  User.findByPk(userId)
    .then((user) => {
      user
        .getRecipes({ include: ["Dishes", "Ingredients"] })
        .then((recipes) => {
          if (recipes != null) {
            res.status(200).send(recipes);
          } else {
            console.log("User has no Recipes!");
            res.status(500).send("User has no Recipes!");
          }
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong when getting the Recipes!");
    });
};
exports.getAllRecipes = (req, res, next) => {
  Recipe.findAll()
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong when getting the Recipes!");
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
exports.addDish = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let recipeId = req.body.recipeId;
  let dishId = req.body.dishId;

  console.log("***************REQUEST***********");
  console.log(recipeId);
  console.log(dishId);
  User.findOne({
    where: {
      username: username,
      password: password,
    },
    include: Recipe,
  })
    .then((user) => {
      if (user != null) {
        user
          .getRecipes({ where: { id: recipeId } })
          .then((recipes) => {
            if (recipes.length > 0) {
              Recipe.findByPk(dishId)
                .then((dish) => {
                  console.log(dish.id);
                  recipes[0]
                    .addDish(dish)
                    .then((result) => {
                      res.status(200).send(result);
                    })
                    .catch((error) => {
                      console.log(error);
                      res.status(500).send("Something went wrong!");
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              res.status(403).send("User does not have access to Recipe!\n");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("Recipe Get Failed");
            res.status(500).send("Something went wrong!");
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
//Soft delete from DB
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
                  res.status(200).send("Removed Recipe!\n");
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
//Hard delete from DB (Admin Only)
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
