const route = require('express').Router();
const User = require('../model/post_users');
const enc = require('bcryptjs');

route.post('/addTheData' ,async (req, res) =>{

    // // Creating of password with salt
    const salt_pass = await enc.genSalt(10);
    const hashPass = await enc.hash(req.body.password, salt_pass);

    const data_user = new User({
        name_str : req.body.name,
        mobile : req.body.mobile,
        password : hashPass,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email
    });

    console.log(req.body);

    const userExists = await User.aggregate([{$match:{email:req.body.email}}],
    (err, doc)=>{
        if (err){ 
            console.log('errorr occuerrs');
            console.log(err);
            return res.status(400).send(err);
        }
        else{
            console.log('returned occuerrs');
            console.log(doc.length);

            if (doc.length === 0){
                data_user.save().then( data => {
                    return res.status(200).send(data);
                })
                .catch( err => {
                    console.log(err);
                    return res.status(400).send(err.message);
                })
            }
            else{
                return res.status(400).send("Email Id already exists");
            }
        }
    })

    

    // data_user.save().then( data => {
    //     res.send(data);
    // })
    // .catch(err =>{
    //     res.json({message:err});
    // }) 

});

module.exports = route;