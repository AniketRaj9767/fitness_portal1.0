const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
    //similar to primary key
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    
})

const User = mongoose.model("User",TrainerSchema);
module.exports = User