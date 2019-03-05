const router = require('express').Router();

const jobController = require('./jobs.controller');
router.get('/', jobController.getAllJobs);
router.get('/:id',jobController.getJobById);
router.post('/add-job',jobController.addNewJob);
router.put('/remove-job',jobController.deleteJob)
router.put('/update-job',jobController.updateJob);

module.exports = router;