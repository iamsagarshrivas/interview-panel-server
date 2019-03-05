const mongoose = require('mongoose'),
bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase : true,
        unique : true,
        required : true
    },
    role : {
        type : String,
        enum : ['candidate','interviewer','admin'],
        default : 'candidate'
    
    },
    name : String,
    password:{
        type : String,
        require : true
    },
    lastLoginTime: Date,
    loginCount: Number,
    isActive : Boolean,
    otpVerified:Boolean,
    status: String
});

userSchema.pre('save',function(next){
    var user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10,function (err,salt){
            if(err){
                next(err);
            }
            else{
                bcrypt.hash(user.password,salt,function (err,hash){
                    if(err){
                        return next(err);
                    }
                    else{
                        user.password = hash;
                        next();
                    }
                });
            }
        });
    }
    else{
        return next();
    }
});

userSchema.methods.comparePassword = function (pw,cb){
    console.log("THiS",pw);
    let hashed = this.password;
    bcrypt.compare(pw,hashed,function(err,isMatch){
        console.log(pw, hashed);
        if(err){            
            
            console.log(err);
            return cb(err);
            
        }
        else{
            console.log('isMatch', isMatch);
            cb(null,isMatch);
        }
    })
}

var user = module.exports = mongoose.model('user',userSchema);