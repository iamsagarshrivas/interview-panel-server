const schedule = require('../../models/schedule_interview');
var candidate = require('../../models/candidates_details');
var job = require('../../models/post_job');

module.exports = {
    getAllSchedule: (req, res) => {
        schedule.find({},{result:true,interview_type:true,schedule_date:true})
        .populate('candidate_id',{basicInfo:true})
        .populate('interviewer_id',{name:true})
        .populate('job_id',{isActive:true,jobTitle:true})
        .exec( (err, schedules) => {
            if (err) {
                res.json({ "msg": "cannot get data", "getData": false })
            }
            else {
                res.json(schedules);
            }
        })

    },

    updateSchedule: (req, res) => {
        schedule.findOneAndUpdate({ candidate_id: req.body.candidate_id, job_id: req.body.job_id }, {
            interviewer_id: req.body.interviewer_id,
            schedule_date: req.body.scheduleDate,
            schedule_time: req.body.scheduleTime,
            interview_type: req.body.interviewType,
            interview_level: req.body.interviewLevel,
            result: req.body.result,
            post_offered: null,
            comments: null,
            acknowledgement: null,
            venue: req.body.venue,
            dress_code: req.body.dressCode,
            reporting_time: req.body.reportingTime
        }, (err, result) => {
            if (err) {
                res.json({ err });
            }
            else {
                res.json({ result });
            }
        })
    },
    getScheduleByInterviewerId:(req,res)=>{        
        schedule.find({interviewer_id : req.params.interviewer_id})
        .populate('candidate_id',{basicInfo:true,_id:true})
        .exec((err,response)=>{
            if(err){
                res.json({err:err,getData:false});
            }
            else{
                res.json({response})
                //res.json({candidateName:response[0].candidate_id.basicInfo.candidateName,candidateEmail:response.candidate_id.basicInfo.candidateEmail});
            }
        })
    },

    getScheduleByCandidateId: (req, res) => {
        schedule.find({ candidate_id: req.params.candidate_id }, function (err, schedule) {
            if (err) {
                res.json({ "msg": "cannot get data", "getData": false })
            }
            else {

                job.aggregate([{
                    $lookup: {
                        from: "schedule",
                        localField: "job_id",
                        foreignField: "job_id",
                        as: "result"
                    }
                }], (err, response) => {
                    if (err) res.json({ err })
                    else res.json({ response, getJob: true, schedule });
                });
                // res.json(schedule);
            }
        })

    },
    getScheduleByType: (req, res) => {

    },

    getScheduleByJobId: (req, res) => {
        console.log("ooooooooooooooooooo",req.body);
        schedule.findOne({candidate_id:req.body.candidate_id,job_id:req.body.job_id},(err,result)=>{
            console.log("pppppppppppp",err,result);
            
            res.json({err,result});
        })

    },

    addNewSchedule: (req, res) => {
        schedule.find({
            candidate_id: req.body.candidate_id,
            job_id: req.body.job_id,
        }, (err, result) => {
            if (err) {
                console.log(err);

            }
            else {
                console.log('====>', result);
                if (result.length == 0) {
                    let newSchedule = new schedule({
                        candidate_id: req.body.candidate_id,
                        job_id: req.body.job_id,
                        result: 'applied'
                    });
                    newSchedule.save(function (err, schedule) {
                        if (err) {
                            console.log(err);

                            res.json({ 'msg': 'error', 'saved': false })
                        }
                        else {
                            console.log(schedule);
                            candidate.findOneAndUpdate({ _id: schedule.candidate_id }, { $addToSet: { jobId: schedule.job_id } }, { upsert: true }, (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.json({ err: err, 'updated': false })

                                }
                                else {
                                    console.log(result);
                                    res.json({ schedule, result, 'updated': true });

                                }
                            })
                        }
                    })
                }
            }
        })
    },
}