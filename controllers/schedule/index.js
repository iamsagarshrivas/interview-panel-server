const router = require('express').Router();
const scheduleController = require('./schedule.controller');

router.get('/',scheduleController.getAllSchedule);
router.get('/candidate/:candidate_id',scheduleController.getScheduleByCandidateId);
router.get('/interviewer/:interviewer_id',scheduleController.getScheduleByInterviewerId);

router.post('/job/',scheduleController.getScheduleByJobId);
router.post('/update-schedule',scheduleController.updateSchedule);
router.get('/:type',scheduleController.getScheduleByType);
router.post('/add-schedule',scheduleController.addNewSchedule);

module.exports = router;