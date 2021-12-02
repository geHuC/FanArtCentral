const router = require('express').Router(); //Direclty generate a router
const userService = require('../services/userService.js');
const { isUser } = require('../middlewares/routeGuardMiddleware.js');
const auth = require('../services/authenticationService');
const { parseError } = require('../utils/mongooseErrorParser.js');

router.get('/follow/:username', isUser, async (req, res) => {

    try {
        await userService.follow(req.params.username, req.user._id)
        res.status(200).json({message: 'followed'});
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/unfollow/:username', isUser, async (req, res) => {

    try {
        await userService.unfollow(req.params.username, req.user._id)
        res.status(200).json({message: 'unfollowed'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})



module.exports = router;