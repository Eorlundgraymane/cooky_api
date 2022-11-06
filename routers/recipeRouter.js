const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipeController");

router.get("/", recipeController.getRecipe);
router.get("/allRecipes", recipeController.getAllRecipes);
router.get("/userRecipes", recipeController.getUserRecipes);
router.post("/createRecipe", recipeController.createRecipe);
router.post("/addDish", recipeController.addDish);
router.post("/removeRecipe", recipeController.removeRecipe);
router.post("/deleteRecipe", recipeController.deleteRecipe);

module.exports = router;
