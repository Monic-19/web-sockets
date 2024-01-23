const jwt =  require("jsonwebtoken")
const User = require("../models/userSchema");

const authMiddleware = async(req, res, next) => {
    const token = req.header("Authorization");

    if(!token)
    return res.status(401).json({message : "Unauthorized HTTP, Token not provided"})

    const jwtToken = token.replace("Bearer", "").trim();

    try {
        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET)

        
        const userData = await User.findOne({_id : isVerified.id}).select({password : 0})
        
        // console.log("User daata - ",userData)

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
     

        next();
    } catch (error) {
        return res.status(401).json({message : "Unauthorized, Invalid token"})
    }


}

module.exports = authMiddleware;