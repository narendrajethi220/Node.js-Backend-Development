const {Router}=require('express');
const router=Router();

const {insertSampleProduct,getProdcutsStats,getProductAnalysis}=require('../controllers/product-controller');

router.post('/products/insert',insertSampleProduct);
router.get('/product/getStats',getProdcutsStats);
router.get('/product/getAnalysis',getProductAnalysis);


module.exports=router;