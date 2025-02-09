const express=require('express');
const path=require('path');
// const ejs=require('ejs');
const app=express();

//application level settings
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


const products=[
    {
        id:1,
        title:'Product 1'
    },
    {
        id:2,
        title:'Product 2'
    },
    {
       id:3,
       title:'Product 3'
    }
];

app.get('/',(req,res)=>{
      res.render('home',{title:'Home Page ',products:products});
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About Page'});
})

const port=3000;
app.listen(port,(req,res)=>{
    console.log(`server started at port ${port}`);
})