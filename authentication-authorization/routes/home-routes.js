const {Router}=require('express');
const router=Router();
const authMiddleware=require('../middlewares/auth-middleware');

router.get('/home',authMiddleware,(req,res)=>{
    const {username}=req.userInfo;
    res.send(`Welcome ${username} to Home Page!`);
})


module.exports=router;