const User = require("../models/user");
const Recipe = require("../models/recipe");
const SubRecipe = require("../models/subRecipe");
const Ingredient = require("../models/ingredient");

exports.createIngredient = (req, res, next) => {
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
        Ingredient.create({
          title: title,
          description: description,
        })
          .then((ing) => {
            console.log(ing);
            res.status(200).send(ing);
          })
          .catch((error) => {
            console.log(error);
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
exports.addIngredient = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let recipeId = req.body.recipeId;
  let ingredientId = req.body.ingredientId;
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
        Ingredient.findByPk(ingredientId)
          .then((ingredient) => {
            if (ingredient != null) {
              user
                .getRecipes({ where: { id: recipeId } })
                .then((recipes) => {
                  // console.log(recipes);
                  // let recipe = recipes.find((rec) => {
                  //   rec.id == recipeId;
                  // });
                  if (recipes.length > 0) {
                    recipes[0]
                      .addIngredients(ingredient)
                      .then((results) => {
                        res.status(200).send(results);
                      })
                      .catch((error) => {
                        console.log(error);
                        res.status(500).send("Something went wrong!");
                      });
                  }
                  else {
                     res.status(403).send("User does not have access to Recipe!");
                  }
                  
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).send("Something went wrong!");
                });
            } else {
              res.status(403).send("Ingredient Does not Exist!");
            }
          })
          .catch((error) => {
            console.log(error);
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
exports.removeIngredient = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let recipeId = req.body.recipeId;
  let ingredientId = req.body.ingredientId;
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
        Ingredient.findByPk(ingredientId)
          .then((ingredient) => {
            if (ingredient != null) {
              user
                .getRecipes({ where: { id: recipeId } })
                .then((recipes) => {
                  recipes[0]
                    .removeIngredients(ingredient)
                    .then((results) => {
                      res.status(200).send(ingredient);
                    })
                    .catch((error) => {
                      console.log(error);
                      res.status(500).send("Something went wrong!");
                    });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).send("Something went wrong!");
                });
            } else {
              res.status(403).send("Ingredient Does not Exist!");
            }
          })
          .catch((error) => {
            console.log(error);
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
exports.getIngredients = (req, res, next) => {
  console.log("***************REQUEST***********");
  console.log(req.body);
  console.log(req.query);
  Ingredient.findAll()
    .then((ings) => {
      res.status(200).send(ings);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong");
    });
};
