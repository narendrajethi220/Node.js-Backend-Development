const express=require('express');
const app=express();


//middlewares
const myFirstMiddleware=(req,res,next)=>{
    console.log('This is the first middleware will run on every api request');
    next();
}
//custom middleware
const requestTimeStamp=(req,res,next)=>{
    const timeStamp=new Date().toISOString();
    console.log(`${timeStamp} from ${req.method} to ${req.url}`);
    next();
}

app.use(requestTimeStamp);

// app.use(myFirstMiddleware);
//creating routes
app.get('/',(req,res)=>{
res.send('Welcom to the Home Page');
})
app.get('/api/products/:id',(req,res)=>{
    const productId=parseInt(req.params.id);
    const products=[
        {
            id:1,
            label:"Product 1",
        },
        {
            id:2,
            label:"Product 2",
        },
        {
            id:3,
            label:"Product 3",
        }
    ]
    const getProduct=products.find(product=>product.id===productId);
    if(getProduct){
        res.status(200).json(msg=getProduct);
    }
    else {
        res.status(200).json(msg="No Product found for such id");
    }

})





const port=3000;
app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})
