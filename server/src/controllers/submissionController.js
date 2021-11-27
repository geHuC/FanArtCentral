const router = require('express').Router(); //Direclty generate a router
const { default: slugify } = require('slugify');
const upload = require('../configurations/multerConfig.js');
const imageThumbnail = require('image-thumbnail');
const submissionService = require('../services/submissionService.js');
const fbService = require('../services/firebaseService.js');


router.get('/', async (req, res) => {

    try {
        const submissions = await submissionService.getAll();
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', upload.single('image'), async (req, res) => {
    try {
        let count = await submissionService.getCount();
        req.body.author = '618fe42a2776e1a7faa65b5b';

        req.body.slug = slugify(req.body.title, { lower: true, strict: true, trim: true }) + `-${count + 1}`;

        const thumbnail = await imageThumbnail(req.file.buffer, { height: 300 });

        const fileName = `${req.body.slug}.jpg`
        const thumbName = `${req.body.slug}_thumb.jpg`
        await fbService.file(`art/${fileName}`).createWriteStream().end(req.file.buffer);
        await fbService.file(`thumbs/${thumbName}`).createWriteStream().end(thumbnail);
        
        req.body.imageUrl = `https://firebasestorage.googleapis.com/v0/b/fanart-central.appspot.com/o/art%2F${fileName}?alt=media`;
        req.body.thumbUrl = `https://firebasestorage.googleapis.com/v0/b/fanart-central.appspot.com/o/thumb%2F${thumbName}?alt=media`;
        const sub = await submissionService.create(req.body);
        res.status(201).json(sub)
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ error })
    }
})

module.exports = router;