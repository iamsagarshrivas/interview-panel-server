const multer = require('multer'),
path = require('path'),
storage = multer.diskStorage({
    destination : `${__dirname}/../../../uploads`,
    filename: function(req,file,cb){
        path.extname(file.originalname);
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

let upload = multer({
    storage:storage
});

module.exports = {
    candidateUploads: upload.fields([{
        name: 'defaultResumeLink',
        maxCount: 1
    },
{
    name: 'defaultVideoLink',
    maxCount : 1
}])
}
