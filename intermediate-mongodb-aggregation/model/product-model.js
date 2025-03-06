const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    title:String,
    category:String,
    price:Number,
    inStock:Boolean,
    tags:[String]
});

module.exports=mongoose.model('product',productSchema);