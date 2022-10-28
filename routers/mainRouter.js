const express = require("express");
const router = express.Router();

const api = require("../controllers/apiController");
const getRouter = require("../routers/getRouter");
const postRouter = require("../routers/postRouter");

router.use("/", api.ensureAdminAccount);
router.use("/post", postRouter);
router.use("/get", getRouter);
router.use("/", api.serverCheck);

module.exports = router;
