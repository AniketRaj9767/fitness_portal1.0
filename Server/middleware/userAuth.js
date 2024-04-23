const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async(req,res,next)=>{
    if(req.headers.authorization.startsWith('Bearer'))
   { var completetoken = req.headers.authorization.split(' ')[1];
    var token = completetoken.split('=')[1];}
    else
        var token = req.headers.authorization
try {
        const key = "Thisismykey@123";
        const data = jwt.verify(token,key);
        const usr = await User.findOne({_id:data.id});
        req.user = usr;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({message:error});
    }
}

module.exports = userAuth;