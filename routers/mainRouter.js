const express = require("express");
const router = express.Router();

const api = require("../controllers/apiController");
const userRouter = require("../routers/userRouter");
const recipeRouter = require("../routers/recipeRouter");
const ingredientRouter = require("../routers/ingredientRouter");

router.use("/", api.ensureAdminAccount);
router.use("/user", userRouter);
router.use("/recipe", recipeRouter);
router.use("/ingredient", ingredientRouter);
router.use("/", api.serverCheck);

module.exports = router;
