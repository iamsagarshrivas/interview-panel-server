const user = require('../../models/user');
const interviewer = require("../../models/interviewer");

module.exports = {

    getAllInterviewers: (req, res) => {
        interviewer.find({}, (err, interviewers) => {
            if (err) {
                res.json({ "msg": "cannot get data", "getData": false })
            }
            else {
                res.json(interviewers);
            }
        })
    },

    getInterviewerById: (req, res) => {
        interviewer.find({ _id: req.params._id }, (err, interviewers) => {
            if (err) {
                res.json({ "msg": "cannot get data", "getData": false })
            }
            else {
                res.json(interviewers);
            }
        })
    },

    addNewInterviewer: (req, res) => {
        // TODO : add new user
        let newUser = new user({
            email: req.body.email,
            role: 'interviewer',
            name: req.body.name,
            password: req.body.password,
            lastLoginTime: Date.now(),
            loginCount: 0,
            isActive: true,
            status: 'active'
        });

        newUser.save((err, user) => {
            if (err) {
                res.json({ 'err1': err, 'saved': false });
            }
            else {
                let newInterviewer = new interviewer({
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    mobile: req.body.mobileNumber,
                    role: req.body.role
                });
                newInterviewer.save((err, interviewer) => {
                    if (err) {
                        res.json({ 'err2': err, 'saved': false });
                    }
                    else {
                        res.json({ 'msg1': user, 'msg2': interviewer, 'saved': true })
                    }

                });
            }
        })

    },

    updateInterviewer: (req, res) => {
        // logic
        //res.send
    },
}