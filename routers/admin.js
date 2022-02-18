const route = require('express').Router();
const Users = require('../model/post_users');
const enc = require('bcryptjs');

route.post('/addTheData' ,async (req, res) =>{

    // Creating of password with salt
    const salt_pass = await enc.genSalt(10);
    const hashPass = await enc.hash(req.body.password, salt_pass);


    console.log(req.body);

    const data_user = new Users({
        name_str : req.body.name,
        mobile : req.body.mobile,
        password : hashPass,
        age: req.body.age,
        gender: req.body.gender
    });

    data_user.save().then( data => {
        res.send(data);
    })
    .catch(err =>{
        res.json({message:err});
    }) 

});

module.exports = route;