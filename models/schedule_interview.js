const mongoose = require('mongoose');

const scheduleInterviewSchema = mongoose.Schema(
    {
        candidate_id: String,
        job_id: String,
        interviewer_id: String,
        schedule_date: Date,
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