const router = require('express').Router(); //Direclty generate a router
const postController = require('./controllers/postController.js');
const authenticationController = require('./controllers/authenticationController.js');

router.use('/api/v1', postController);
router.use('/auth', authenticationController)

module.exports = router;