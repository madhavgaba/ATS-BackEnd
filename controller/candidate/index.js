const router = require('express').Router();
const candidateController = require('./candidate.controller');
const multer = require('../../middleware/multer/multer.middleware');

router.get('/getAllCandidates', (req, res) => {
  res.status(200).send('Candidate working');
});

router.get('/:id', candidateController.getCandidateProfile);
router.post('/signUp', multer.candidateUploads, candidateController.signUp);
router.post('/getAllAppliedJobs', candidateController.getAllAppliedJobs);
router.get('/getUploads/:fileName', candidateController.getUploads);
router.post('/otpgen', candidateController.createOtp);
router.get('/otpverify/:candidateId/:otp', candidateController.matchOtp);
router.post('/sendemail', candidateController.createEmail);
router.get('/matchEmail/:id', candidateController.matchEmail);
router.post(
  '/getAllDetailsOfCandidate',
  candidateController.getAllDetailsOfCandidate
);
router.post('/updateProfile', candidateController.onProfileUpdate); 

module.exports = router;
