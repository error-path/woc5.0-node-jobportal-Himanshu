const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    cpassword:{
        type: String,
        required: true,
        unique: true
    },
    req_cpi:{
        type : Number,
        required: true
    },
    req_age:{
        type : Number,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    package:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

const Userdb_1 = mongoose.model('Company Registration', schema);

module.exports = Userdb_1;