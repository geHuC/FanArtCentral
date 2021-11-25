const router = require('express').Router(); //Direclty generate a router
const upload = require('../configurations/multerConfig.js');
const submissionService = require('../services/submissionService.js');

router.get('/', async (req, res) => {

    try {
        const submissions = await submissionService.getAll();
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', upload.single('image'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
})

module.exports = router;