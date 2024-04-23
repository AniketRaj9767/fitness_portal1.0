const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    role:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phoneNo:{
        type:String
    },
    dob:{
        type:Date
    },
})

const User = mongoose.model("User",UserSchema);
module.exports = User