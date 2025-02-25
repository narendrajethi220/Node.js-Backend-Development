const mongoose=require('mongoose');
require('dotenv').config({path:'../.env'}); // Load .env file
const URI=process.env.MONGO_URI;

const connectToDatabase=async()=>{
try{
   await mongoose.connect(URI);
   console.log("Successfully connected to Database");
}
catch(error){
    console.error('An error occurred while connecting to the Database:',error.message);
    process.exit(1); //Indicates unsuccessful termination of the process.
 }
}

module.exports=connectToDatabase;