const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    personAccept_id : {
        type:String,
        required:true,
        minlength:2
    },
    trans_date : {
        type:Date,
        default:Date.now
    },
    personGive_id : {
        type:String,
        required:true,
        minlength:2
    },
    payment:{   
        type:Number,
        required:true,
        min:0
    }
});

module.exports = mongoose.model('inTransactions', transactionSchema)
