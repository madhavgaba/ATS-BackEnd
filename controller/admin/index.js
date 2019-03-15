const router = require('express').Router();
const adminController = require('./admin.controller');

router.post('/addjob', adminController.addJob);
router.post('/addInterviewer', adminController.addInterviewer);
router.post('/addCategories', adminController.addCategory);
router.post('/addDesignation', adminController.addDesignation);
router.get('/allDesignation', adminController.allDesignation);
router.get('/allInterviewers', adminController.allInterviewers);
router.get('/allCandidates', adminController.allCandidates);
router.post('/schedule', adminController.setSchedule);
router.post(
  '/getAllApplicationsWithId',
  adminController.getAllApplicationsWithId
);
router.get('/track', adminController.trackStatus);
router.post('/findCandidateById', adminController.findCandidateById);
router.post('/changeScheduleStatus', adminController.changeScheduledStatus);
router.post('/addLocation', adminController.addLocation);
router.get('/getAllLocations', adminController.getAllLocations);

module.exports = router;
