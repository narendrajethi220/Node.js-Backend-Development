const {Router}=require('express');
const router=Router();
const {addNewBook,getAllBooks,getSingleBook,updateBook,deleteBook}=require('../controllers/books-controller');

router.get('/get/books',getAllBooks);
router.get('/get/book/:id',getSingleBook);
router.post('/create/book',addNewBook);
router.put('/update/book/:id',updateBook);
router.delete('/delete/book/:id',deleteBook);

module.exports=router;