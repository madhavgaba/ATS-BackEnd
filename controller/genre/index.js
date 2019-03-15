const router = require('express').Router();
const genreConroller = require('./genre.controller');

router.get('/', genreConroller.allCategories);

module.exports = router;
