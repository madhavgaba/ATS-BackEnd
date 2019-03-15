const express = require('express');

const router = express.Router();
const apiController = require('../controller');

router.use('/api', apiController);

module.exports = router;
