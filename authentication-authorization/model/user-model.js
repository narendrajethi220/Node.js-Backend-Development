const mongoose=require('mongoose');

const personSchema=new mongoose.Schema({
    username:{
        type:String, 
        required:[true,"username is required"],
        trim:true,
        min:[3,"minimum 3 charcter is required"],
        max:[50,"reached maximum character limit"] ,
        unique:[true,"must be unique"]  
    },
    email:{
        type:String, 
        required:[true,"email is required"],
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String, 
        required:[true,"password is required"],
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true});

module.exports= mongoose.model('person',personSchema);
