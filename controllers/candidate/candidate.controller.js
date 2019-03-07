const userData = require('../../models/user');
const candidate = require('../../models/candidates_details');
const Otp = require('../../models/otp');
const request = require('request');
const apiKey = 'b35bad4f-3f31-11e9-8806-0200cd936042';

module.exports = {
  getAllCandidates: (req, res) => {
    candidate.find({}, (err, registeredCandidates) => {

      res.json(registeredCandidates);
    });
  },

  verifyOtp: (req, res) => {
    Otp.findOne({ user_id: req.body._id, otp: req.body.otpValue }, (err, result) => {
      if (err) {
        console.log(err);

      }
      else {
        if (result != null) {
          if (new Date().getTime() - result.sendTime > result.expiryTime) {
            res.json({ verified: false, msg: 'otp expired' })
          }
          else {
            candidate.findByIdAndUpdate({ _id: req.body._id }, { otpVerified: true });
            Otp.findOneAndDelete({ user_id: req.body._id, otp: req.body.otpValue }, (e, d) => {
              console.log(e, d);

            })
            res.json({ verified: true, msg: 'otp verified success' })
          }
        }
        else {
          res.json({ verified: false, 'msg': 'wrong otp' });
        }

      }
    })
  },

  getCandidateById: (req, res) => {
    console.log(req);

    candidate.findById({ _id: req.params.id }, (err, candidate) => {
      if (err) {
        console.log(err);
        res.json({ err: 'cannot find' })
      }
      else {
        console.log(candidate);
        res.json({ candidate })
      }
    })
  },

  addNewCandidate: (req, res) => {

    console.log(req.body);

    //add new user

    let newUser = new userData({
      email: req.body.basicInfo.candidateEmail,
      name: req.body.basicInfo.candidateName,
      password: req.body.basicInfo.password,
      lastLoginTime: Date.now(),
      loginCount: 0,
      isActive: true,
      status: "active"
    });

    newUser.save((err, user) => {
      if (err) {
        console.log(err);

        res.json({ 'err1': err, 'saved': false })
      }
      else {
        let newCandidate = new candidate({
          _id: user._id,
          basicInfo: {
            candidateName: req.body.basicInfo.candidateName,
            candidateEmail: req.body.basicInfo.candidateEmail,
            mobileNumber: req.body.basicInfo.mobileNumber,
            gender: req.body.basicInfo.gender,
            age: req.body.basicInfo.age
          },
          educationalQualification: {
            highschool: {
              institute: req.body.educationalQualification.highschool.institute,
              passingYear: req.body.educationalQualification.highschool.passingYear,
              board: req.body.educationalQualification.highschool.board,
              percentage: req.body.educationalQualification.highschool.percentage,
              remark: req.body.educationalQualification.highschool.remark
            },
            intermediate: {
              institute: req.body.educationalQualification.intermediate.institute,
              passingYear: req.body.educationalQualification.intermediate.passingYear,
              board: req.body.educationalQualification.intermediate.board,
              percentage: req.body.educationalQualification.intermediate.percentage,
              remark: req.body.educationalQualification.intermediate.remark
            },
            graduation: {
              course: req.body.educationalQualification.graduation.course,
              stream: req.body.educationalQualification.graduation.stream,
              institute: req.body.educationalQualification.graduation.institute,
              passingYear: req.body.educationalQualification.graduation.passingYear,
              university: req.body.educationalQualification.graduation.university,
              collegeName: req.body.educationalQualification.graduation.collegeName,
              percentage: req.body.educationalQualification.graduation.percentage,
              remark: req.body.educationalQualification.graduation.remark
            },
          },
          residentialDetails: {
            currentAddress: {
              addLine1: req.body.residentialDetails.currentAddress.addLine1,
              addLine2: req.body.residentialDetails.currentAddress.addLine2,
              city: req.body.residentialDetails.currentAddress.city,
              state: req.body.residentialDetails.currentAddress.state,
              pincode: req.body.residentialDetails.currentAddress.pincode
            },
            permanentAddress: {
              addLine1: req.body.residentialDetails.permanentAddress.addLine1,
              addLine2: req.body.residentialDetails.permanentAddress.addLine2,
              city: req.body.residentialDetails.permanentAddress.city,
              state: req.body.residentialDetails.permanentAddress.state,
              pincode: req.body.residentialDetails.permanentAddress.pincode
            }
          },
          workExperience: {
            currentJobStatus: req.body.workExperience.currentJobStatus,
            startDate: req.body.workExperience.startDate,
            endDate: req.body.workExperience.endDate,
            jobProfile: req.body.workExperience.jobProfile,
            companyName: req.body.workExperience.companyName,
            jobLocation: {
              city: req.body.workExperience.jobLocation.city,
              state: req.body.workExperience.jobLocation.state,
              country: req.body.workExperience.jobLocation.country
            },
            description: req.body.workExperience.description
          },
          skillset: {
            skillSetName: req.body.skillset.skillSetName,
            skillLevel: req.body.skillset.skillLevel
          },
          referralDetails: {
            name: req.body.referralDetails.name,
            phoneNumber: req.body.referralDetails.phoneNumber,
            email: req.body.referralDetails.email,
            designation: req.body.referralDetails.designation
          },
          uploadDocuments:{
            resumeFile:req.body.uploadDocuments.resumeFile,
            videoResumeFile:req.body.uploadDocuments.videoResumeFile
          },
          otpVerified: false
        });

        newCandidate.save((err, candidate) => {
          if (err) {
            console.log(err);
            userData.findOneAndRemove({ _id: candidate._id });

            res.json({ 'err2': err, 'saved': false })
          }
          else {
            var oneTimePass = Math.floor(100000 + Math.random() * 900000);
            var otp = new Otp({
              user_id: candidate._id,
              otp: oneTimePass,
              verified: false,
              expiryTime: 300000,
              sendTime: new Date().getTime()
            });

            request.get('https://2factor.in/API/V1/' + apiKey + '/SMS/+91' + req.body.basicInfo.mobileNumber + '/' + oneTimePass, (err, getResult) => {
              if (err) {
                console.log(err);

              }
              else {
                otp.save((err, otpRes) => {
                  if (err) {
                    console.log(err);

                    res.json({ err });
                  }
                  else {
                    res.json({ 'msg1': user, 'msg2': candidate, msg3: otpRes, getResult, 'saved': true });

                  }
                })
              }
            });

          }
        })
      }
    })

    // then add new candidate
  },

  updateCandidate: (req, res) => {
    candidate.findByIdAndUpdate({ _id: req.body.id }, req.body.candiate, (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    });

  },

  updateCandidateJob: (req, res) => {
    candidate.findOneAndUpdate({ _id: req.body._id }, { $push: { jobId: req.body.job_id } }, (err, result) => {
      if (err) console.log('err', err);
      else console.log('result', result);


    });
  },

  uploadResumeFile: (req, res) => {
    res.json({ 'resumePath': req.files.defaultResumeLink[0].filename, 'videoPath': req.files.defaultVideoLink[0].filename })
  }
}