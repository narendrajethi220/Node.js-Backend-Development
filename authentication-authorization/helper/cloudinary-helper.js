const cloudinary = require('../config/cloudinary');

const uploadToCloudinary=async(filePath)=>{
    try{
       const res=await cloudinary.uploader.upload(filePath);
       return {
         url:res.secure_url,
         publicId:res.public_id
      }
    }catch(err){
        console.error('Error while uploading File to Cloudinary', err.message);
    }
}
module.exports=uploadToCloudinary;