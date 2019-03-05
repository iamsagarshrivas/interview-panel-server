const userDoc = require('../../models/user');
const candidateDoc = require('../../models/candidates_details');
const interviewerDoc = require('../../models/interviewer');
const jwt = require('jsonwebtoken'),
    config = require('../../config/main');
// const admin = require('../../models/admin);

module.exports = {
    addNewUser: (req, res) => {

    },

    getUserById: (req, res) => {

    },

    loginUser: (req, res) => {
        var userCreds = {
            email: req.body.email,
            pwd: req.body.password
        }


        userDoc.findOne({ email: userCreds.email, isActive: true }, (err, user) => {
            if (err) {
                res.json({ 'err': err, 'login': false })
            }
            if (!user) {
                res.json({ 'err': 'user not found', login: false });
            }
            else {
                console.log(user);
                
                user.comparePassword(userCreds.pwd, function (err, isMatch) {
                    console.log(isMatch);
                    
                    if (isMatch && !err) {
                        var token = jwt.sign(user.toJSON(), config.secret, {
                            expiresIn: 10080
                        });
                        res.json({ 'msg': 'logged in', token: token, login: true });
                    }
                    else{
                        res.json({
                            'err':'Authentication Failed. Password Incorrect',
                            login : false
                        })
                    }
                })
            }
        })

    }
}