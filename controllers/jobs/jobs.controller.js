const job = require('../../models/post_job');

module.exports = {

    getAllJobs: (req, res) => {
        job.find({ isActive: true }, (err, jobs) => {
            if (err) {
                res.json({ err: err, find: false })
            }
            else {
                res.json(jobs);
            }
        });
    },

    getJobById: (req, res) => {
        job.findOne({ _id: req.params._id }, (err, jobs) => {
            if (err) {
                res.json({ msg: 'err', get: false })
            }
            else {
                res.json(jobs);
            }
        });
    },

    addNewJob: (req, res) => {
        let newJob = new job(req.body);

        newJob.save((err, job) => {
            if (err) {
                console.log('error', err);

                res.json({ "msg": "cannot save job", "saved": false })
            }
            else {
                res.json({ "msg": "saved job successfully", "saved": true })
            }
        })
    },

    updateJob: (req, res) => {
        job.update({ _id: req.body.job_id }, {
            $set: {
                jobTitle: req.body.formValue.jobTitle,
                jobType: req.body.formValue.jobType,
                jobDescription: {
                    jobLocation: req.body.formValue.jobDescription.jobLocation,
                    jobProfile: req.body.formValue.jobDescription.jobProfile,
                    minQualification: req.body.formValue.jobDescription.minQualification,
                    minExperience: req.body.formValue.jobDescription.minExperience,
                    packageOffered: req.body.formValue.jobDescription.packageOffered
                },
                responsibilities: req.body.formValue.responsibilities,
                lastDayToApply:req.body.formValue.lastDayToApply

            }
        }, (err, result) => {
            if (err) {
                res.json({ err: err })
            }
            else {
                res.json({ msg: result })
            }
        })
    },

    deleteJob: (req, res) => {
        job.update({ _id: req.body.job_id }, { $set: { isActive: false } }, (err, result) => {
            if (err) {
                res.json({ err: err })
            }
            else {
                res.json({ msg: result })
            }
        })
    },


}