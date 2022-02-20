const express = require('express');
const mongoose = require('mongoose');
const create_user = require('./routers/admin')
const outsideTransactions = require('./routers/OutTransactions')
const inTransactions = require('./routers/InTransactions')
const dash = require('./routers/dashboard')

require('dotenv/config');

const port=5000
const app = express();
app.use( express.json());

//Connect to mongodb
mongoose.connect(process.env.DB_connection, ()=>{ console.log('connected to DB')})

app.use('/post_user', create_user);
app.use('/postTransactions', outsideTransactions);
app.use('/postInTransactions', inTransactions);
app.use('/getDashData', dash);





//LISTENING PORT
app.listen(process.env.PORT || port, ()=>{console.log('successfully deployed')});