const express=require('express');
require('dotenv').config({path:'../.env'});
const connectToDb=require('./database/db');
const insertProduct=require('./routes/product-route');
const app=express();
const PORT=process.env.PORT;

app.use(express.json());
connectToDb();
app.use('/api',insertProduct);

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);    
});

