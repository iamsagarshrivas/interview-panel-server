const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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