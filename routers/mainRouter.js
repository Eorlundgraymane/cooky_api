const express = require('express');
const router = express.Router();

const api = require('../controllers/apiController');

router.use('/checkserver', api.serverCheck);
router.use("/", api.ensureAdminAccount);

module.exports = router;