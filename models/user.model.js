const mongoose = require('mongoose')
const { subscribe } = require('../routes/user.route')
const Schema = mongoose.Schema

const newSchema = new Schema({
    name:String,
    email:String,
    mobileNumber:String,
    password:String,
    subscription : String,
   
})

module.exports = mongoose.model('User',newSchema)