var mongoose=require('mongoose');
var db = require('../db/database');

// create an schema
var userSchema = new mongoose.Schema({
            email: String,
            password:String,
            name:String,
            age: Number,
            country: String
        });

userTable=mongoose.model('users',userSchema, 'UserData');
        
module.exports = userTable