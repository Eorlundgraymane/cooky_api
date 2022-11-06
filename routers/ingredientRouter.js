const express = require("express");
const router = express.Router();

const ingredientController = require("../controllers/ingredientController");

router.get("/allIngredients", ingredientController.getIngredients);
router.post("/createIngredient", ingredientController.createIngredient);
router.post("/addIngredient", ingredientController.addIngredient);
router.post("/removeIngredient", ingredientController.removeIngredient);


module.exports = router;
