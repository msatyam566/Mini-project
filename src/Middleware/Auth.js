const jwt = require("jsonwebtoken")
const { decode } = require("punycode")


//===============Authentication===================//

const authentication = function(req,res,next){
    try{
        const token = req.headers["x-api-key"]
        if(!token)
        return res.status(403).send({status:false, msg: "Token is required in Header"})


        const decodeToken = jwt.verify(token,"library")
        if(!decodeToken){
           return res.status(403).send({status:false, msg:"Token is invalid"})
        }

//================Authorization==========================//

req.userId = decodeToken.userId;
next()


    }catch(error){
        return res.status(500).send({ status:false,msg:"error.message"})
    }
}


module.exports.authentication=authentication