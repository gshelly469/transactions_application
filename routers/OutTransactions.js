const route = require('express').Router();
const Trans = require('../model/post_transactions');

route.post('/addTransactions' ,async (req, res) =>{

    console.log(req.body);

    const data_user = new Trans({
        trip_name : req.body.trip_name,
        name_id : req.body.name_id,
        payment: req.body.payment,
        activity: req.body.activity
    });

    data_user.save().then( data => {
        res.send(data);
    })
    .catch(err =>{
        res.json({message:err});
    }) 

});

module.exports = route;