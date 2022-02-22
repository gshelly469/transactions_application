const route = require('express').Router();
const outTrans = require('../model/post_transactions');

route.get('/getOutTransactions', async (req, res) =>{
    const alldata = await outTrans.find({});
    res.send(alldata);
});

module.exports = route;