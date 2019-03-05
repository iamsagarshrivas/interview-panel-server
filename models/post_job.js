const mongoose = require('mongoose');

const postJobSchema = mongoose.Schema(
  {
    jobTitle:String,
      jobType:String,
      jobDescription:{
        jobLocation:String,
        jobProfile:String,
        minQualification:String,
        minExperience:Number,
        packageOffered:Number
      },
      responsibilities:String,
      lastDayToApply:Date,
      creationDate:Date,
      creationDateMillis:Number,
      isActive:Boolean
  }
);

const job=module.exports=mongoose.model('job',postJobSchema);