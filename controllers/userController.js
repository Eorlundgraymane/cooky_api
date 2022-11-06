const User = require("../models/user");
const Recipe = require("../models/recipe");
const SubRecipe = require("../models/subRecipe");
const Ingredient = require("../models/ingredient");

exports.getUser = (req, res, next) => {
  let userId = req.body.userId || req.query.userId;
  console.log("REQUEST***********");
  console.log(req.body);
  console.log(req.query);
  User.findOne({
    where: {
      id: userId,
    },
    include: Recipe,
  })
    .then((user) => {
      if (user != null) {
        res.status(200).send(user);
      } else {
        res.status(404).send("User not Found!");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("User not Found!");
    });
};
exports.getAllUsers = (req, res, next) => {
  console.log("REQUEST***********");
  User.findAll({
    attributes: ["id", "username", "password"],
  })
    .then((users) => {
      if (users != null) {
        res.status(200).send(users);
      } else {
        res.status(404).send("User not Found!");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("User not Found!");
    });
};
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
