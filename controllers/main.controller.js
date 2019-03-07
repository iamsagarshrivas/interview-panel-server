const jwt = require('jsonwebtoken');
const path=require('path');
const config = require('../config/main');
const pincode = require('../models/pincode');

module.exports = {
    autheticateUser: function(req, res) {

        jwt.verify(req.token, config.secret, (err, authorizedData) => {
            if (err) {
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                //If token is successfully verified, we can send the autorized data 
                res.json({
                    message: 'Successful log in',
                    login: true,
                    _id:authorizedData._id,
                    role : authorizedData.role
                });
                console.log('SUCCESS: Connected to protected route');
            }
        })

    },
    verifyToken: function(req, res, next) {
        const header =  req.headers.authorization;
        if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            console.log('token->',token);
            req.token = token;
            next();
        } else {
            //If header is undefined return Forbidden (403)
            res.sendStatus(403)
        }

    },

    getPincodeData : (req,res)=>{
        pincode.findOne({pincode:req.params.pincode},(err,data)=>{
            if(err){
                console.log(err);
                res.json({Status : 'Error'})
            }
            else if(data){
                res.json({Status: 'Success', data:{city:data.districtname,state:data.statename}})
            }
        })

    },

    getFile : (req,res)=>{
        console.log('filename:',req.params.file_name);
        let publicDir = path.resolve(`${__dirname}/../uploads`);
        console.log(publicDir);
        
        res.sendFile(publicDir+'/'+req.params.file_name);
        
    }
}