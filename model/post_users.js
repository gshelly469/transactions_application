const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    name_str : {
        type:String,
        required:true,
        minlength:2
    },
    date_name : {
        type:Date,
        default:Date.now
    },
    mobile : {
        type:Number,
        required:true,
        min : 1000000000,
        max : 9999999999
    },
    password : {
        type:String,
        required:true,
        minlength:8
    },
    age:{
        type:Number,
        required:true,
        min:0,
        max:100
    },
    gender:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('Users', user_schema)
