const user = require('../../models/user');
const interviewer = require("../../models/interviewer");
const schedule = require('../../models/schedule_interview');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

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
    updateCandidateResult:(req,res)=>{
        console.log(req.body._id,req.body.result);
        schedule.findOneAndUpdate({candidate_id:req.body._id},{result:req.body.result.result,comments:req.body.result.comment},(err,result)=>{
            if(err){
                res.json({err:'not updated',success:false});
            }
            else{
                res.json({msg:'updated succesfully',success:true});
            }
        })
        

    },

    sendEmail: (req, res) => {

        sgMail.send(msg,(err,result)=>{
            console.log(err,result);
            
            res.json({err,result});
        });

    },

    getInterviewerById: (req, res) => {
        interviewer.findOne({ _id: req.params.id }, (err, interviewers) => {
            if (err) {
                res.json({ "msg": "cannot get data", "getData": false })
            }
            else {
                res.json(interviewers);
            }
        })
    },

    addNewInterviewer: (req, res) => {

        console.log('works');
        

        var pwd = Math.random().toString(36).slice(-8);
        // TODO : add new user
        let newUser = new user({
            email: req.body.email,
            role: 'interviewer',
            name: req.body.name,
            password: pwd,
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
                        let msg = {
                            to: user.email,
                            from: 'adminteam@geminisolution.in',
                            subject: 'Login Credentials',
                            html: `<p>Hi ${user.name}, your login email is ${user.email} and password is :"${pwd}" (without quotes).</p>
                            <a href='http://localhost:4200/login>click here</a> to open your dashboard.
                            `,
                            
                        };

                        sgMail.send(msg,(err,result)=>{
                            if(err){
                                console.log(err);
                                res.send({'err3':err,saved:false});                                
                            }
                            else{
                                res.json({ 'msg1': user, 'msg2': interviewer,msg3:result, 'saved': true })
                            }
                        });
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