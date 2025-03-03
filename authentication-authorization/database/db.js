const mongoose=require('mongoose');
require('dotenv').config({path:'../.env'});
const MONGO_URI=process.env.MONGO_URI;


const connectToDatabase=async()=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log('Successfully connected to Database');
      }
      catch(err){
        console.log("Error while connecting to Database",err.message);
        process.exit(1);
      }
}

module.exports=connectToDatabase;
