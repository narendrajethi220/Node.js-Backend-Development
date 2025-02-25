const express = require('express');
const mongoose  = require('mongoose');
require('dotenv').config({path:'../.env'}); // Load .env file

const app = express();
const URI=process.env.MONGO_URI;
mongoose.connect(URI).then(()=>{
    console.log('Database Connected Successfully');
}).catch((e)=>{
    console.log(e);
})

//creating new schema
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    isActive:Boolean,
    tags:[String],
    createdAt:{type:Date,default:Date.now}
})

//creating new Model
const User=mongoose.model('User',userSchema);


async function queryExample(){
    try{
    //   const newUser=await User.create({
    //     name:"New User",
    //     email:'newuser@gmail.com',
    //     age:23,
    //     isActive:false,
    //     tags:["developer","engineer","designer"]
    //   })    
    //   console.log('New User Created',newUser);
    
    // // getting all user
    //   const getAllUser=await User.find({});
    //   console.log(getAllUser);
   
    //getting user with specific field
    // const getUserOfActiveFalse=await User.find({isActive:false});
    // console.log(getUserOfActiveFalse);

    //getting firstMatchedDocument
    // const getFirstMatchedDocuments=await User.findOne({name:'Jonh Doe'});
    // console.log(getFirstMatchedDocuments);

    //get user by id
    // const getUserById=await User.findById('6794fc95fb81decf0faaeadd');
    // console.log(getUserById);

//    getting specific field of Users
// const getSpecificField=await User.find().select('name email -_id');//inside single quotes
// console.log(getSpecificField);

//getting limited number of users with skipping some user
// const limitedUser=await User.find().limit(3).skip(1);
// console.log(limitedUser);

// sorting users
// const sortingUser=await User.find().sort({age:-1});
// console.log(sortingUser);

//counting those document where isActive : false
// const countIsActive=await User.countDocuments({isActive:false});
// console.log(countIsActive);

//delete User
// const deletedUser=await User.findByIdAndDelete('6794fd8be3a21b6687796712');
// console.log(deletedUser);

//udpate user
// const updatedUser=await User.findByIdAndUpdate('6794fdb68285d4cfa20ed8f0',
//     {
//     $set:{age:32,email:'john@gmail.com'},
//     $push:{tags:'Youtuber'}
// },{new:true})
// console.log(updatedUser);
}

    catch(err){
        console.log(err);
    }
    finally{
        await mongoose.connection.close();
    }  
}

queryExample();




const PORT = process.env.PORT || 5000; // Default to 5000 if .env variable is missing
console.log("PORT:", PORT);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
