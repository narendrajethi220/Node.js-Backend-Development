const {Router}=require('express');
const router=Router();
const {userRegister,userLogin,changePassword}=require('../controllers/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/register', userRegister);
router.post('/login',userLogin);
router.put('/change-password',authMiddleware,changePassword);

module.exports=router;