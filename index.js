const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase',{ useNewUrlParser: true, useUnifiedTopology: true })



app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/',require('./routes/user.route'))
app.listen(port,()=>{
    console.log('port running on '+port)
})