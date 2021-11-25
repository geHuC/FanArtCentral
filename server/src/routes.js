const router = require('express').Router(); //Direclty generate a router
const submissionController = require('./controllers/submissionController.js');
const authenticationController = require('./controllers/authenticationController.js');

router.use('/api/v1/submissions', submissionController);
router.use('/auth', authenticationController)

module.exports = router;