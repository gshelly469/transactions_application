const express = require('express');
const mongoose = require('mongoose');
const create_user = require('./routers/admin')
require('dotenv/config');

const port=5000
const app = express();
app.use( express.json());

//Connect to mongodb
mongoose.connect(process.env.DB_connection, ()=>{ console.log('connected to DB')})

app.use('/post_user', create_user);

//LISTENING PORT
app.listen(process.env.PORT || port, ()=>{console.log('successfully deployed')});