const express=require('express');
const app=express();
require('dotenv').config({path:'../.env'});
const connectToDatabase=require('./database/db');
const authRoutes=require('./routes/auth-routes');
const homeRoute=require('./routes/home-routes');
const adminRoute=require('./routes/admin-routes');
const imageRoute=require('./routes/image-route');

app.use(express.json());
app.use('/api',authRoutes)
app.use('/api',homeRoute);
app.use('/api',adminRoute);
app.use('/api',imageRoute);



connectToDatabase();

const PORT=process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})
