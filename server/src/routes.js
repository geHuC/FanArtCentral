const router = require('express').Router(); //Direclty generate a router
const postController = require('./controllers/postCotntroller.js');

router.use('/api/v1', postController)

module.exports = router;