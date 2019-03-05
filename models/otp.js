const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    user_id:String,
    otp:Number,
    verified:Boolean,
    expiryTime:{
        type:Number,
        default:300000
    },
    sendTime:{
        type:Number,
        require:true
    }
});

var otp=module.exports = mongoose.model('otp',otpSchema);