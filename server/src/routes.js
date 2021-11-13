const router = require('express').Router(); //Direclty generate a router
const postController = require('./controllers/postController.js');

router.use('/api/v1', postController)

module.exports = router;