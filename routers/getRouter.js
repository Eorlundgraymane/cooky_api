const express = require("express");
const router = express.Router();

const getController = require("../controllers/getController");

router.get("/user", getController.getUser);

module.exports = router;
