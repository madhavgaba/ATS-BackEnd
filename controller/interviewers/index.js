const router = require('express').Router();
const interviewerController = require('./interviewers.controller');

router.post('/getInterviewerById', interviewerController.getInterviewerById);
router.post(
  '/getAllSchedulesForInterviewer',
  interviewerController.getAllSchedulesForInterviewer
);
router.post('/sendCredentials', interviewerController.sendCredentials);

module.exports = router;
