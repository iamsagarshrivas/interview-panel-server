const router = require('express').Router();
const candidateController = require('./candidate.controller');
var multerFile  = require('./middleware/multerFile');

router.get('/', candidateController.getAllCandidates);
router.get('/:id',candidateController.getCandidateById);
router.post('/add-candidate',candidateController.addNewCandidate);
router.post('/update-candidate',candidateController.updateCandidate);
router.post('/update-candidate-job',candidateController.updateCandidateJob);
router.post('/verify-otp',candidateController.verifyOtp);
router.post('/upload',multerFile.candidateUploads,candidateController.uploadResumeFile)

module.exports = router;