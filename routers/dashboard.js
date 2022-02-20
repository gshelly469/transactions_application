const route = require('express').Router();
const inTrans = require('../model/post_inTranaction');
const outTrans = require('../model/post_transactions');
const Users = require('../model/post_users');


route.get('/getcalculation' ,async (req, res) =>{
    const numUser  = await Users.countDocuments({});
    console.log(numUser);
    const per = '620f5a53c9620e42a4b43149';
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
    console.log(grandTotal[0]['total']);

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

        const acceptUsers = await inTrans.aggregate([
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
        console.log(acceptUsers);

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
                $match:{
                    acknowledgment:true
                }
            },
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
                $match:{
                    acknowledgment:true
                }
            },
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


        // for ( let  i = 0; i = allUsersOut.total.length; i++){
        //     allUsersOut.total[i] = allUsersOut.total[i] - grandTotal[0]['total']/numUser;
        // }

    }
    else{
        console.log('Transactions complete');
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
    

    const findPreviousTrans = inTrans.findOneAndUpdate({
        $and:[
            {
                personAccept_id:gMoney.personAccept_id
            },
            {
                personGive_id:gMoney.personGive_id
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

            if (doc == null){
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
        acknowledgment: false
    });

    const acknowledgeTrans = inTrans.findOneAndUpdate({
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