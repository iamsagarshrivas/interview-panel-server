const mongoose = require('mongoose');

const scheduleInterviewSchema = mongoose.Schema(
    {
        candidate_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'candidate'
        },
        job_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'job'
        },
        interviewer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'interviewer'
        },
        schedule_date: String,
        schedule_time: String,
        interview_type: String,
        interview_level: String,
        result: String,
        post_offered: String,
        comments: String,
        acknowledgement: String,
        venue: String,
        dress_code: String,
        reporting_time: Date,
        other_info: String
    }
);

const schedule = module.exports = mongoose.model('schedule', scheduleInterviewSchema);