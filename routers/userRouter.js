const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.get("/allUsers", userController.getAllUsers);
router.post("/createUser", userController.createUser);
router.post("/deleteUser", userController.deleteUser);

module.exports = router;
