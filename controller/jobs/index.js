const router = require('express').Router();

const jobController = require('./jobs.controller');

router.get('/allJobs', jobController.getAllJobs);
router.post('/applyJob', jobController.applyJob);
router.post('/jobDetails/:id', jobController.jobDetails);
router.post('/candidatesForJobId', jobController.getCandidatesForJob);
router.post('/getJobForId', jobController.getJobForId);
router.post('/close', jobController.closeApplication);
router.post('/getAllApplications', jobController.getAllApplications);
router.get('/allJobIds', jobController.getAllJobIDs);

module.exports = router;
