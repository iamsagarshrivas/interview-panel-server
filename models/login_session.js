const mongoose = require('mongoose');

const loginSessionSchema = mongoose.Schema(
    {
        id:String,
        email:String,
        last_login_time:Date,
        login_count:Number,
        status:Boolean
    }
);

const session = module.exports = mongoose.model('session',loginSessionSchema);