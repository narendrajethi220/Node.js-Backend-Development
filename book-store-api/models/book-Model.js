const mongoose=require('mongoose');

const bookSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Book Title is required"],
        trim:true,
        maxLength:[100,'Book Title cannot be more than 100 character']
    },
    author:{
        type:String,
        required:[true,"Author Name is a required"],
        trim:true, 
    },
    year:{
        type:Number,
        require:[true,"Publication year is required"],
        min:[1000,"Year must be atleast 1000"],
        max:[new Date().getFullYear(), 'Year cannot be in the future']
    },
    createdAt:{
       type:Date,
       default:Date.now,
    }
})

module.exports=mongoose.model('book',bookSchema);

