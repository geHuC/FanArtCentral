const router = require('express').Router(); //Direclty generate a router
const userService = require('../services/userService.js');
const { isUser } = require('../middlewares/routeGuardMiddleware.js');
const auth = require('../services/authenticationService');
const { parseError } = require('../utils/mongooseErrorParser.js');

router.get('/follow/:username', isUser, async (req, res) => {
    try {
        const followed = await userService.follow(req.params.username, req.user._id);
        await userService.pushToField(req.user._id, followed._id, 'following');
        res.status(200).json({ message: 'followed' });
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/unfollow/:username', isUser, async (req, res) => {
    try {
        const followed = await userService.unfollow(req.params.username, req.user._id)
        await userService.removeFromField(req.user._id, followed._id, 'following');
        res.status(200).json({ message: 'unfollowed' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

router.get('/get/:username', async (req, res) => {
        try {
            const user = await userService.getAndPopulate(req.params.username,'submissions');
            user.submissions.forEach(x=> x.author = { username: user.username, avatar: user.avatar });
            user.submissions.sort((a, b)=> b.createdAt - a.createdAt);
            delete user.password;
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error })
        }
    }
)

module.exports = router;