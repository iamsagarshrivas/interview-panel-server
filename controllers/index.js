const router = require('express').Router();
const mainController = require('./main.controller');
const jobRouter = require('./jobs/index');
const interviewerRouter = require('./interviewer/index');
const candidateRouter = require('./candidate/index');
const scheduleRouter = require('./schedule/index');
const userRouter = require('./user/index');


router.use('/job', jobRouter);
router.use('/interviewers', interviewerRouter);
router.use('/candidate', candidateRouter);
router.use('/schedule',scheduleRouter);
router.use('/login',userRouter);
router.use('/user',userRouter);

router.get('/get-file/:file_name',mainController.getFile);
router.get('/authenticate',mainController.verifyToken,mainController.autheticateUser);
router.get('/pincode/:pincode',mainController.getPincodeData)


module.exports = router;