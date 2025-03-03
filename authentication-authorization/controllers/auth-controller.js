const People=require('../model/user-model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config({path:'../.env'});
const SECRET_KEY=process.env.JWT_SECRET_KEY;

//registrating user
const userRegister=async(req,res)=>{
try{
const {username, email,password, role}=req.body;
// console.log(req.body);

const userExist=await People.findOne({$or:[{username},{email}]});
// console.log(userExist);
if(userExist){
    return res.status(400).json({
        success:false,
        message:'User Already Exists',
    })
}
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);

const newlyCreatedUser=new People({
    username:username,
    email:email,
    password:hashedPassword,
    role:role||'user'
})
await newlyCreatedUser.save();
if(newlyCreatedUser)
{
    res.status(200).json({
        success:true,
        message:"User Registered Successfully",
    })
}
else{
    res.status(400).json({
        success:false,
        message:'Unable to register data'
    })
}
}
catch(err){
    res.status(500).json({
        success:false,
        message:"Error while Registering User, Please try again !",
        data:err.message,
    })
}
}

//login user
const userLogin=async(req,res)=>{
    try{
    const {username, password}=req.body;
    const  userExist=await People.findOne({username});
    if(!userExist){
        return res.status(404).json({
            success:false,
            message:"invalid username or password"
        })
    }
    const isPasswordCorrect=await bcrypt.compare(password,userExist.password);
    if(!isPasswordCorrect){
        return res.status(404).json({
            success:false,
            message:"Invalid username or password"
        })
    }
    //creating token
    const accessToken =jwt.sign({
        userId:userExist._id,
        username:userExist.username,
        role:userExist.role
    },SECRET_KEY,{
        expiresIn:'15m'
    });
    res.status(200).json({
        success:true,
        message:"Logged in successfully",
        accessToken
    })  

}catch(err){
        res.status(500).json({
            success:false,
            message:"Error While Login"
        })
    }

}

//change password 
const changePassword=async(req,res)=>{
    try{
        const userId=req.userInfo.userId;
        // console.log(userId);
        const{oldPassword,newPassword}=req.body;
        
        const user=await People.findById(userId);
        if(!userId){
            return res.status(400).json({
                success:false,
                message:'User not found!'
            })
        }
       
        const isPasswordMatch=await bcrypt.compare(oldPassword,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Some error occurred! Please try again",
            })
        }

        const salt=await bcrypt.genSalt(10);
        const newHashedPassword=await bcrypt.hash(newPassword,salt);
        user.password=newHashedPassword;

        await user.save();
        res.status(200).json({
            success:true,
            message:"Password changes successfully",
        }) 
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Error while changing password!"
        })
    }
}



module.exports={userRegister,userLogin,changePassword};