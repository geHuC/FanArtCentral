const router = require('express').Router(); //Direclty generate a router
const { default: slugify } = require('slugify');
const upload = require('../configurations/multerConfig.js');
const imageThumbnail = require('image-thumbnail');
const submissionService = require('../services/submissionService.js');
const {isUser} = require('../middlewares/routeGuardMiddleware.js')
const fbService = require('../services/firebaseService.js');
const sizeOf = require('image-size');
const userService = require('../services/userService.js');

router.get('/', async (req, res) => {

    try {
        const submissions = await submissionService.getAll();
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:slug', async (req, res) => {
    try {
        const submission = await submissionService.getOne(req.params.slug);
        submission.author = {username: submission.author.username, avatarUrl: submission.author.avatar, followers: submission.author.followers};
        submissionService.updateViews(submission._id);
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ error })
    }
})


router.post('/', isUser, upload.single('image'),  async (req, res) => {
    try {

        res.status(200);
        let count = await submissionService.getCount();
        req.body.author = req.user._id;
        req.body.slug = slugify(req.body.title, { lower: true, strict: true, trim: true }) + `-${count + 1}`;
        req.body.tags = JSON.parse(req.body.tags);

        const thumbnail = await imageThumbnail(req.file.buffer, { height: 300 });
        const dimensions = sizeOf(thumbnail);

        const fileName = `${req.body.slug}.${dimensions.type}`;
        const thumbName = `${req.body.slug}_thumb.${dimensions.type}`;

        await fbService.file(`art/${req.user.username}/${fileName}`).createWriteStream().end(req.file.buffer);
        await fbService.file(`thumbs/${req.user.username}/${thumbName}`).createWriteStream().end(thumbnail);
        req.body.thumbWidth = dimensions.width;
        req.body.imageUrl = `https://firebasestorage.googleapis.com/v0/b/fanart-central.appspot.com/o/art%2F${req.user.username}%2F${fileName}?alt=media`;
        req.body.thumbUrl = `https://firebasestorage.googleapis.com/v0/b/fanart-central.appspot.com/o/thumb%2F${req.user.username}%2F${thumbName}?alt=media`;

        const sub = await submissionService.create(req.body);
        userService.pushToField(req.user._id, sub._id, 'submissions');
        res.status(201).json(sub)
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ error })
    }
})

module.exports = router;