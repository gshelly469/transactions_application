const route = require('express').Router();
const Users = require('../model/post_users');
const enc = require('bcryptjs');
const jwt = require('jsonwebtoken');

route.post('/login', async (req, res) =>{

    console.log(req.body.id);
    const user = await Users.findOne({'_id':req.body.id});
    // console.log(user);

    if (!user) return res.status(400).send('Username not found');
    console.log(req.body.password);
    console.log(user.password);

    
    const pass = await enc.compare(req.body.password, user.password);
    console.log(pass);
    if (!pass) return res.send('password incorrect');

    const signed_token = jwt.sign({'_id':user._id,
                                    'name':user.name_str },process.env.Secret_key_jwt )
    
    // return res.send(signed_token);
    return res.header('auth-token', signed_token).send({
        token:signed_token,
        userid:req.body.id
    });
   
});

module.exports = route;