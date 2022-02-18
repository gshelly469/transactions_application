const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    trip_name : {
        type:String,
        required:true,
        minlength:2
    },
    trans_date : {
        type:Date,
        default:Date.now
    },
    name_id : {
        type:String,
        required:true,
        minlength:8
    },
    payment:{
        type:Number,
        required:true,
        min:0
    },
    activity : {
        type:String,
        required:true,
        minlength:2
    }
});

module.exports = mongoose.model('OutTransactions', transactionSchema)
