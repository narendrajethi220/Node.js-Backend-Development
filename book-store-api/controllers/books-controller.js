const Book=require('../models/book-Model');


//Create/Adding new Book
const addNewBook=async(req,res)=>{
    try{
        const bookDetails=req.body;
        const newlyCreatedBook=await Book.create(bookDetails);
        if(newlyCreatedBook){
           res.status(200).json({
            success:true,
            message:"New Book Created Successfully",
            data:newlyCreatedBook,
          });
       }
    }
    catch(err){
        // console.log(err.message);
        res.status(500).json({
            success:false,
            message:"Error while Adding Book Data",
            data:err.message, 
        })
    }
}

//Read , getting all books
const getAllBooks=async(req,res)=>{
    try{
    const allBooks=await Book.find({});
    if(allBooks.length>0){
        res.status(200).json({
            success:true,
            message:"Books fetched successfully",
            data:allBooks
        })
      }
    else{
       res.status(404).json({
        success:true,
        message:"No Book found"
       })
    }
    }
   catch(err){
    res.status(500).json({
        success:false,
        message:"Error while fething books",
        data:err.message
    })
  }
}

//get a specific book , fetching via id
const getSingleBook=async(req,res)=>{
try{
   const bookId=req.params.id;
//    console.log(bookId);
   const getBookDetails=await Book.findById(bookId);
   if(!getBookDetails){
    res.status(404).json({
        success:false,
        message:"No Book for such Id",
    })
   }
   else{
   res.status(200).json({
    success:true,
    message:"Book fetched successfully",
    data:getBookDetails
   })
  }

}
catch(err){
    res.status(500).json({
        success:false,
        message:"Error while fetching Book", 
        data:err.message
    })
}
}

//update a book
const updateBook=async(req,res)=>{
    try{
        const bookId=req.params.id;
        const updateData=req.body;
        console.log(bookId, updateData);
        const updatedBook=await Book.findByIdAndUpdate(bookId,updateData,{
                new:true
            })        
       if(!updatedBook){
        res.status(404).json({
            success:false,
            message:"No Book found for respective id",
        })
       }
       res.status(200).json({
        success:true,
        message:"Book Updated Successfully",
        data:updatedBook
    })
      }catch(err){
       res.status(500).json({
        success:false,
        message:"Error while updating book",
        data:err.message
       })
    }
}

// Delete a book
const deleteBook=async(req,res)=>{
    try{
    const bookId=req.params.id;
    const deletedBook=await Book.findByIdAndDelete(bookId);
    if(!deleteBook){
        res.status(404).json({
            success:false,
            message:"Book not found for the respective id",
        })
    }
    res.status(200).json({
        success:true,
        message:"Book Deleted Successfully",
        data:deletedBook
    })
 }
catch(err){
    res.staus(500).json({
        success:false,
        message:"Error while deleting book",
        data:err.message
    })
}
}



module.exports={addNewBook,getAllBooks,getSingleBook,updateBook,deleteBook};
