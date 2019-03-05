const mongoose = require('mongoose');

const pincodeSchema = mongoose.Schema({
    officename: String,
    pincode: Number,
    officetype: String,
    Deliverystatus: String,
    divisionname: String,
    regionname: String,
    circlename: String,
    taluk: String,
    districtname: String,
    statename: String
});

var pincode = module.exports = mongoose.model('pincode',pincodeSchema);