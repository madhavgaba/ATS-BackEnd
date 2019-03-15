const router = require('express').Router();
const scheduleController = require('./schedule.controller');

router.get('/reject/:scheduleId', scheduleController.rejectInterview);
router.post('/submitResponse', scheduleController.submitResponse);
router.post('/getAllScheduledJobs', scheduleController.getAllScheduledJobs);
router.get('/:jobId/:candidateId', scheduleController.getCandidateHistory);

module.exports = router;
