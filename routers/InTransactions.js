const route = require('express').Router();
const Trans = require('../model/post_inTranaction');

route.post('/addInTransactions' ,async (req, res) =>{

    console.log(req.body);

    const data_user = new Trans({
        personAccept_id : req.body.personAccept_id,
        personGive_id : req.body.personGive_id,
        payment: req.body.payment,
        acknowledgment: req.body.acknowledgment
    });

    data_user.save().then( data => {
        res.send(data);
    })
    .catch(err =>{
        res.json({message:err});
    }) 

});

module.exports = route;