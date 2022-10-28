const User = require("../models/user");
const Recipe = require("../models/recipe");
const SubRecipe = require("../models/subRecipe");
const Ingredient = require("../models/ingredient");

exports.getUser = (req, res, next) => {
    let userId = req.body.userId || req.query.userId;
    console.log("REQUEST***********");
    console.log(req.body)
    console.log(req.query);
    User.findOne({
        where:{
            id: userId
        }
    }).then(user => {
        if (user != null) {
            res.status(200).send(user);
        }        
        else {
            res.status(404).send("User not Found!");
        }
    }).catch(error => {
        console.log(error);
        res.status(500).send("User not Found!");
    })

};