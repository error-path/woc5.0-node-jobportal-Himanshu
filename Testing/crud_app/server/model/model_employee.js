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
    phone:{
        type : Number,
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
    batch:{
        type : Number,
        required: true
    },
    cpi:{
        type : Number,
        required: true
    },
    age:{
        type : Number,
        required: true
    },
    techstack:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    }
})

const Userdb_2 = mongoose.model('Employee Registration', schema);

module.exports = Userdb_2;