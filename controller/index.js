const express = require('express');

let router = express.Router();

let authRouter = require('./auth/index');
let jobRouter = require('./jobs');
let candidateRouter = require('./candidate');
let interviewerRouter = require('./interviewers');
let adminController = require('./admin');
let genreController = require('./genre');
let scheduleController = require('./schedule');

router.use('/auth', authRouter);
router.use('/admin', adminController);
router.use('/genre', genreController);
router.use('/job', jobRouter);
router.use('/candidate', candidateRouter);
router.use('/schedule', scheduleController);
router.use('/interviewer', interviewerRouter);

module.exports = router;
