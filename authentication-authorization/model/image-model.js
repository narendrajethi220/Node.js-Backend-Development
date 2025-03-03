const mongoose=require('mongoose');

const imageSchema=new mongoose.Schema({
    url:{
        type:"String",
        required:[true,"url is required"],
    }
    , 
    publicId:{
        type:"String",
        required:[true, "publicId is required"],
    },
    uploadedBy:{
        type:"String",
        required:[true,"image must be uploaded by someone"],
    }
},{timestamps:true});

module.exports=mongoose.model('image',imageSchema);