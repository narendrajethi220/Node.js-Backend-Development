const multer=require('multer');
const path=require('path');

//setting our multer storage
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,
            file.filename+'-'+Date.now()+path.extname(file.originalname)
        )
    }
})

//file filter function to check if the file type is valid
//mime- multipurpose internet mail exchange internet standard that allows users to exchange a variety of data files through email and the web

const checkFileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }
    else{
        cb(new Error('Not an image! Please upload only image'))
    }
}

//multer-middleware
module.exports=multer({
    storage:storage,
    fileFilter:checkFileFilter,
    limits:{
        fileSize:8*1024*1024,
    }
})