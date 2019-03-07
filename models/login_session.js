const mongoose = require('mongoose');

const loginSessionSchema = mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        email:String,
        last_login_time:Date,
        login_count:Number,
        status:Boolean
    }
);

const session = module.exports = mongoose.model('session',loginSessionSchema);