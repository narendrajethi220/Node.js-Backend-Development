const express=require('express');
const connectToDatabase =require('./database/db');
const app=express();
const bookRoutes=require('./routes/book-routes');

app.use(express.json());

app.use('/api',bookRoutes);


connectToDatabase();
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server Started at PORT ${PORT}`);
})



