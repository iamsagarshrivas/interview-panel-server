const mongoose = require('mongoose');
const interviewerSchema= mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        email:String,
        name:String,
        mobile:Number,
        role:String
    }
);

const interviewer = module.exports = mongoose.model('interviewer',interviewerSchema);