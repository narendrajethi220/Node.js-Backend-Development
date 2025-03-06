const mongoose=require('mongoose');
const MONGO_URI=process.env.MONGO_URI;

const connectToDatabase=async()=>{
    try{
     await mongoose.connect(MONGO_URI);
     console.log('Database Connected Successfully');     
    }
    catch(err){
        console.log('Error while connecting to database');
    }
}
module.exports=connectToDatabase;
