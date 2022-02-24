const route = require('express').Router();
const inTrans = require('../model/post_inTranaction');
const outTrans = require('../model/post_transactions');
const Users = require('../model/post_users');


route.get('/getcalculation' ,async (req, res) =>{
    const numUser  = await Users.countDocuments({});
    console.log('number of users' ,numUser);
    const per = req.query.per;
    console.log('All the parameters' ,req.query);

    const grandTotal = await outTrans.aggregate([
        {
            $group:{
                _id:'',
                total:{
                    $sum:"$payment"
                }
            }
        },
        {
            $project:{
                _id:0,
                total:1
            }
        }
    ]);

    if (grandTotal.length===0){
        console.log('No Transactions');
        const resObj = {
            userRole:"No Payment",
            netAmout:0,
            finalObjectArray:0
        };
        return res.send(resObj)
    }


    console.log('total number of users', grandTotal[0]['total']);

    const perTotalTrip = await outTrans.aggregate([
        {
            $match:{
                name_id:per
            }
        },
        {
            $group:{
                _id:'',
                total:{
                    $sum:"$payment"
                }
            }
        },
        {
            $project:{
                _id:0,
                total:1
            }
        }
    ]);
    console.log('id of person is  ', per);
    console.log('Person total trip transactions', perTotalTrip[0]['total'])
    const netValue = perTotalTrip[0]['total']-grandTotal[0]['total']/numUser;
    console.log(netValue);

    const totalPaymentGiven = await inTrans.aggregate([
        {
            $match:{
                personGive_id:per,
                acknowledgment:true
            }
        },
        {
            $group:{
                _id:'',
                total:{
                    $sum:"$payment"
                }
            }
        },
        {
            $project:{
                _id:0,
                total:1
            }
        }
    ]);
    console.log(totalPaymentGiven);

    const totalPaymentAccept = await inTrans.aggregate([
        {
            $match:{
                personAccept_id:per
            }
        },
        {
            $group:{
                _id:'',
                total:{
                    $sum:"$payment"
                }
            }
        },
        {
            $project:{
                _id:0,
                total:1
            }
        }
    ]);
    
    if (totalPaymentGiven.length === 0 && totalPaymentAccept.length === 0){
        var totalInterPayment = 0;
    }
    else if (totalPaymentGiven.length === 0 && totalPaymentAccept.length >= 0){
        var totalInterPayment = totalPaymentAccept[0]['total']; 
    }
    else if (totalPaymentGiven.length >= 0 && totalPaymentAccept.length === 0){
        var totalInterPayment = -totalPaymentGiven[0]['total'];
    }
    else{
        var totalInterPayment = totalPaymentAccept[0]['total'] - totalPaymentGiven[0]['total'] ;
    }
    console.log(totalInterPayment, '------');

    const total = netValue - totalInterPayment

    console.log(total, 'final value')
    // sendObject = {
    //     total_netvalue:total
    // }

    

    if (total > 0){
        console.log('total is positive');

        const finalObjectArray = await inTrans.aggregate([
            {
                $match:{
                    personAccept_id:per,
                    acknowledgment:false
                }
            },
            {
                $project:{
                    _id:0,
                    personGive_id:1,
                    payment:1
                }
            }
        ]);
        const userRole = { userRole:"Acceptor",
                            netAmout:0};
        console.log(finalObjectArray);
        const finalObjectAccepter = {
            ...userRole,
            finalObjectArray
        };
        return res.send(finalObjectAccepter);

    }
    else if (total < 0){
        const allUsersOut = await outTrans.aggregate([
            {
                $group:{
                    _id:'$name_id',
                    total:{
                        $sum:"$payment"
                    }
                }
            }
        ]);
        console.log(allUsersOut);

        const allUsersInGive = await inTrans.aggregate([
            {
                $group:{
                    _id:'$personGive_id',
                    total:{
                        $sum:"$payment"
                    }
                }
            }
        ]);
        console.log(allUsersInGive);

        const allUsersInAccept = await inTrans.aggregate([
            {
                $group:{
                    _id:'$personAccept_id',
                    total:{
                        $sum:"$payment"
                    }
                }
            }
        ]);
        console.log(allUsersInAccept);

        let finalObjectArray = [];
        for (let i = 0; i < allUsersOut.length; i++) {
            finalObjectArray.push({
                _id: allUsersOut[i]._id,
                total: allUsersOut[i].total - grandTotal[0]['total']/numUser
            });
        }
        console.log(finalObjectArray);

        for (let i = 0; i < finalObjectArray.length; i++) {
            for (let j = 0; j < allUsersInGive.length; j++){
                if (allUsersInGive[j]._id === finalObjectArray[i]._id){
                    finalObjectArray[i].total = finalObjectArray[i].total + allUsersInGive[j].total;
                }
            }
        }
        console.log(finalObjectArray);

        for (let i = 0; i < finalObjectArray.length; i++) {
            for (let j = 0; j < allUsersInAccept.length; j++){
                if (allUsersInAccept[j]._id === finalObjectArray[i]._id){
                    finalObjectArray[i].total = finalObjectArray[i].total - allUsersInAccept[j].total;
                }
            }
        }
        console.log(finalObjectArray);

        let personNetAmount = 0;
        for (let i = 0; i < finalObjectArray.length; i++) {
            if (finalObjectArray[i]._id === per){
                personNetAmount = finalObjectArray[i].total;
            }
        }

        res.header("Access-Control-Allow-Origin", "*");
        
        const userRole = { userRole:"Payer",
                            netAmout:personNetAmount};
        
        const finalObjectPayer = {
            ...userRole,
            finalObjectArray
        }
        console.log("final object of payer", finalObjectPayer);
        return res.send(finalObjectPayer);
        // for ( let  i = 0; i = allUsersOut.total.length; i++){
        //     allUsersOut.total[i] = allUsersOut.total[i] - grandTotal[0]['total']/numUser;
        // }

    }
    else{
        console.log('Transactions complete');
        const resObj = {
            userRole:"No Payment",
            netAmout:0,
            finalObjectArray:0
        };
        return res.send(resObj)
    }
    

});

route.post('/gaveMoney', async (req, res)=> {

    // const per = '620f5a3ac9620e42a4b43147';
    // const per2 = '620f5ab9c9620e42a4b4314d';

    const gMoney = new inTrans({
        personAccept_id : req.body.personAccept_id,
        personGive_id : req.body.personGive_id,
        payment: req.body.payment,
        acknowledgment: false
    });
    

    const findPreviousTrans = await inTrans.findOneAndUpdate({
        $and:[
            {
                personAccept_id:gMoney.personAccept_id
            },
            {
                personGive_id:gMoney.personGive_id
            },
            {
                acknowledgment:gMoney.acknowledgment
            }
        ]
    },
    {
        payment:gMoney.payment
    },
    {new: true},
    (err, doc) => {
        if (err){
            console.log('errorr occuerrs');
            console.log(err);
        }
        else{
            console.log('returned occuerrs');
            console.log(doc);

            if (doc.length === 0){
                gMoney.save().then( data => {
                    res.send(data);
                })
                .catch( err => {
                    console.log(err);
                })
            }
            else{
                res.send(doc);
            }
        }
        
    });
    // console.log(findPreviousTrans);

    // const gMoney = new inTrans({
    //     personAccept_id : req.body.personAccept_id,
    //     personGive_id : req.body.personGive_id,
    //     payment: req.body.payment,
    //     acknowledgment: false
    // });

    // gMoney.save().then( data => {

    // })
    // .catch( err => {
    //     console.log(err);
    // });
});

route.post('/acknowledgeMoney', async (req, res)=> {
    const aMoney = new inTrans({
        personAccept_id : req.body.personAccept_id,
        personGive_id : req.body.personGive_id,
        acknowledgment: true
    });

    const acknowledgeTrans = await inTrans.findOneAndUpdate({
        $and:[
            {
                personAccept_id:aMoney.personAccept_id
            },
            {
                personGive_id:aMoney.personGive_id
            }
        ]
    },
    {
        acknowledgment:aMoney.acknowledgment
    },
    {new: true},
    (err, doc) => {
        if (err){
            console.log('errorr occuerrs');
            console.log(err);
            return res.send(doc);
        }
        else{
            console.log('returned occuerrs');
            return res.send(doc);
        }
    }
    )
});

module.exports = route;