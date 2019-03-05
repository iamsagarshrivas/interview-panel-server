const mongoose = require('mongoose');
const interviewerSchema= mongoose.Schema(
    {
        _id:String,
        email:String,
        name:String,
        mobile:Number,
        role:String
    }
);

const interviewer = module.exports = mongoose.model('interviewer',interviewerSchema);