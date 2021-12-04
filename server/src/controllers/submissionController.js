const router = require('express').Router(); //Direclty generate a router
const { default: slugify } = require('slugify');
const upload = require('../configurations/multerConfig.js');
const imageThumbnail = require('image-thumbnail');
const submissionService = require('../services/submissionService.js');
const { isUser } = require('../middlewares/routeGuardMiddleware.js')
const fbService = require('../services/firebaseService.js');
const sizeOf = require('image-size');
const userService = require('../services/userService.js');

router.get('/', async (req, res) => {
    try {
        const submissions = await submissionService.getAll();
        submissions.forEach(x => x.author = { username: x.author.username, avatar: x.author.avatar });
        res.status(200).json(submissions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})
router.get('/favourite/:id', isUser, async (req, res) => {
    try {
        await submissionService.favourite(req.params.id, req.user._id, 'favourites');
        await userService.pushToField(req.user._id, req.params.id,'favourites');
        res.status(200).json({ ok: 'favourited' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})
router.get('/unfavourite/:id', isUser, async (req, res) => {
    try {
        await submissionService.unfavourite(req.params.id, req.user._id, 'favourites');
        await userService.removeFromField(req.user._id, req.params.id,'favourites');
        res.status(200).json({ ok: 'unfavourited' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

router.get('/random', async (req, res) => {
    try {
        const submission = await submissionService.getRandom();
        const author = await userService.getOne(submission[0].author);
        const constructedObject = {
            title: submission[0].title,
            imageUrl: submission[0].imageUrl,
            slug: submission[0].slug,
            author: {
                username: author.username,
                avatar: author.avatar
            }
        }
        res.status(200).json(constructedObject);
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', isUser, upload.single('image'), async (req, res) => {
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
        req.body.thumbUrl = `https://firebasestorage.googleapis.com/v0/b/fanart-central.appspot.com/o/thumbs%2F${req.user.username}%2F${thumbName}?alt=media`;

        const sub = await submissionService.create(req.body);
        userService.pushToField(req.user._id, sub._id, 'submissions');
        res.status(201).json(sub)
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ error })
    }
})
router.get('/:author/art/:slug', async (req, res) => {
    try {
        const submission = await submissionService.getOne(req.params.slug);
        if (submission.author.username != req.params.author) {
            throw new Error('Different author');
        }
        submission.author = { username: submission.author.username, avatarUrl: submission.author.avatar, followers: submission.author.followers };
        submissionService.updateViews(submission._id);
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router;