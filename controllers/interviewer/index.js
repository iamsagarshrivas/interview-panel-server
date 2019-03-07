const router = require('express').Router();
const interviewerController = require('./interviewer.controller');
console.log(interviewerController);

router.get('/', interviewerController.getAllInterviewers);
router.get('/:id',interviewerController.getInterviewerById);
router.post('/add-interviewer',interviewerController.addNewInterviewer);
router.post('/update-interviewer',interviewerController.updateInterviewer);
router.post('/update-candidate-result',interviewerController.updateCandidateResult);
router.post('/send-mail',interviewerController.sendEmail);

module.exports = router;