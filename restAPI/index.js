const express=require('express');
const app=express();

//middleware
app.use(express.json());
let books=[
    {
        id:'1',
        title:'Book1'
    },
    {
        id:'2',
        title:'Book2'
    },
    {
        id:'3',
        title:'Book3'
    }
]



app.get('/',(req,res)=>{
    res.status(200).json({
        msg:"Welcom to Home page"
    })
})

//Read
app.get('/api/books',(req,res)=>{
     res.status(200).json({
        msg:books
     })

})

app.get('/api/book:id',(req,res)=>{
    const getBook=books.find(book=>book.id===req.params.id);
    if(getBook){
        res.status(200).json({msg:getBook})
    }
    else{
        res.status(404).json({msg:`No Book found for the Bookid ${req.params.id}`})
    }
})

//post
app.post('/api/book/add',(req,res)=>{
    const newBook={
        id:Math.floor(Math.random()*1000).toString(),
        title:Math.floor(Math.random()*1000).toString()
    }
    books.push(newBook);
    res.status(200).json({
        data:newBook,
        message:"New Book added successfully"
    })
})

//Update
app.put('/api/book/update:id',(req,res)=>{
    const findCurrentBook=books.find(book=>book.id===req.params.id);
    if(findCurrentBook){
        findCurrentBook.title=req.body.title || findCurrentBook.title;
        res.status(200).json({
            message:`Book with id ${req.params.id} has been updated successfully`,
            data:findCurrentBook,
        })
    }
    else{
        res.status(404).json({
            message:`No Book Found for id ${req.params.id}`
        })
    }
})

//Delete
app.delete('/api/book/delete:id',(req,res)=>{
    const findIdOfCurrentBook=books.findIndex(book=>book.id===req.params.id);
    if(findIdOfCurrentBook!==-1){
        const deletedBook=books.splice(findIdOfCurrentBook,1);
        res.status(200).json({
            data:deletedBook[0],
            message:"Book deleted Successfully",
        })
    }
    else{
        res.status(404).json({
            message:"Book not found for respective id"
        })
    }
})


const port=3000;
app.listen(port,()=>{
    console.log(`Server Started at port ${port}`);
})