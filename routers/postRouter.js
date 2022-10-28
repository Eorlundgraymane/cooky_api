const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.post("/createUser", postController.createUser);
router.post("/deleteUser", postController.deleteUser);
router.post("/createRecipe", postController.createRecipe);
router.post("/removeRecipe", postController.removeRecipe);
router.post("/deleteRecipe", postController.deleteRecipe);


module.exports = router;
