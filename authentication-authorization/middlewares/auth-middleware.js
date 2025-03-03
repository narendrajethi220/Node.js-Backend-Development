const jwt=require('jsonwebtoken');
require('dotenv').config({path:'../.env'});
const SERCRET_KEY=process.env.JWT_SECRET_KEY;

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Access denied",
        })
    }
    try{
        const decodedToken=jwt.verify(token,SERCRET_KEY);
        req.userInfo=decodedToken;
        next();
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Access Denied!"
        })
    }
}

module.exports=authMiddleware;