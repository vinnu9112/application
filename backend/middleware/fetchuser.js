var jwt = require('jsonwebtoken');

const JWT_SECRET = "thisisatoken"
 
const fetchuser = (req, res, next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error: "please authenticate using a valid token"})
    }
    try{
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;  //changes
    next();
    }
    catch (error){
        res.status(401).send({error:"some error occured"})
    }


}

module.exports = fetchuser;