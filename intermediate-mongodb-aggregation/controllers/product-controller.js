const Product=require('../model/product-model');

const insertSampleProduct=async(req,res)=>{
    try{
        const sampleProducts = [
        {
          title: "Wireless Bluetooth Headphones",
          category: "Electronics",
          price: 59.99,
          inStock: true,
          tags: ["audio", "wireless", "bluetooth", "headphones"]
        },
        {
          title: "Mechanical Gaming Keyboard",
          category: "Electronics",
          price: 89.99,
          inStock: true,
          tags: ["gaming", "keyboard", "mechanical", "RGB"]
        },
        {
          title: "Men's Running Shoes",
          category: "Footwear",
          price: 79.99,
          inStock: true,
          tags: ["sports", "shoes", "running", "men"]
        },
        {
          title: "Women's Handbag",
          category: "Fashion",
          price: 45.99,
          inStock: false,
          tags: ["bag", "fashion", "accessory", "women"]
        },
        {
          title: "Smartphone 128GB",
          category: "Electronics",
          price: 699.99,
          inStock: true,
          tags: ["smartphone", "mobile", "128GB", "android"]
        },
        {
          title: "Yoga Mat - Non Slip",
          category: "Fitness",
          price: 29.99,
          inStock: true,
          tags: ["yoga", "exercise", "fitness", "mat"]
        },
        {
          title: "Gaming Mouse",
          category: "Electronics",
          price: 49.99,
          inStock: false,
          tags: ["gaming", "mouse", "RGB", "wireless"]
        },
        {
          title: "Cotton T-Shirt",
          category: "Clothing",
          price: 19.99,
          inStock: true,
          tags: ["t-shirt", "cotton", "casual", "unisex"]
        },
        {
          title: "4K Ultra HD Smart TV",
          category: "Electronics",
          price: 999.99,
          inStock: true,
          tags: ["smart TV", "4K", "LED", "entertainment"]
        },
        {
          title: "Office Chair - Ergonomic",
          category: "Furniture",
          price: 149.99,
          inStock: false,
          tags: ["chair", "office", "ergonomic", "comfortable"]
        },
        {
          title: "Stainless Steel Water Bottle",
          category: "Kitchen",
          price: 24.99,
          inStock: true,
          tags: ["bottle", "steel", "hydration", "eco-friendly"]
        },
        {
          title: "Electric Hair Trimmer",
          category: "Personal Care",
          price: 39.99,
          inStock: true,
          tags: ["grooming", "trimmer", "electric", "shaving"]
        },
        {
          title: "Gaming Laptop",
          category: "Electronics",
          price: 1299.99,
          inStock: true,
          tags: ["gaming", "laptop", "high performance", "RGB"]
        },
        {
          title: "Cookware Set - Non-Stick",
          category: "Kitchen",
          price: 99.99,
          inStock: true,
          tags: ["cooking", "kitchen", "non-stick", "set"]
        },
        {
          title: "Sunglasses - UV Protection",
          category: "Fashion",
          price: 34.99,
          inStock: false,
          tags: ["sunglasses", "fashion", "UV protection", "accessory"]
        }
        ];
       const result=await Product.insertMany(sampleProducts);
       res.status(201).json({
        success:true,
        message:"Data Inserted Successfully",
       })
     }catch(err){
        res.status(500).json({
           success:false,
           message:"Error in inserting products",
           data:err.message,
        })
    }       
}

const getProdcutsStats=async(req,res)=>{
    try{
        const result=await Product.aggregate([
            //stage-1 matching
            {
                $match:{
                    inStock:true,
                    price:{
                        $gte:100,
                    }
                }
            },

            //stage-2
            {
                $group:{
                    _id:"$category",
                    avgPrice:{
                        $avg:"$price"
                    },
                    count:{
                        $sum:1
                    }
                }
            },
            //
         ]) 
    res.status(200).json({
        success:true,
        data:result
    })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Error while getting stats",
            data:err.message
        })
    }
}

const getProductAnalysis=async(req,res)=>{
    try{
        const productAanalysis=await Product.aggregate([
            {
                $match:{
                    category:"Electronics"
                }
            },
            {
                $group:{
                    _id:null,
                    totalRevenue:{
                        $sum:"$price"
                    },
                    averagePrice:{
                        $avg:"$price"
                    },
                    maxProductPrice:{
                        $max:"$price"
                    },
                    minProductPrice:{
                        $min:"$price"
                    }
                }
            },
            //stage 3 - projection
            {
                $project:{
                    _id:0,
                    totalRevenue:1,
                    averagePrice:1,
                    maxProductPrice:1,
                    minProductPrice:1,
                    priceRange:{
                     $subtract:["$maxProductPrice","$minProductPrice"],
                    }
                }
            }
        ])
        res.status(200).json({
            success:true,
            message:"Product Analysis",
            data:productAanalysis,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Error while getting prodcut Analysis",
            data:err.message
        })
    }
}


module.exports = {insertSampleProduct,getProdcutsStats,getProductAnalysis}; 
