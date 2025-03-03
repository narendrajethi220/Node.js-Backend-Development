const {Router}=require('express');
const router=Router();
const authMiddleware=require('../middlewares/auth-middleware');
const adminMiddleware=require('../middlewares/admin-middleware');
const uploadMiddleware=require('../middlewares/upload-middleware');
const {uploadImage,getImages,deleteImage}=require('../controllers/image-controller');


router.post('/upload/image',authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uploadImage);
router.get('/get/images',authMiddleware,getImages);
router.delete('/delete-image/:id',authMiddleware,adminMiddleware,deleteImage)


module.exports=router;
