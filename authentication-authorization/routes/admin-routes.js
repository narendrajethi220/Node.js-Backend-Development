const {Router}=require('express');
const router=Router();
const authMiddleware=require('../middlewares/auth-middleware');
const adminMiddleware=require('../middlewares/admin-middleware');

router.get('/admin',authMiddleware,adminMiddleware,(req,res)=>{
    res.send('Welcome to admin route');
})

module.exports=router;