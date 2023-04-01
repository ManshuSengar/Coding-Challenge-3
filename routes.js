const router = require('express').Router();
const userController = require('./controllers/user-controller');
const bookController=require('./controllers/book-controller')



// User
router.get('/api/getUser/:userId',userController.show);
router.post('/api/create-user',userController.createUser);
router.get('/api/getUser', userController.index);
router.put('/api/user/:userId', userController.update);
router.delete('/api/user/:userId',userController.delete);

// books

router.get('/api/getBooks/:bookId',bookController.show);
router.post('/api/create-book',bookController.createBook);
router.get('/api/usermetrics',bookController.userMetric);
router.get('/api/getbooks', bookController.index);
router.put('/api/book/:bookId', bookController.update);
router.delete('/api/book/:bookId',bookController.delete);

module.exports = router;