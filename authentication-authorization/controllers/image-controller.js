const Image=require('../model/image-model');
const uploadToCloudinary=require('../helper/cloudinary-helper');
const cloudinary=require('../config/cloudinary');

const uploadImage=async(req,res)=>{
    try{
    if(!req.file){
        return res.status(400).json({
            success:false,
            message:"File is required",
        })
    }
    const {url,publicId}=await uploadToCloudinary(req.file.path);
    const newlyUploaded=new Image({
        url:url,
        publicId:publicId,
        uploadedBy:req.userInfo.userId,
    })
  await newlyUploaded.save(); 
  res.status(200).json({
    success:true,
    message:'Image uploaded successfully',
    image:newlyUploaded
  });
  }catch(err){
        res.status(500).json({
            success:false,
            message:"Unable to upload image something went wrong!",
            data:err.message
        })
    }
}

//getting all the images;
//implementing sorting and paging functionality
const getImages=async(req,res)=>{
    try{
     const page=parseInt(req.query.page)||1;
     const limit=parseInt(req.query.limit)||2;
     const skip=(page-1)*limit;

     const sortBy=req.query.sortBy||'createdAt';
     const sortOrder=req.query.sortOrder==='asc'?1:-1;
     const totalImages=await Image.countDocuments();
     const totalPages=Math.ceil(totalImages/limit);

     const sortObj={};
     sortObj[sortBy]=sortOrder;
     const images=await Image.find().sort(sortObj).skip(skip).limit(limit);
     if(images){
        res.status(200).json({
            success:true,
            message:"Images fetched successfully",
            currentPage:page,
            totalPages:totalPages,
            totalImages:totalImages,
            data:images
        })
     }
     else{
       res.status(404).json({
        success:true,
        message:"No images found",
       }) 
     }  
    }catch(err){
        res.status(500).json({
          success:false,
          message:"Error while fetching file!"
        })
    }
}

//Image deleting functinality
const deleteImage=async(req,res)=>{
    try{
    const imageId=req.params.id;
    const userId=req.userInfo.userId;
    const image=await Image.findById(imageId);
    if(!image){
        return res.status(404).json({
            success:false,
            message:'Image not found',
        })
    }
    if(image.uploadedBy.toString()!==userId){
        return res.status(403).json({
            success:false,
            message:"You are not authorized to delete this image",
        })
    }
 await cloudinary.uploader.destroy(image.publicId);
 
 //deleting image from mongodb
await Image.findByIdAndDelete(imageId);
res.status(200).json({
    success:true,
    message:"Image deleted successfully"
})
}
  catch(err){
        res.status(500).json({
            success:false,
            message:"Error while deleting image",
        })
    }
}




module.exports={uploadImage,getImages,deleteImage};